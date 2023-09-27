export interface IPlayer {
  x: number,
  y: number,
  isPressed: boolean,
  checkCollision: () => void,
  move: (dir: Vector2) => void,
  setPressed: () => void
}

export type Vector2 = {
  x: number,
  y: number
}