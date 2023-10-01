<template>
  <div
    ref="root"
    :class="['player', {'-is-dead': state.isDead}]"
  />
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { Vector2 } from '@/types'
  import { CELL_SIZE, GAME_SIZE } from '@/constants'

  const root = ref()

  const state = reactive({
    x: (GAME_SIZE.width / 2) * CELL_SIZE,
    y: (GAME_SIZE.height - 1) * CELL_SIZE,
    isPressed: false,
    isDead: false
  })

  const move = (dir: Vector2) => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    if (dir.x === -1 && state.x === 0) return
    if (dir.y === -1 && state.y === 0) return

    const rightBoundary = CELL_SIZE * GAME_SIZE.width - CELL_SIZE
    const bottomBoundary = CELL_SIZE * GAME_SIZE.height - CELL_SIZE

    if (dir.x === 1 && state.x === rightBoundary) return
    if (dir.y === 1 && state.y === bottomBoundary) return

    state.x = state.x + CELL_SIZE * dir.x
    state.y = state.y + CELL_SIZE * dir.y

    rootElement.style.left = `${state.x}px`
    rootElement.style.top = `${state.y}px`

    setPressed(true)
  }

  const reset = () => {
    state.x = (GAME_SIZE.width / 2) * CELL_SIZE
    state.y = (GAME_SIZE.height - 1) * CELL_SIZE
    root.value.style.left = `${(GAME_SIZE.width / 2) * CELL_SIZE}px`
    root.value.style.top = `${(GAME_SIZE.height - 1) * CELL_SIZE}px`
    state.isPressed = false
    state.isDead = false
  }

  const setPressed = (flag: boolean) => state.isPressed = flag

  const setDead = (flag: boolean) => state.isDead = flag

  const getPosition = () => { return { x: state.x, y: state.y } }

  defineExpose({
    move,
    reset,
    setPressed,
    setDead,
    getPosition
  })
</script>

<style lang="scss" scoped>
  .player {
    border-radius: calc(var(--cell-size) / 4);
    background-color: var(--color-player);
    position: absolute;
    top: calc((var(--game-size-height) - 1) * var(--cell-size));
    left: calc((var(--game-size-width) / 2) * var(--cell-size));
    z-index: 2;
    width: var(--cell-size);
    height: var(--cell-size);

    &.-is-dead {
      background-color: var(--color-player-dead);
    }
  }
</style>
