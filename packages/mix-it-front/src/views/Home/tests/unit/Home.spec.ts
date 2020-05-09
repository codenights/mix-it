// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils'
import { createTestVue } from '@front/testHelper'
import Home from '../../Home.vue'

const mockSignIn = jest.fn()
const mockSignOut = jest.fn()
const mockCreateParty = jest.fn().mockReturnValue({ id: 1 })
const mockPushStub = jest.fn()

let mockIsSignIn

jest.mock('@front/feature/google-auth.feature', () => () => ({
  signIn: mockSignIn,
  signOut: mockSignOut,
  isSignIn: mockIsSignIn
}))

jest.mock('@front/views/Home/home.feature', () => () => ({
  createParty: mockCreateParty
}))

const localVue = createTestVue()

beforeEach(() => {
  jest.restoreAllMocks()
  mockIsSignIn = true
})

describe('Home.vue', () => {
  describe('default', () => {
    it('should create', () => {
      // Given
      const wrapper = shallowMount(Home, {
        localVue
      })
      // Then
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('display', () => {
    describe('When the user is signed in', () => {
      it('should display the button to create party', () => {
        // Given
        const wrapper = shallowMount(Home, {
          localVue
        })
        const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
        // Then
        expect(btnCreateParty.exists()).toBe(true)
      })
    })
    describe('When the user is not signed in', () => {
      it('should not display the button to create party', () => {
        // Given
        mockIsSignIn = false
        const wrapper = shallowMount(Home, {
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
        const wrapper = shallowMount(Home, {
          localVue
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
        const wrapper = shallowMount(Home, {
          localVue
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
        it('should call method createParty', async () => {
          // Given
          const wrapper = shallowMount(Home, {
            localVue,
            mocks: {
              $router: { push: mockPushStub }
            }
          })
          const btnCreateParty = wrapper.find('[data-test=btn-create-party]')
          // When
          btnCreateParty.trigger('click')
          await wrapper.vm.$nextTick()
          // Then
          expect(mockCreateParty).toHaveBeenCalled()
          expect(mockPushStub).toHaveBeenCalledWith(`host/1`)
        })
      })
    })
  })
})
