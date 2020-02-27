import { ref } from '@vue/composition-api'

export default function useQrCodeFeature() {
  const qrCodeSize = 150

  function generateQrCodeValue(partyId) {
    return `http://192.168.43.156:8081/#/room/${partyId}`
  }

  return { qrCodeSize, generateQrCodeValue }
}
