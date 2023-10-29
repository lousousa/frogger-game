import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import PrimaryFoe from '@/components/PrimaryFoe.vue'

let wrapper: VueWrapper<any>

beforeEach(() => {
  wrapper = shallowMount(PrimaryFoe, {
    propsData: {
      spawnPosition: { x: 0, y: 0 },
      direction: 'left'
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
})
