<template>
  <div
    ref="root"
    class="primary-foe"
    :style="`--spawnPositionX: ${spawnPosition.x}px; --spawnPositionY: ${spawnPosition.y}px;`"
  />
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import type { PropType } from 'vue'
  import type { Vector2 } from '@/types'

  const root = ref()

  const state = reactive({
    x: 0,
    y: 0
  })

  const props = defineProps({
    spawnPosition: {
      type: Object as PropType<Vector2>,
      required: true
    },
    direction: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits({
    'player-collision': () => true
  })

  const move = () => {
    const rootElement = root.value
    if (!rootElement) return

    const rightBoundary: number = 32 * 16

    if (props.direction === 'right') {
      if (state.x <= rightBoundary) {
        state.x += 4
        rootElement.style.left = `${ state.x }px`
      } else {
        state.x = -64
      }
    } else {
      if (state.x >= -64) {
        state.x -= 4
        rootElement.style.left = `${ state.x }px`
      } else {
        state.x = 32 * 16 + 64
      }
    }
  }

  const checkPlayerCollision = (playerPosition: Vector2) => {
    const distanceX = state.x - playerPosition.x
    const distanceY = state.y - playerPosition.y

    if (distanceY === 0 && distanceX <= 32 && distanceX >= -64) {
      emit('player-collision')
    }
  }

  const reset = () => {
    const spawnPosition = ref(props.spawnPosition)

    state.x = spawnPosition.value.x
    state.y = spawnPosition.value.y
    root.value.style.left = 'var(--spawnPositionX)'
    root.value.style.top = 'var(--spawnPositionY)'
  }

  onMounted(() => {
    const spawnPosition = ref(props.spawnPosition)

    state.x = spawnPosition.value.x
    state.y = spawnPosition.value.y
  })

  defineExpose({
    move,
    checkPlayerCollision,
    reset
  })
</script>

<style lang="scss" scoped>
  .primary-foe {
    background-color: #474973;
    width: 64px;
    height: 32px;
    border-radius: 4px;
    position: absolute;
    top: var(--spawnPositionY);
    left: var(--spawnPositionX);
    z-index: 1;
  }
</style>