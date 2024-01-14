import type { ISettingsUiDraw } from "~/types/ui.interfase";

export default function useUiDraw({ color, line, radius }: ISettingsUiDraw) {
  const changeEraser = () => {
    color.value = "rgb(249 250 251)";
    line.value = 14;
    radius.value = 7;
  };

  const changePen = () => {
    color.value = "#000";
    line.value = 3;
    radius.value = 1;
  };

  const changeHighlighterBlack = () => {
    color.value = "#000";
    line.value = 15;
    radius.value = 7;
  };
  const changeHighlighterRed = () => {
    color.value = "rgb(220 38 38)";
    line.value = 15;
    radius.value = 7;
  };

  const changePencilBlack = () => {
    color.value = "#000";
    line.value = 5;
    radius.value = 2;
  };
  const changePencilRed = () => {
    color.value = "rgb(220 38 38)";
    line.value = 5;
    radius.value = 2;
  };
  const changePencilGreen = () => {
    color.value = "rgb(21 128 61)";
    line.value = 5;
    radius.value = 2;
  };
  const changePencilPurple = () => {
    color.value = "rgb(124 58 237)";
    line.value = 5;
    radius.value = 2;
  };
  const changePencilBlue = () => {
    color.value = "rgb(59 130 246)";
    line.value = 5;
    radius.value = 2;
  };

  return {
    color, line, radius, changeEraser, changePencilBlack, changePencilRed, changePencilGreen, changePencilBlue, changePencilPurple, changeHighlighterBlack, changeHighlighterRed, changePen
  }
}