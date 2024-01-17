export default function useExperimentalFeatures() {
  const isExperimental = ref(false);
  const onExperimental = () => {
    isExperimental.value = true;

    setTimeout(() => {
      isExperimental.value = false;
    }, 2000);
  };

  return {
    onExperimental, isExperimental
  }
}
