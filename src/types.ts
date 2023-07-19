export interface IPlayer {
  x: number,
  y: number,
  isPressed: boolean,
  checkCollision: () => void,
  moveUp: () => void,
  moveRight: () => void,
  moveDown: () => void,
  moveLeft: () => void,
  setPressed: () => void
}