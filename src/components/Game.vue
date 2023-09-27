<template>
  <main
    class="game-component"
    ref="root"
  >
    <Player
      ref="player"
    />

    <PrimaryFoe
      v-for="(foe, idx) in foeList"
      :key="`foe_${idx}`"
      :spawn-position="{ x: foe.x, y: foe.y }"
      :ref="setFoeRef"
      @player-collision="onFoeCollision"
    />

    <Checkpoint
      ref="checkpoint"
      :position-y="24"
      @player-collision="onCheckpointCollision"
    />
  </main>
</template>

<script setup lang="ts">
  import Player from '@/components/Player.vue'
  import PrimaryFoe from '@/components/PrimaryFoe.vue'
  import Checkpoint from '@/components/Checkpoint.vue'

  import { ref, reactive, onMounted } from 'vue'
  import { foeList } from '@/foe-list'

  import type { IPlayer } from '@/types'

  const root = ref()
  const player = ref()
  const checkpoint = ref()

  const keys = reactive({
    up: false,
    right: false,
    down: false,
    left: false
  })

  const state = reactive({
    fps: 60,
    cellSize: 32,
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

    rootElement.style.width = `${ state.cellSize * 16 }px`
    rootElement.style.height = `${ state.cellSize * 25 }px`
  }

  const update = (player: IPlayer | null, foeRefs: any[] | null): void => {
    if (!player || state.isPaused) return

    if (keys.up) player.move({x: 0, y: -1})
    if (keys.right) player.move({x: 1, y: 0})
    if (keys.down) player.move({x: 0, y: 1})
    if (keys.left) player.move({x: -1, y: 0})

    foeRefs?.forEach(foe => {
      if (foe.frameCounter === 6) {
        foe.frameCounter = 0
        foe.component.move()
      }

      foe.component.checkPlayerCollision(player.getPosition())
      foe.frameCounter++
    })

    checkpoint.value.checkPlayerCollision(player.getPosition())
  }

  const onFoeCollision = () => {
    state.isPaused = true

    window.setTimeout(() => {
      player.value.reset()
      foeRefs?.forEach(foe => foe.component.reset())
      state.isPaused = false
    }, 1000)
  }

  const onCheckpointCollision = () => {
    state.isPaused = true

    window.setTimeout(() => {
      const confirmation = confirm('You win! Play again?')

      if (confirmation) {
        player.value.reset()
        foeRefs?.forEach(foe => foe.component.reset())
        state.isPaused = false
      }
    }, 150)
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

  const foeRefs: any[] = []

  const setFoeRef = (component: any) => {
    foeRefs.push({ component, frameCounter: 0 })
  }

  defineExpose({
    foeList,
    setFoeRef
  })
</script>

<style lang="scss" scoped>
  .game-component {
    background-color: #161b33;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }
</style>@/foe-list