import { ref } from '@vue/composition-api'

export default function useGoogleAuth(context) {
  const isSignIn = ref(context.root.$gAuth.isAuthorized)

  async function signIn() {
    await context.root.$gAuth.signIn()
    isSignIn.value = context.root.$gAuth.isAuthorized
  }

  async function signOut() {
    await context.root.$gAuth.signOut()
    isSignIn.value = context.root.$gAuth.isAuthorized
  }

  return { isSignIn, signIn, signOut }
}
