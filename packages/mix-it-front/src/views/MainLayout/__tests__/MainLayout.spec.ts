import { shallowMount } from '@vue/test-utils'
import MainLayout from '../MainLayout.vue'

// TODO Resolve router-link
describe('MainLayout.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MainLayout, {
      stubs: ['router-view']
    })
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
