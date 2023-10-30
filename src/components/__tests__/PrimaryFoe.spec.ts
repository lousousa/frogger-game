import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import PrimaryFoe from '@/components/PrimaryFoe.vue'

import { foeList } from '@/foe-list'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = shallowMount(PrimaryFoe, {
    propsData: {
      spawnPosition: { x: foeList[0].x, y: foeList[0].y },
      direction: foeList[0].dir
    }
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('PrimaryFoe', () => {
  it('renders properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('sets state position as spawn position on component mounting', () => {
    expect(wrapper.vm.state).toEqual(wrapper.vm.spawnPosition)
  })

  it('emits player collision when it has a close player position', () => {
    wrapper.vm.checkPlayerCollision(wrapper.vm.state)
    expect(wrapper.emitted()['player-collision']).toBeTruthy()
  })

  it('gets moved to spawn position on reset', () => {
    wrapper.vm.state.x = 0
    wrapper.vm.state.y = 0

    expect(wrapper.vm.state).not.toEqual(wrapper.vm.spawnPosition)
    wrapper.vm.reset()
    expect(wrapper.vm.state).toEqual(wrapper.vm.spawnPosition)
  })

  it('adds dynamically the spawn position to component\'s template', () => {
    expect(
      (wrapper.element as HTMLElement).style.getPropertyValue('--spawnPositionX')
    ).toEqual(`${wrapper.vm.spawnPosition.x}px`)

    expect(
      (wrapper.element as HTMLElement).style.getPropertyValue('--spawnPositionY')
    ).toEqual(`${wrapper.vm.spawnPosition.y}px`)
  })
})
