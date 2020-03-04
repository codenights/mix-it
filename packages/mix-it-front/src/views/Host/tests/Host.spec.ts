// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils'

import Host from '../Host.vue'

describe('Host.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Host)
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
