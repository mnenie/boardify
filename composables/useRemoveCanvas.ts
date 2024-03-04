import type { Element } from '~/types/element.type';

export default function useRemoveCanvas(elements: Ref<Element[]>) {
  const onDelete = () => {
    localStorage.removeItem('canvas');
    elements.value = [];
    window.location.reload();
  };

  return {
    onDelete
  };
}
