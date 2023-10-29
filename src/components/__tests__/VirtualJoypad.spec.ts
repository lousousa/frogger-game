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
})
