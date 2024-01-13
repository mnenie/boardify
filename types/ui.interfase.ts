export interface IDrawUi {
  id: number;
  active: boolean;
  src: string;
  event?: () => void;
}

export interface ISettingsUiDraw {
  color: Ref<string>;
  line: Ref<number>;
  radius: Ref<number>;
}