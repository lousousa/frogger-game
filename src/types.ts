export interface IPlayer {
  state: {
    x: number,
    y: number,
    isPressed: boolean,
    idDead: boolean
  },
  move: (dir: Vector2) => void,
  setPressed: (flag: boolean) => void,
  setDead: (flag: boolean) => void,
  getPosition: () => Vector2,
  reset: () => void
}

export interface IFoe {
  state: {
    x: number,
    y: number
  }
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
