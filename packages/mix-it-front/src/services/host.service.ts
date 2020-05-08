import Vue from 'vue'

class HostService {
  private readonly hostApi: string

  constructor({ hostApi }) {
    this.hostApi = `${hostApi}/host`
  }

  async create(userId: string) {
    return Vue.axios.get(this.hostApi, { params: { userId } })
  }
}

export default HostService
