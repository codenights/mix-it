import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'

Vue.use(VueCompositionApi)

describe('Home.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Home, {
      setup() {
        return {
          createParty: jest.fn(),
          isSignIn: jest.fn(),
          signIn: jest.fn(),
          signOut: jest.fn(),
          redirectToRoom: jest.fn(),
          redirectToHost: jest.fn()
        }
      }
    })
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('@events', () => {
    describe('@click btn sign in', () => {
      it('should call method signIn', () => {
        // Given
        const btnSignIn = wrapper.find('[data-test=btn-sign-in]')
        // When
        btnSignIn.trigger('click')
        // Then
        expect(wrapper.vm.signIn).toHaveBeenCalled()
      })
    })
  })
})
