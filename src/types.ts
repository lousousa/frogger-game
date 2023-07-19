export interface IPlayer {
  x: number,
  y: number,
  isPressed: boolean,
  moveUp: () => void,
  moveRight: () => void,
  moveDown: () => void,
  moveLeft: () => void,
  setPressed: () => void
}