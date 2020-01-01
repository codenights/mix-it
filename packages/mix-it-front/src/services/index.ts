import HostService from '@/services/host.service'

const hostUrl = 'http://localhost:3000'

const hostService = new HostService({ hostApi: hostUrl })

// eslint-disable-next-line import/prefer-default-export
export { hostService }
