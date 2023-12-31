import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Game from '@/components/Game.vue'
import Player from '@/components/Player.vue'
import Checkpoint from '@/components/Checkpoint.vue'
import PrimaryFoe from '@/components/PrimaryFoe.vue'
import VirtualJoypad from '@/components/VirtualJoypad.vue'
import { foeList } from '@/foe-list'

import { CELL_SIZE, GAME_SIZE } from '@/constants'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = mount(Game, {
    attachTo: document.body
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('Game', () => {
  it('renders properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders a player component', () => {
    const componentWrapper = wrapper.findComponent(Player)
    expect(componentWrapper.vm).toBeTruthy()
  })

  it('renders a checkpoint component', () => {
    const componentWrapper = wrapper.findComponent(Checkpoint)
    expect(componentWrapper.vm).toBeTruthy()
  })

  it('renders at least one foe component', () => {
    const componentWrapper = wrapper.findComponent(PrimaryFoe)
    expect(componentWrapper.vm).toBeTruthy()
  })

  it('renders a virtual joypad component if its small screen', () => {
    const componentWrapper = wrapper.findComponent(VirtualJoypad)
    expect(componentWrapper.vm).toBeTruthy()
  })

  it('updates a key state on keydown event', async () => {
    expect(wrapper.vm.keys.up).toBeFalsy()
    await wrapper.trigger('keydown', {code: 'ArrowUp'})
    expect(wrapper.vm.keys.up).toBeTruthy()
  })

  it('updates a key state on keyup event', async () => {
    wrapper.vm.keys.up = true
    await wrapper.trigger('keyup', {code: 'ArrowUp'})
    expect(wrapper.vm.keys.up).toBeFalsy()
  })

  it('sets player to dead on foe collision', () => {
    const player = wrapper.vm.player
    const foe = wrapper.vm.foeRefs[0]
    const spySetDead = vi.spyOn(player, 'setDead')

    expect(spySetDead).not.toHaveBeenCalled()
    foe.component.checkPlayerCollision(foeList[0])
    expect(spySetDead).toHaveBeenCalled()
  })

  it('updates keys state on virtual button press', () => {
    expect(wrapper.vm.keys['up']).toBeFalsy()
    wrapper.vm.onVirtualButtonPress('up')
    expect(wrapper.vm.keys['up']).toBeTruthy()
  })

  it('sets all keys to false on clear keys', () => {
    const keys: Array<string> = Object.keys(wrapper.vm.keys)

    keys.forEach(key => wrapper.vm.keys[key] = true)

    wrapper.vm.clearKeys()

    keys.forEach(key => expect(wrapper.vm.keys[key]).toBeFalsy())
  })

  it('sets size values to game root element', () => {
    expect(
      (wrapper.vm.root as HTMLElement).style.getPropertyValue('--cell-size')
    ).toEqual(`${CELL_SIZE}px`)

    expect(
      (wrapper.vm.root as HTMLElement).style.getPropertyValue('--game-size-width')
    ).toEqual('' + GAME_SIZE.width)

    expect(
      (wrapper.vm.root as HTMLElement).style.getPropertyValue('--game-size-height')
    ).toEqual('' + GAME_SIZE.height)

    expect(
      (wrapper.vm.root as HTMLElement).style.getPropertyValue('width')
    ).toEqual(`${CELL_SIZE * GAME_SIZE.width}px`)

    expect(
      (wrapper.vm.root as HTMLElement).style.getPropertyValue('height')
    ).toEqual(`${CELL_SIZE * GAME_SIZE.height}px`)
  })
})
