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
    >
      <ArrowDown
        class="arrow-down"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    ArrowUp,
    ArrowRight,
    ArrowDown,
    ArrowLeft
  } from '@/assets/icons'

  const emit = defineEmits({
    'button-press': direction => direction
  })

  const onButtonPress = (direction: string) => {
    emit('button-press', direction)
  }
</script>

<style lang="scss" scoped>
  .virtual-keyboard {
    --button-size: 56px;

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
        margin-top: 8px;
      }

      .arrow-right {
        margin-top: 10px;
        margin-left: 6px;
      }

      .arrow-down {
        margin-top: 12px;
      }

      .arrow-left {
        margin-top: 10px;
        margin-right: 6px;
      }
    }
  }
</style>
