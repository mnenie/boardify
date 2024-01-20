export interface IDraw {
  ctx: CanvasRenderingContext2D,
  currentPoint: Point,
  prevPoint: Point | null
}

export type Point = { x: number, y: number}

export interface IDrawLine extends IDraw{
  color: Ref<string>
  radius: number
  line: number
}