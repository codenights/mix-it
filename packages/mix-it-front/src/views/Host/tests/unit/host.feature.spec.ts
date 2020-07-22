import Vue from 'vue'

import useHost from '@front/views/Host/host.feature'

const mockOnMounted = jest.fn()
const mockOnUnmounted = jest.fn()

jest.mock('@vue/composition-api', () => ({
  onMounted: () => mockOnMounted(),
  onUnmounted: () => mockOnUnmounted(),
  reactive: (obj) => obj,
  ref: (value) => ({ value })
}))

const mockGetParty = jest.fn(async (id: string) => ({
  id,
  playlist: [],
  owner: 'john'
}))
const mockJoinParty = jest.fn()
const mockLeaveParty = jest.fn()

jest.mock('@front/services', () => ({
  partyService: {
    get: (id: string) => mockGetParty(id),
    join: (id: string) => mockJoinParty(id),
    leave: (id: string) => mockLeaveParty(id)
  }
}))

describe('host.feature', () => {
  let host: ReturnType<typeof useHost>

  beforeEach(() => {
    host = useHost('id')
  })

  describe('data', () => {
    it('should return a party', () => {
      expect(host.party).toStrictEqual({
        id: 'id',
        playlist: [],
        owner: ''
      })
    })

    it('should return users', () => {
      expect(host.users.value).toStrictEqual([])
    })
  })

  describe('#fetchParty', () => {
    beforeEach(async () => {
      await host.fetchParty()
    })

    it('should call partyService#get', () => {
      expect(mockGetParty).toHaveBeenCalledWith('id')
    })

    it('should set the party', () => {
      expect(host.party.id).toBe('id')
      expect(host.party.playlist).toStrictEqual([])
      expect(host.party.owner).toBe('john')
    })
  })

  describe('#join', () => {
    beforeEach(async () => {
      await host.join()
    })

    it('should call partyService#join', () => {
      expect(mockJoinParty).toHaveBeenCalledWith('id')
    })
  })

  describe('#leave', () => {
    beforeEach(async () => {
      await host.leave()
    })

    it('should call partyService#leave', () => {
      expect(mockLeaveParty).toHaveBeenCalledWith('id')
    })
  })
})
