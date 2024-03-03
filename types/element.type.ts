export enum ElementType {
  Rectangle = 'rectangle',
  Text = 'text',
  Pensil = 'pensil',
  Selection = 'selection',
  None = 'none',
  Move = 'move',
  Circle = 'circle'
}

export type Element = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  roughElement?: any;
  type: ElementType;
  offsetX?: number;
  offsetY?: number;
  position?: string | boolean | null;
  points?: { x: number; y: number }[];
  offsetsY?: number[];
  offsetsX?: number[];
  text?: string;
  options?: any;
  color: string;
  lineWidth: number;
};
