import { ref } from '@vue/composition-api'

import { googleService } from '@front/services'

export default function useGoogleAuth() {
  const isSignIn = ref(false)
  const googleSignInAPI = document.createElement('script')
  googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
  document.head.appendChild(googleSignInAPI)

  async function init() {
    await googleService.init()
    const currentUser = await googleService.getCurrentUser()
    currentUser.listen(async () => {
      isSignIn.value = await googleService.isSignIn()
    })
  }

  googleSignInAPI.onload = init

  async function signIn() {
    await googleService.signIn()
  }

  async function signOut() {
    await googleService.signOut()
  }

  return { isSignIn, signIn, signOut }
}
