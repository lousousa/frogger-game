<template>
  <div
    class="virtual-keyboard"
  >
    <div
      class="button"
      @click="onButtonPress"
      data-direction="up"
    />

    <div
      class="buttons-group"
    >
      <div
        class="button"
        @click="onButtonPress"
        data-direction="left"
      />

      <div
        class="button"
        @click="onButtonPress"
        data-direction="right"
      />
    </div>

    <div
      class="button"
      @click="onButtonPress"
      data-direction="down"
    />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits({
    'button-press': direction => direction
  })

  const onButtonPress = (ev: any) => {
    emit('button-press', ev.target.dataset.direction)
  }
</script>

<style lang="scss" scoped>
  .virtual-keyboard {
    --button-size: 48px;

    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 16px;
    left: calc(50% - var(--button-size) - var(--button-size) / 2);
    position: absolute;

    .buttons-group {
      display: flex;
      gap: var(--button-size);
    }

    .button {
      background-color: #edede9;
      opacity: .25;
      padding: 6px 12px;
      width: var(--button-size);
      height: var(--button-size);
      text-align: center;
      border-radius: calc(var(--button-size) / 2);
    }
  }
</style>
