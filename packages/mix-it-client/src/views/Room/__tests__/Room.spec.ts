import { shallowMount } from '@vue/test-utils'
import Room from '../Room.vue'

describe('Room.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Room)
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
  describe('display', () => {
    describe('players container', () => {
      it('should display the block', () => {
        // Given
        const playersContainerBlock = wrapper.find('[data-test=players-container]')
        // Then
        expect(playersContainerBlock.exists()).toBe(true)
      })
    })

    describe('users container', () => {
      it('should display the block', () => {
        // Given
        const usersContainerBlock = wrapper.find('[data-test=users-container]')
        // Then
        expect(usersContainerBlock.exists()).toBe(true)
      })
    })
    describe('playlist container', () => {
      it('should display the block', () => {
        // Given
        const playlistContainer = wrapper.find('[data-test=playlist-container]')
        // Then
        expect(playlistContainer.exists()).toBe(true)
      })
    })
    describe('qr-code container', () => {
      it('should display the block', () => {
        // Given
        const qrCodeContainerBlock = wrapper.find('[data-test=qr-code-container]')
        // Then
        expect(qrCodeContainerBlock.exists()).toBe(true)
      })
    })
  })
})
