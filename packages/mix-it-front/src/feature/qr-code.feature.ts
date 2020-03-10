import { ref } from '@vue/composition-api'

export default function useQrCodeFeature() {
  const qrCodeSize = 150

  function generateQrCodeValue(partyId) {
    return `http://localhost:8081/#/room/${partyId}`
  }

  return { qrCodeSize, generateQrCodeValue }
}
