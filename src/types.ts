export interface IPlayer {
  x: number,
  y: number,
  isPressed: boolean,
  move: (dir: Vector2) => void,
  setPressed: () => void,
  getPosition: () => void
}

export type Vector2 = {
  x: number,
  y: number
}