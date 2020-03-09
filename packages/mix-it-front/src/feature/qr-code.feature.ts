import { ref } from '@vue/composition-api'

export default function useQrCodeFeature() {
  const qrCodeSize = 150

  function generateQrCodeValue(partyId) {
    return `http://10.30.48.190:8081/#/room/${partyId}`
  }

  return { qrCodeSize, generateQrCodeValue }
}
