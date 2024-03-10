import type { Element } from '~/types/element.type';

export default function useUndoRedo(elements: Ref<Element[]>, history: Ref<Element[][]>, redoHistory: Ref<Element[][]>) {

  const addToHistory = () => {
    const clonedElements = elements.value.map(element => ({ ...element }));
    history.value.push(clonedElements);
    redoHistory.value = [];
  };

  const undo = () => {
    if (history.value.length > 0) {
      const lastAction = history.value.pop();
      redoHistory.value.push(lastAction!);
      elements.value = lastAction!.map(element => ({ ...element }));
    }
  };

  const redo = () => {
    if (redoHistory.value.length > 0) {
      const nextState = redoHistory.value.pop();
      history.value.push(nextState!);
      elements.value = nextState!.map(element => ({ ...element }));
    }
  };

  const handleUndoKeyPress = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
      undo();
    }
    event.preventDefault();
  };
  const handleRedoKeyPress = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.shiftKey && event.key === 'Z'))) {
      event.preventDefault();
      redo();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleUndoKeyPress);
    window.addEventListener('keydown', handleRedoKeyPress);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleUndoKeyPress);
    window.removeEventListener('keydown', handleRedoKeyPress);
  });

  return {
    addToHistory,
    undo,
    redo
  };
}
