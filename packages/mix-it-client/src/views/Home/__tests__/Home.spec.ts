import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'

describe('Home.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Home, {
      methods: {
        signIn: jest.fn(),
        signOut: jest.fn(),
        redirectToRoom: jest.fn()
      }
    })
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
