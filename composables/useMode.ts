export default function useMode() {
  const isDark = useDark();
  const toggleMode = useToggle(isDark);

  return {
    isDark, toggleMode
  }

}