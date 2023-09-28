import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Player from '@/components/Player.vue'

let wrapper = null

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
})