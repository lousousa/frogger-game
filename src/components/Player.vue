<template>
  <div
    ref="root"
    :class="['player', {'-is-dead': state.isDead}]"
  />
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { Vector2 } from '@/types'

  const root = ref()

  const state = reactive({
    x: 8 * 32,
    y: 24 * 32,
    isPressed: false,
    isDead: false
  })

  const move = (dir: Vector2) => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    if (dir.x === -1 && state.x === 0) return
    if (dir.y === -1 && state.y === 0) return

    const rightBoundary = 32 * 16 - 32
    const bottomBoundary = 32 * 25 - 32

    if (dir.x === 1 && state.x === rightBoundary) return
    if (dir.y === 1 && state.y === bottomBoundary) return

    state.x = state.x + 32 * dir.x
    state.y = state.y + 32 * dir.y

    rootElement.style.left = `${state.x}px`
    rootElement.style.top = `${state.y}px`

    setPressed(true)
  }

  const reset = () => {
    state.x = 8 * 32
    state.y = 24 * 32
    root.value.style.left = `${8 * 32}px`
    root.value.style.top = `${24 * 32}px`
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
    border-radius: 8px;
    background-color: #ccd5ae;
    position: absolute;
    top: calc(24 * 32px);
    left: calc(8 * 32px);
    z-index: 2;
    width: 32px;
    height: 32px;

    &.-is-dead {
      background-color: #e63946;
    }
  }
</style>
