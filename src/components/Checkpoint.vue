<template>
  <div
    class="checkpoint"
    :style="`--positionY: calc(${positionY} * ${cellSize}px);`"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Vector2 } from '@/types';
  import { CELL_SIZE } from '@/constants'

  const props = defineProps({
    positionY: {
      type: Number,
      default: 0
    }
  })

  const cellSize = ref(CELL_SIZE)

  const emit = defineEmits({
    'player-collision': () => true
  })

  const checkPlayerCollision = (playerPosition: Vector2) => {
    const distanceY = (props.positionY * CELL_SIZE) - playerPosition.y

    if (distanceY === 0) {
      emit('player-collision')
    }
  }

  defineExpose({
    checkPlayerCollision
  })
</script>

<style lang="scss" scoped>
  .checkpoint {
    background-color: var(--color-checkpoint);
    width: 100%;
    height: var(--cell-size);
    position: absolute;
    top: var(--positionY);
    left: 0;
    z-index: 1;
  }
</style>
