<template>
  <div
    class="virtual-keyboard"
  >
    <div
      class="button"
      @click="onButtonPress('up')"
    >
      <ArrowUp
        class="arrow-up"
      />
    </div>

    <div
      class="buttons-group"
    >
      <div
        class="button"
        @click="onButtonPress('left')"
      >
        <ArrowLeft
          class="arrow-left"
        />
      </div>

      <div
        class="button"
        @click="onButtonPress('right')"
      >
        <ArrowRight
          class="arrow-right"
        />
      </div>
    </div>

    <div
      class="button"
      @click="onButtonPress('down')"
      v-if="isDownButtonEnabled"
    >
      <ArrowDown
        class="arrow-down"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import {
    ArrowUp,
    ArrowRight,
    ArrowDown,
    ArrowLeft
  } from '@/assets/icons'

  const isDownButtonEnabled = ref(false)

  const emit = defineEmits({
    'button-press': direction => direction
  })

  const onButtonPress = (direction: string) => {
    emit('button-press', direction)
  }
</script>

<style lang="scss" scoped>
  .virtual-keyboard {
    --button-size: 64px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons-group {
      display: flex;
      gap: var(--button-size);
    }

    .button {
      border: 1px solid #edede9;
      opacity: .25;
      padding: 6px 12px;
      width: var(--button-size);
      height: var(--button-size);
      text-align: center;
      border-radius: calc(var(--button-size) / 2);
      color: #edede9;

      svg {
        width: 20px;
        height: 20px;
      }

      .arrow-up {
        margin-top: 13px;
      }

      .arrow-right {
        margin-top: 15px;
        margin-left: 4px;
      }

      .arrow-down {
        margin-top: 16px;
      }

      .arrow-left {
        margin-top: 15px;
        margin-right: 4px;
      }
    }
  }
</style>
