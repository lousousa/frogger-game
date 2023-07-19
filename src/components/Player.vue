<template>
  <div
    ref="root"
    class="player"
  />
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const root = ref()

  const state = reactive({
    x: 0,
    y: 0,
    isPressed: false,
    isColliding: false
  })

  const emit = defineEmits({
    collision: () => true
  })

  const checkCollision = () => {
    const el = document.elementFromPoint(state.x - 1, state.y +16)
    if (!el) return

    if (!state.isColliding && el.classList.contains('js-foe')) {
      state.isColliding = true
      emit('collision')
    }
  }

  const moveUp = () => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    if (state.y >= 32) {
      state.y -= 32
      rootElement.style.top = `${ state.y }px`
      setPressed(true)
    }
  }

  const moveRight = () => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    const rightBoundary = 32 * 16 - 32

    if (state.x <= rightBoundary - 32) {
      state.x += 32
      rootElement.style.left = `${ state.x }px`
      setPressed(true)
    }
  }

  const moveDown = () => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    const bottomBoundary = 32 * 9 - 32
    if (state.y <= bottomBoundary - 32) {
      state.y += 32
      rootElement.style.top = `${ state.y }px`
      setPressed(true)
    }
  }

  const moveLeft = () => {
    if (state.isPressed) return

    const rootElement = root.value
    if (!rootElement) return

    if (state.x >= 32) {
      state.x -= 32
      rootElement.style.left = `${ state.x }px`
      setPressed(true)
    }
  }

  const reset = () => {
    state.x = root.value.style.left = 0
    state.y = root.value.style.top = 0
    state.isPressed = false
    state.isColliding = false
  }

  const setPressed = (flag: boolean) => state.isPressed = flag

  defineExpose({
    checkCollision,
    moveUp,
    moveRight,
    moveDown,
    moveLeft,
    reset,
    setPressed
  })
</script>

<style lang="scss" scoped>
  .player {
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 32px;
    height: 32px;
  }
</style>