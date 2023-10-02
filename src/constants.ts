const isScreenSmall = document.body.clientWidth <= 640

export const CELL_SIZE = isScreenSmall ? 20 : 24
export const GAME_SIZE = {
  width: 16,
  height: 25
}
