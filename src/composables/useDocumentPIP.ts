import { createApp, ref } from "vue";
import type { Component } from "vue";

import type { PIPWindowSize } from "@/types/pip";

export const useDocumentPIP = (size: PIPWindowSize, component: Component) => {
  const pipWindow = ref<Window | null>(null);

  const openPIPWindow = async () => {
    const { width = 0, height = 0 } = size;
    const pip = await window.documentPictureInPicture.requestWindow({
      width,
      height,
    });

    const pipApp = createApp(component);
    pipApp.mount(pip.document.body);

    pipWindow.value = pip;
  };

  const closePIPWindow = () => {
    pipWindow.value?.close();
  };

  return {
    openPIPWindow,
    closePIPWindow,
    pipWindow,
  };
};
