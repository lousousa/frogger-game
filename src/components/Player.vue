<template>
  <div
    ref="root"
    class="player"
  />
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { Vector2 } from '@/types'

  const root = ref()

  const state = reactive({
    x: 0,
    y: 0,
    isPressed: false
  })

  const move = (dir: Vector2) => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    if (dir.x === -1 && state.x === 0) return
    if (dir.y === -1 && state.y === 0) return

    const rightBoundary = 32 * 16 - 32
    const bottomBoundary = 32 * 25 - 32

    if (dir.x === 1 && state.x === rightBoundary ) return
    if (dir.y === 1 && state.y === bottomBoundary ) return

    state.x = state.x + 32 * dir.x
    state.y = state.y + 32 * dir.y

    rootElement.style.left = `${state.x}px`
    rootElement.style.top = `${state.y}px`

    setPressed(true)
  }

  const reset = () => {
    state.x = root.value.style.left = 0
    state.y = root.value.style.top = 0
  }

  const setPressed = (flag: boolean) => state.isPressed = flag

  const getPosition = () => { return { x: state.x, y: state.y } }

  defineExpose({
    move,
    reset,
    setPressed,
    getPosition
  })
</script>

<style lang="scss" scoped>
  .player {
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 32px;
    height: 32px;
  }
</style>