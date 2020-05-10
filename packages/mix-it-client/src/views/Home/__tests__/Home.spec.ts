import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'

describe('Home.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Home, {
      methods: {
        signIn: () => {},
        signOut: () => {},
        redirectToRoom: () => {}
      }
    })
  })

  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
