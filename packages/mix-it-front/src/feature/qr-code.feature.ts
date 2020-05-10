import config from '@front/config'

export default function useQrCodeFeature() {
  const qrCodeSize = 150

  function generateQrCodeValue(partyId) {
    return `${config.client}/#/room/${partyId}`
  }

  return { qrCodeSize, generateQrCodeValue }
}
