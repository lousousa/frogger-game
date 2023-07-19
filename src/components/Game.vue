<template>
  <main
    class="game-component"
    ref="root"
  >
    <Player ref="player" />

    <PrimaryFoe ref="primaryFoe" />
  </main>
</template>

<script lang="ts">
  import Player from '@/components/Player.vue'
  import PrimaryFoe from '@/components/PrimaryFoe.vue'

  import type { IPlayer }  from '@/types'

  import {
    ref,
    defineComponent,
    reactive,
    onMounted
  } from 'vue'

  export default defineComponent({
    components: {
      Player,
      PrimaryFoe
    },
    setup() {
      const root = ref()
      const player = ref()
      const primaryFoe = ref()

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

      let foeFrameRate = 0

      const update = (player: IPlayer | null, foe: any | null): void => {
        if (!player) return

        if (keys.up) player.moveUp()
        if (keys.right) player.moveRight()
        if (keys.down) player.moveDown()
        if (keys.left) player.moveLeft()

        if (!foe) return

        if (foeFrameRate === 12) {
          foeFrameRate = 0
          foe.move()
        }

        foeFrameRate++
      }

      onMounted(() => {
        start(root.value)

        window.setInterval((): void => {
          update(
            player.value,
            primaryFoe.value
          )
        }, 1000 / state.fps)
      })

      return {
        root,
        player,
        primaryFoe
      }
    }
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