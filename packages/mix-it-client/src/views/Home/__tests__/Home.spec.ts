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

  describe('Input join room', () => {
    it('should call redirectToRoom on keydown.enter', () => {
      wrapper.vm.redirectToRoom = jest.fn()
      const input = wrapper.find('[data-test=join-room]')
      input.setValue('room1')
      input.trigger('keydown.enter')
      expect(wrapper.vm.redirectToRoom).toHaveBeenCalled()
    })
  })
})
