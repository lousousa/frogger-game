import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import VirtualJoypad from '@/components/VirtualJoypad.vue'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = shallowMount(VirtualJoypad)
})

afterEach(() => {
  wrapper.unmount()
})

describe('VirtualJoypad', () => {
  it('renders properly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders three buttons as default', () => {
    const buttons = wrapper.findAll('.button')
    expect(buttons.length).toBe(3)
  })

  it('renders four buttons when down is enabled', async () => {
    wrapper.vm.isDownButtonEnabled = true
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('.button')
    expect(buttons.length).toBe(4)
  })

  async function getButtonAction(idx: number) {
    const buttons = wrapper.findAll('.button')
    const currentButton = buttons.at(idx)
    await currentButton?.trigger('click')
    return (wrapper.emitted()['button-press'][0] as Array<string>)[0]
  }

  it('emits button press to up', async () => {
    const action = await getButtonAction(0)
    expect(action).toEqual('up')
  })

  it('emits button press to right', async () => {
    const action = await getButtonAction(2)
    expect(action).toEqual('right')
  })

  it('emits button press to down', async () => {
    wrapper.vm.isDownButtonEnabled = true
    await wrapper.vm.$nextTick()

    const action = await getButtonAction(3)
    expect(action).toEqual('down')
  })

  it('emits button press to left', async () => {
    const action = await getButtonAction(1)
    expect(action).toEqual('left')
  })
})
