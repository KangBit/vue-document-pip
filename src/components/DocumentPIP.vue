<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from "vue";
import copyStyles from "@/utils/copyStyles";

// Global Types
declare global {
  interface Window {
    documentPictureInPicture: {
      requestWindow: (options: {
        width: number;
        height: number;
        disallowReturnToOpener?: boolean;
        preferInitialWindowPlacement?: boolean;
      }) => Promise<Window>;
    };
  }
}

// Types
type PIPWindowSize = { width: number; height: number };
type Mode = "clone" | "transfer";
type Props = {
  size?: Partial<PIPWindowSize>;
  mode?: Mode;
  copyAllStyles?: boolean;
  isPipOpen: boolean;
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
});
const emit = defineEmits<Emits>();

// Refs
const pipWindow = ref<Window | null>(null);

// Computed
const pipRoot = computed(() => {
  return pipWindow.value?.document.getElementById("pip-root") || null;
});

// Methods
const togglePictureInPicture = (open: boolean) => {
  if (!isPIPSupported) {
    return;
  }

  if (open) {
    openPIPWindow();
  } else {
    closePIPWindow();
  }
};

const openPIPWindow = async () => {
  const { width = 0, height = 0 } = props.size || {};
  const pip = await window.documentPictureInPicture.requestWindow({
    width,
    height,
  });

  if (props.copyAllStyles) {
    copyStyles(pip);
  }

  pip.document.body.innerHTML = '<div id="pip-root"></div>';
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
    <slot ref="pipContent"></slot>
  </Teleport>
</template>

<style scoped></style>
