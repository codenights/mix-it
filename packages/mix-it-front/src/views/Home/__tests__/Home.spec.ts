import Vue from 'vue'
import VueCompositionApi, { ref } from '@vue/composition-api'
import { shallowMount, Wrapper } from '@vue/test-utils'
import Home from '../Home.vue'

Vue.use(VueCompositionApi)

describe('Home.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Home, {
      setup() {
        return {
          createParty: jest.fn(),
          isSignIn: false,
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

  describe('display', () => {
    describe('When the user is signed in', () => {
      it('should display the button to create party', () => {
        // Given
        wrapper.setData({
          isSignIn: true
        })
        const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
        // Then
        expect(btnCreateParty.exists()).toBe(true)
      })
    })
    describe('When the user is not signed in', () => {
      it('should display the button to create party', () => {
        // Given
        const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
        // Then
        expect(btnCreateParty.exists()).toBe(false)
      })
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

    describe('@click btn sign out', () => {
      it('should call method signOut', () => {
        // Given
        const btnSigOut = wrapper.find('[data-test=btn-sign-out]')
        // When
        btnSigOut.trigger('click')
        // Then
        expect(wrapper.vm.signOut).toHaveBeenCalled()
      })
    })

    describe('@click btn create party', () => {
      describe('When the user is signed in', () => {
        it('should call method createParty', () => {
          // Given
          wrapper.vm.isSignIn = true
          const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
          // When
          btnCreateParty.trigger('click')
          // Then
          expect(wrapper.vm.createParty).toHaveBeenCalled()
        })
      })
    })
  })
})
