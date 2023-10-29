import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import Checkpoint from '@/components/Checkpoint.vue'

import { CELL_SIZE } from '@/constants'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = shallowMount(Checkpoint)
})

afterEach(() => {
  wrapper.unmount()
})

describe('Checkpoint', () => {
  it('renders properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('emits player collision when it has a close player position', () => {
    wrapper.vm.checkPlayerCollision({ x: 0, y: 0 })
    expect(wrapper.emitted()['player-collision']).toBeTruthy()
  })

  it('adds dynamically an y position to component\'s template', () => {
    expect(
      (wrapper.element as HTMLElement).style.getPropertyValue('--positionY')
    ).toEqual(`calc(${wrapper.vm.positionY} * ${CELL_SIZE}px)`)
  })
})
