import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'
import useHome from '../home.feature'

describe('Home.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Home)
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
