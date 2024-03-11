export type ChangeColorMethods = {
  changeWhitePen: () => void;
  changePen: () => void;
  changeHighlighterBlack: () => void;
  changePencilBlack: () => void;
  changePencilRed: () => void;
  changePencilGreen: () => void;
  changePencilBlue: () => void;
  changePencilPurple: () => void;
  changeHighlighterRed: () => void;
}


export type UndoRedo = {
  undo: () => void;
  redo: () => void;
}