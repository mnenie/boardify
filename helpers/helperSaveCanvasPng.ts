import type { Props } from "nuxt/dist/head/runtime/types";
import { ElementType } from "~/types/element.type";

export const saveCanvas = (canvas: Ref<HTMLCanvasElement | null>) => {
  if (canvas.value) {
    const link = document.createElement('a');
    link.href = canvas.value.toDataURL('image/png');
    link.download = 'boardify.png';
    link.click();
  }
};
