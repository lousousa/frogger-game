import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Game from '@/components/Game.vue'
import Player from '@/components/Player.vue'
import Checkpoint from '@/components/Checkpoint.vue'
import PrimaryFoe from '@/components/PrimaryFoe.vue'

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
    const playerWrapper = wrapper.findComponent(Player)
    expect(playerWrapper.vm).toBeTruthy()
  })

  it('renders a checkpoint component', () => {
    const checkpointWrapper = wrapper.findComponent(Checkpoint)
    expect(checkpointWrapper.vm).toBeTruthy()
  })

  it('renders at least one foe component', () => {
    const foeWrapper = wrapper.findComponent(PrimaryFoe)
    expect(foeWrapper.vm).toBeTruthy()
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
})
