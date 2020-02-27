import axios, { AxiosInstance } from 'axios'

import { Party } from '@/models/party'

export interface PartyService {
  create(party: Party): Promise<Party>
}

class PartyServiceImpl implements PartyService {
  private readonly api: AxiosInstance

  constructor({ hostApi }) {
    this.api = axios.create({ baseURL: hostApi })
  }

  async create(party: Party): Promise<Party> {
    const { data } = await this.api.post('/parties', {
      owner: party.owner
    })
    return data
  }
}

export function createPartyService(...opts): PartyService {
  return new PartyServiceImpl(...opts)
}

export default PartyService
