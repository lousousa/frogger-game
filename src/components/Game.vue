<template>
  <main
    class="game-component"
    ref="root"
  >
    <Player
      ref="player"
    />

    <PrimaryFoe
      v-for="(foe, idx) in foesList"
      :key="`foe_${idx}`"
      :spawn-position="{ x: foe.x, y: foe.y }"
      :ref="setFoeRef"
      @player-collision="onPlayerCollision"
    />
  </main>
</template>

<script setup lang="ts">
  import Player from '@/components/Player.vue'
  import PrimaryFoe from '@/components/PrimaryFoe.vue'

  import { ref, reactive, onMounted } from 'vue'

  import type { IPlayer }  from '@/types'

  const root = ref()
  const player = ref()

  const keys = reactive({
    up: false,
    right: false,
    down: false,
    left: false
  })

  const state = reactive({
    fps: 60,
    cellSize: 32
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
    rootElement.style.height = `${ state.cellSize * 9 }px`
  }

  const update = (player: IPlayer | null, foeRefs: any[] | null): void => {
    if (!player) return

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
  }

  const onPlayerCollision = () => {
    // player.value.reset()
    // foeRefs?.forEach(foe => foe.component.reset())
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

  const foesList = [
    { x: 64, y: 64 },
    { x: 288, y: 64 },
    { x: 512, y: 64 },
    { x: 0, y: 128 },
    { x: 192, y: 128 },
    { x: 320, y: 128 },
    { x: 416, y: 128 },
    { x: 128, y: 192 },
    { x: 384, y: 192 },
    { x: 512, y: 192 }
  ]

  const foeRefs: any[] = []

  const setFoeRef = (component: any) => {
    foeRefs.push({ component, frameCounter: 0 })
  }

  defineExpose({
    foesList,
    setFoeRef
  })
</script>

<style lang="scss" scoped>
  .game-component {
    background-color: #222;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
  }
</style>