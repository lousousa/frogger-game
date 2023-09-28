export interface IPlayer {
  x: number,
  y: number,
  isPressed: boolean,
  move: (dir: Vector2) => void,
  setPressed: () => void,
  setDead: () => void,
  getPosition: () => Vector2,
  reset: () => void
}

export interface IFoe {
  x: number,
  y: number,
  move: () => void,
  checkPlayerCollision: (playerPosition: Vector2) => void,
  reset: () => void
}

export interface IFoeRef {
  component: IFoe,
  frameCounter: number
}

export type Vector2 = {
  x: number,
  y: number
}