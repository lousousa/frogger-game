<template>
  <div
    class="page-wrapper"
  >
    <div
      class="content-wrapper"
    >
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
    </div>

    <VirtualJoypad
      v-if="state.isScreenSmall"
      @button-press="onVirtualButtonPress"
    />
  </div>
</template>

<script setup lang="ts">
  import Player from '@/components/Player.vue'
  import PrimaryFoe from '@/components/PrimaryFoe.vue'
  import Checkpoint from '@/components/Checkpoint.vue'
  import VirtualJoypad from '@/components/VirtualJoypad.vue'

  import { ref, reactive, onMounted } from 'vue'
  import { foeList } from '@/foe-list'
  import { CELL_SIZE, GAME_SIZE, IS_SCREEN_SMALL } from '@/constants'

  import type { IPlayer, IFoe, IFoeRef } from '@/types'

  const root = ref()
  const player = ref()
  const checkpoint = ref()

  const foeRefs: IFoeRef[] = []

  const setFoeRef: any = (component: IFoe) => {
    foeRefs.push({ component, frameCounter: 0 })
  }

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
    isScreenSmall: IS_SCREEN_SMALL,
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

    window.setTimeout(() => {
      player.value.reset()
      foeRefs?.forEach(foe => foe.component.reset())
      state.isPaused = false
      clearKeys()
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

  const onVirtualButtonPress = (direction: string) => {
    keys[direction] = true
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
</script>

<style lang="scss" scoped>
  .page-wrapper {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-color: var(--color-page);
  }

  .content-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
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
</style>
