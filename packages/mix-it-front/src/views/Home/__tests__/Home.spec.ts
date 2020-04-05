import { mount } from '@vue/test-utils'
import { createTestVue } from '@/testHelper'
import Home from '../Home.vue'

let mockSignIn
let mockSignOut
let mockCreateParty
let mockIsSignIn

jest.mock('@/feature/google-auth.feature', () => {
  return () => ({
    signIn: mockSignIn,
    signOut: mockSignOut,
    isSignIn: mockIsSignIn
  })
})

jest.mock('@/views/Home/home.feature', () => {
  return () => ({
    createParty: mockCreateParty
  })
})

beforeEach(() => {
  mockSignIn = jest.fn()
  mockSignOut = jest.fn()
  mockCreateParty = jest.fn()
  mockIsSignIn = true
})

describe('Home.vue', () => {
  describe('default', () => {
    it('should create', () => {
      // Given
      const wrapper = mount(Home, {
        localVue: createTestVue()
      })
      // Then
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('display', () => {
    describe('When the user is signed in', () => {
      it('should display the button to create party', () => {
        // Given
        const wrapper = mount(Home, {
          localVue: createTestVue()
        })
        const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
        // Then
        expect(btnCreateParty.exists()).toBe(true)
      })
    })
    describe('When the user is not signed in', () => {
      it('should display the button to create party', () => {
        // Given
        mockIsSignIn = false
        const wrapper = mount(Home, {
          localVue: createTestVue()
        })
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
        const wrapper = mount(Home, {
          localVue: createTestVue()
        })
        const btnSignIn = wrapper.find('[data-test=btn-sign-in]')
        // When
        btnSignIn.trigger('click')
        // Then
        return expect(mockSignIn).toHaveBeenCalled()
      })
    })

    describe('@click btn sign out', () => {
      it('should call method signOut', () => {
        // Given
        const wrapper = mount(Home, {
          localVue: createTestVue()
        })
        const btnSigOut = wrapper.find('[data-test=btn-sign-out]')
        // When
        btnSigOut.trigger('click')
        // Then
        expect(mockSignOut).toHaveBeenCalled()
      })
    })

    describe('@click btn create party', () => {
      describe('When the user is signed in', () => {
        it('should call method createParty', () => {
          // Given
          mockIsSignIn = true
          const wrapper = mount(Home, {
            localVue: createTestVue()
          })
          const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
          // When
          btnCreateParty.trigger('click')
          // Then
          expect(mockCreateParty).toHaveBeenCalled()
        })
      })
    })
  })
})
