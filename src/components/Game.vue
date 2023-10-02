<template>
  <div
    class="page-wrapper"
  >
    <div>
      <main
        class="game-component"
        ref="root"
        :style="`
          --cell-size: ${state.cellSize}px;
          --game-size-width: ${state.gameSize.width};
          --game-size-height: ${state.gameSize.height};
        `"
      >
        <Player
          ref="player"
        />

        <PrimaryFoe
          v-for="(foe, idx) in foeList"
          :key="`foe_${idx}`"
          :spawn-position="{ x: foe.x, y: foe.y }"
          :direction="foe.dir"
          :ref="setFoeRef"
          @player-collision="onFoeCollision"
        />

        <Checkpoint
          ref="checkpoint"
          @player-collision="onCheckpointCollision"
        />
      </main>

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
    </div>
  </div>
</template>

<script setup lang="ts">
  import Player from '@/components/Player.vue'
  import PrimaryFoe from '@/components/PrimaryFoe.vue'
  import Checkpoint from '@/components/Checkpoint.vue'

  import { ref, reactive, onMounted, type VNodeRef } from 'vue'
  import { foeList } from '@/foe-list'
  import { CELL_SIZE, GAME_SIZE } from '@/constants'

  import type { IPlayer, IFoe, IFoeRef } from '@/types'

  const root = ref()
  const player = ref()
  const checkpoint = ref()

  type KeysType = {
    [key: string]: boolean
  }

  const keys:KeysType = reactive({
    up: false,
    right: false,
    down: false,
    left: false
  })

  const state = reactive({
    cellSize: CELL_SIZE,
    gameSize: GAME_SIZE,
    fps: 60,
    isPaused: false
  })

  document.onkeydown = function(e) {
    if (e.code === 'ArrowUp') keys.up = true
    if (e.code === 'ArrowRight') keys.right = true
    if (e.code === 'ArrowDown') keys.down = true
    if (e.code === 'ArrowLeft') keys.left = true
  }

  document.onkeyup = function(e) {
    if (e.code === 'ArrowUp') keys.up = false
    if (e.code === 'ArrowRight') keys.right = false
    if (e.code === 'ArrowDown') keys.down = false
    if (e.code === 'ArrowLeft') keys.left = false

    player.value.setPressed(false)
  }

  const start = (rootElement: HTMLElement | null):void => {
    if (!rootElement) return

    rootElement.style.width = `${ CELL_SIZE * GAME_SIZE.width }px`
    rootElement.style.height = `${ CELL_SIZE * GAME_SIZE.height }px`
  }

  const clearKeys = () => {
    const checkingKeys = ['up', 'right', 'down', 'left']
    checkingKeys.forEach(key => { keys[key] = false })
  }

  const update = (player: IPlayer | null, foeRefs: IFoeRef[] | null): void => {
    if (!player || state.isPaused) return

    if (keys.up) player.move({x: 0, y: -1})
    if (keys.right) player.move({x: 1, y: 0})
    if (keys.down) player.move({x: 0, y: 1})
    if (keys.left) player.move({x: -1, y: 0})

    foeRefs?.forEach(foe => {
      if (foe.frameCounter === 1) {
        foe.frameCounter = 0
        foe.component.move()
      }

      foe.component.checkPlayerCollision(player.getPosition())
      foe.frameCounter++
    })

    checkpoint.value.checkPlayerCollision(player.getPosition())
    clearKeys()
  }

  const onFoeCollision = () => {
    state.isPaused = true
    player.value.setDead(true)
    clearKeys()

    window.setTimeout(() => {
      player.value.reset()
      foeRefs?.forEach(foe => foe.component.reset())
      state.isPaused = false
    }, 750)
  }

  const onCheckpointCollision = () => {
    state.isPaused = true

    window.setTimeout(() => {
      const confirmation = confirm('You\'ve won! Play it again?')

      if (confirmation) {
        clearKeys()

        player.value.reset()
        foeRefs?.forEach(foe => foe.component.reset())

        state.isPaused = false
      }
    }, 150)
  }

  const onButtonPress = (ev: any) => {
    keys[ev.target.dataset.direction] = true
    player.value.setPressed(false)
  }

  onMounted(() => {
    start(root.value)

    window.setInterval((): void => {
      update(
        player.value,
        foeRefs
      )
    }, 1000 / state.fps)
  })

  const foeRefs: IFoeRef[] = []

  const setFoeRef: any = (component: IFoe) => {
    foeRefs.push({ component, frameCounter: 0 })
  }

  defineExpose({
    foeList,
    setFoeRef
  })
</script>

<style lang="scss" scoped>
  .page-wrapper {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-page);
  }

  .game-component {
    background: linear-gradient(
      var(--color-background-1) 33.33%,
      var(--color-background-2) 33.33%,
      var(--color-background-2) 66.66%,
      var(--color-background-3) 66.66%);
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }

  .virtual-keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .buttons-group {
      display: flex;
      gap: calc(40px);
    }

    .button {
      background-color: #edede9;
      opacity: .25;
      padding: 6px 12px;
      width: 40px;
      height: 40px;
      text-align: center;
      border-radius: 20px;
    }
  }
</style>
