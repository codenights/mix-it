import useHome from '@/views/Home/home.feature'

const mockGetCurrentGoogleUser = jest.fn().mockReturnValue({ getId: () => 2 })
const mockCreateParty = jest.fn().mockReturnValue({ getId: () => 2 })

jest.mock('@/services', () => ({
  googleService: {
    getCurrentGoogleUser: () => mockGetCurrentGoogleUser()
  },
  partyService: {
    create: () => mockCreateParty()
  }
}))

describe('HomeFeature', () => {
  let homeFeature
  beforeEach(() => {
    jest.restoreAllMocks()
    homeFeature = useHome()
  })

  it('should call method create from partyService with user Id', async () => {
    // When
    await homeFeature.createParty()
    // Then
    expect(mockGetCurrentGoogleUser).toHaveBeenCalled()
    expect(mockCreateParty).toHaveBeenCalled()
  })
})
