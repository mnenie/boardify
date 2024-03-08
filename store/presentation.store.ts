export const usePresentation = defineStore('presentation', () => {
  const presentation = ref(false);

  const changePresentationMode = async () => {
    presentation.value = !presentation.value;
    await toggleFullScreen();
  };

  const toggleFullScreen = async () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen;
    const exitFullScreen = doc.exitFullscreen;

    if (!doc.fullscreenElement) {
      requestFullScreen.call(docEl);
    } else {
      exitFullScreen.call(doc);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'F11' || (e.key === 'F11' && e.metaKey)) {
      presentation.value = !presentation.value;
    }
    if (e.key === 'Escape') {
      presentation.value = false;
    }
  };

  watchEffect(() => {
    if (window) {
      window.addEventListener('keydown', handleKeyDown);
    }
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  return {
    presentation,
    changePresentationMode,
    handleKeyDown
  };
});
