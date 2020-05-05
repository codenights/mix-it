// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils'
import { createTestVue } from '@/testHelper'

import Host from '../../Host.vue'

const mockOnReady = jest.fn()
const mockOnPlay = jest.fn()
const mockOnPause = jest.fn()
const mockOnEnded = jest.fn()
const mockLinkPlayer = jest.fn()

const mockFetchParty = jest.fn()
const mockJoinRoomAsHost = jest.fn()
const mockLeave = jest.fn()
const mockOnPlaylist = jest.fn()

const mockGenerateQrCodeValue = jest.fn().mockReturnValue('url qr-code')

jest.mock('@/views/Host/host.feature', () => () => ({
  party: { playlist: [] },
  fetchParty: mockFetchParty,
  joinRoomAsHost: mockJoinRoomAsHost,
  leave: mockLeave,
  onPlaylist: mockOnPlaylist,
}))
jest.mock('@/feature/player.feature', () => () => ({
  player: {},
  videoId: '',
  nextVideoId: '',
  linkPlayer: mockLinkPlayer,
  onReady: mockOnReady,
  onPlay: mockOnPlay,
  onPause: mockOnPause,
  onEnded: mockOnEnded,
}))
jest.mock('@/feature/qr-code.feature', () => () => ({
  qrCodeSize: 150,
  generateQrCodeValue: mockGenerateQrCodeValue,
}))

const localVue = createTestVue()

describe('Host.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Host, {
      localVue,
      stubs: {
        'qrcode-vue': '<div data-test="qrcode-vue"></div>',
        youtube: '<div data-test="youtube-player"></div>',
      },
    })
  })
  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('display', () => {
    it('should display two youtube players', () => {
      // Given
      const youtubePlayers = wrapper.findAll('[data-test=youtube-player]')
      // Then
      expect(youtubePlayers).toHaveLength(2)
    })
  })
})
