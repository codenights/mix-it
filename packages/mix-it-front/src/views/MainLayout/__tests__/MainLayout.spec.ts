import { shallowMount } from '@vue/test-utils'
import MainLayout from '../MainLayout.vue'

// TODO Resolve router-link
describe('MainLayout.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(MainLayout)
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
  describe('display', () => {
    describe('navbar', () => {
      it('should display the navbar', () => {
        // Given
        const navbarBlock = wrapper.find('[data-test=navbar]')
        // Then
        expect(navbarBlock.exists()).toBe(true)
      })
    })
  })
})
