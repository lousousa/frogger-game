<template>
  <div
    ref="root"
    class="red-ball"
  />
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    ref
  } from 'vue'

  export default defineComponent({
    setup() {
      const root = ref()
      const state = reactive({
        x: 0,
        y: 0,
        isPressed: false
      })

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

      const setPressed = (flag: boolean) => state.isPressed = flag

      return {
        root,
        moveUp,
        moveRight,
        moveDown,
        moveLeft,
        setPressed
      }
    }
  })
</script>

<style lang="scss" scoped>
  .red-ball {
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