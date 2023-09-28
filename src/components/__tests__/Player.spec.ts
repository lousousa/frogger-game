import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import Player from '@/components/Player.vue'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = shallowMount(Player)
})

afterEach(() => {
  wrapper.unmount()
})

describe('Player', () => {
  it('renders properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('moves up when the direction is applied', () => {
    wrapper.vm.state.x = 32
    wrapper.vm.state.y = 32

    wrapper.vm.move({ x: 0, y: -1 })

    expect(wrapper.vm.state.x).toEqual(32)
    expect(wrapper.vm.state.y).toEqual(0)
  })

  it('moves right when the direction is applied', () => {
    expect(wrapper.vm.state.x).toEqual(0)
    expect(wrapper.vm.state.y).toEqual(0)

    wrapper.vm.move({ x: 1, y: 0 })

    expect(wrapper.vm.state.x).toEqual(32)
    expect(wrapper.vm.state.y).toEqual(0)
  })

  it('moves down when the direction is applied', () => {
    expect(wrapper.vm.state.x).toEqual(0)
    expect(wrapper.vm.state.y).toEqual(0)

    wrapper.vm.move({ x: 0, y: 1 })

    expect(wrapper.vm.state.x).toEqual(0)
    expect(wrapper.vm.state.y).toEqual(32)
  })

  it('moves left when the direction is applied', () => {
    wrapper.vm.state.x = 32
    wrapper.vm.state.y = 32

    wrapper.vm.move({ x: -1, y: 0 })

    expect(wrapper.vm.state.x).toEqual(0)
    expect(wrapper.vm.state.y).toEqual(32)
  })
})
