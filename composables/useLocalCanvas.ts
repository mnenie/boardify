import type { Element } from '~/types/element.type';

export default function useLocalCanvas(elements: Ref<Element[]>) {
  const saveToLocalStorage = () => {
    if (typeof localStorage !== 'undefined' && elements.value) {
      const elementsJson = JSON.stringify(elements.value);
      localStorage.setItem('canvas', elementsJson);
    }
  };

  const loadFromLocalStorage = () => {
    const elementsJson = localStorage.getItem('canvas')!;
    if (elementsJson) {
      elements.value = JSON.parse(elementsJson);
    }
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage
  };
}
