<template>
  <div
    ref="root"
    class="primary-foe js-foe"
  />
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const root = ref()

  const state = reactive({
    x: 0,
    y: 0
  })

  const move = () => {
    const rootElement = root.value
    if (!rootElement) return

    const rightBoundary = 32 * 16 - 16

    if (state.x <= rightBoundary - 16) {
      state.x += 32
      rootElement.style.left = `${ state.x }px`
    } else {
      state.x = -64
    }
  }

  defineExpose({
    move
  })
</script>

<style lang="scss" scoped>
  .primary-foe {
    background-color: yellowgreen;
    width: 64px;
    height: 32px;
    border-radius: 8px;
    position: absolute;
    top: 128px;
    left: 0;
    z-index: 1;
  }
</style>