import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import Player from '@/components/Player.vue'

import { CELL_SIZE } from '@/constants'

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
    const initialX = wrapper.vm.state.x
    const initialY = wrapper.vm.state.y

    wrapper.vm.move({ x: 0, y: -1 })

    expect(wrapper.vm.state.x).toEqual(initialX)
    expect(wrapper.vm.state.y).toEqual(initialY - CELL_SIZE)
  })

  it('moves right when the direction is applied', () => {
    const initialX = wrapper.vm.state.x
    const initialY = wrapper.vm.state.y

    wrapper.vm.move({ x: 1, y: 0 })

    expect(wrapper.vm.state.x).toEqual(initialX + CELL_SIZE)
    expect(wrapper.vm.state.y).toEqual(initialY)
  })

  it('moves down when the direction is applied',  () => {
    wrapper.vm.state.y = wrapper.vm.state.y - CELL_SIZE

    const initialX = wrapper.vm.state.x
    const initialY = wrapper.vm.state.y

    wrapper.vm.move({ x: 0, y: 1 })

    expect(wrapper.vm.state.x).toEqual(initialX)
    expect(wrapper.vm.state.y).toEqual(initialY + CELL_SIZE)
  })

  it('moves left when the direction is applied', () => {
    const initialX = wrapper.vm.state.x
    const initialY = wrapper.vm.state.y

    wrapper.vm.move({ x: -1, y: 0 })

    expect(wrapper.vm.state.x).toEqual(initialX - CELL_SIZE)
    expect(wrapper.vm.state.y).toEqual(initialY)
  })

  it('restore all state values on reset', () => {
    const initialState = { ...wrapper.vm.state }

    wrapper.vm.state.x = 0
    wrapper.vm.state.y = 1
    wrapper.vm.state.isPressed = true
    wrapper.vm.state.isDead = true

    expect(initialState.x).not.toEqual(wrapper.vm.state.x)
    expect(initialState.y).not.toEqual(wrapper.vm.state.y)
    expect(initialState.isPressed).not.toEqual(wrapper.vm.state.isPressed)
    expect(initialState.isDead).not.toEqual(wrapper.vm.state.isDead)

    wrapper.vm.reset()

    expect(initialState.x).toEqual(wrapper.vm.state.x)
    expect(initialState.y).toEqual(wrapper.vm.state.y)
    expect(initialState.isPressed).toEqual(wrapper.vm.state.isPressed)
    expect(initialState.isDead).toEqual(wrapper.vm.state.isDead)
  })

  it('updates isPressed state on setPressed function', () => {
    expect(wrapper.vm.state.isPressed).toBeFalsy()
    wrapper.vm.setPressed(true)
    expect(wrapper.vm.state.isPressed).toBeTruthy()
  })

  it('updates isDead state on setDead function', () => {
    expect(wrapper.vm.state.isDead).toBeFalsy()
    wrapper.vm.setDead(true)
    expect(wrapper.vm.state.isDead).toBeTruthy()
  })

  it('has -is-dead modifier class whether isDead state is true', async () => {
    expect(wrapper.vm.$el.classList.contains('-is-dead')).toBeFalsy()
    await wrapper.vm.setDead(true)
    expect(wrapper.vm.$el.classList.contains('-is-dead')).toBeTruthy()
  })

  it('gets player position', () => {
    wrapper.vm.state.x = 0
    wrapper.vm.state.y = 0
    expect(wrapper.vm.getPosition()).toEqual({x: 0, y: 0})
  })
})
