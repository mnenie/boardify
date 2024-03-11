import type { ISettingsUiDraw } from '~/types/ui.interfase';

export default function useUiDraw({ color, lineWidth }: ISettingsUiDraw) {
  const { isDark } = useMode();

  const changeWhitePen = () => {
    color.value = '#fff'
    lineWidth.value = 7;
  };

  const changePen = () => {
    color.value = '#000';
    lineWidth.value = 5.3;
  };

  const changeHighlighterBlack = () => {
    color.value = '#000';
    lineWidth.value = 15;
  };
  const changeHighlighterRed = () => {
    color.value = 'rgb(220 38 38)';
    lineWidth.value = 15;
  };

  const changePencilBlack = () => {
    color.value = '#000';
    lineWidth.value = 8;
  };
  const changePencilRed = () => {
    color.value = 'rgb(220 38 38)';
    lineWidth.value = 8;
  };
  const changePencilGreen = () => {
    color.value = 'rgb(21 128 61)';
    lineWidth.value = 8;
  };
  const changePencilPurple = () => {
    color.value = 'rgb(124 58 237)';
    lineWidth.value = 8;
  };
  const changePencilBlue = () => {
    color.value = 'rgb(59 130 246)';
    lineWidth.value = 8;
  };

  return {
    color,
    lineWidth,
    changeWhitePen,
    changePencilBlack,
    changePencilRed,
    changePencilGreen,
    changePencilBlue,
    changePencilPurple,
    changeHighlighterBlack,
    changeHighlighterRed,
    changePen
  };
}
