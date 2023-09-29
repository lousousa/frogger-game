<template>
  <div
    class="checkpoint"
    :style="`--positionY: calc(${positionY} * 32px);`"
  />
</template>

<script setup lang="ts">
  import type { Vector2 } from '@/types';

  const props = defineProps({
    positionY: {
      type: Number,
      default: 0
    }
  })

  const emit = defineEmits({
    'player-collision': () => true
  })

  const checkPlayerCollision = (playerPosition: Vector2) => {
    const distanceY = (props.positionY * 32) - playerPosition.y

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
    height: 32px;
    position: absolute;
    top: var(--positionY);
    left: 0;
    z-index: 1;
  }
</style>
