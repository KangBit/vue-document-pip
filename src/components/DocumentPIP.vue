<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from "vue";
import loadCDNScripts from "@/utils/loadCDNScripts";
import copyStyles from "@/utils/copyStyles";

import type { PIPWindowSize } from "@/types/pip";

// Types
type Mode = "clone" | "transfer";
type Props = {
  size?: Partial<PIPWindowSize>;
  mode?: Mode;
  copyAllStyles?: boolean;
  isPipOpen: boolean;
  cdnScripts?: string[];
  disallowReturnToOpener?: boolean; // '탭으로 돌아가기' 버튼 숨기기
  preferInitialWindowPlacement?: boolean; // 항상 초기 위치에 설정 크기로 열림 (Chrome 130+)
};
type Emits = {
  (e: "onClose"): void;
};

// Variables
const isPIPSupported = "documentPictureInPicture" in window;

// Props & Emits
const props = withDefaults(defineProps<Props>(), {
  mode: "transfer",
  copyAllStyles: true,
  disallowReturnToOpener: false,
  preferInitialWindowPlacement: false,
});
const emit = defineEmits<Emits>();

// Refs
const pipWindow = ref<Window | null>(null);

// Computed
const pipRoot = computed(() => {
  return pipWindow.value?.document.getElementById("pip-root") || null;
});

const requestWindowParams = computed(() => {
  return {
    width: props.size?.width || 0,
    height: props.size?.height || 0,
    disallowReturnToOpener: props.disallowReturnToOpener,
    preferInitialWindowPlacement: props.preferInitialWindowPlacement,
  };
});

// Methods
const togglePictureInPicture = (open: boolean) => {
  if (!isPIPSupported) {
    console.warn(
      "Document Picture-in-Picture API is not supported in this browser"
    );
    return;
  }

  if (open) {
    openPIPWindow();
  } else {
    closePIPWindow();
  }
};

const openPIPWindow = async () => {
  const pip = await window.documentPictureInPicture.requestWindow(
    requestWindowParams.value
  );

  if (props.copyAllStyles) {
    copyStyles(pip);
  }
  if (props.cdnScripts && props.cdnScripts.length > 0) {
    await loadCDNScripts(pip, props.cdnScripts);
  }

  const root = pip.document.createElement("div");
  root.id = "pip-root";
  pip.document.body.appendChild(root);

  pip.addEventListener("pagehide", onClosePIPWindow, { once: true });

  pipWindow.value = pip;
};

const closePIPWindow = () => {
  if (!pipWindow.value) {
    return;
  }

  pipWindow.value.close();
  pipWindow.value = null;
};

const onClosePIPWindow = () => {
  closePIPWindow();
  if (props.isPipOpen) {
    emit("onClose");
  }
};

// Watches
watch(
  () => props.isPipOpen,
  (newVal: boolean) => {
    togglePictureInPicture(newVal);
  }
);

// LifeCycle
onBeforeUnmount(() => {
  closePIPWindow();
});
</script>

<template>
  <slot v-if="!pipRoot || mode === 'clone'"></slot>

  <Teleport v-if="pipRoot" :to="pipRoot">
    <slot></slot>
  </Teleport>
</template>

<style scoped></style>
