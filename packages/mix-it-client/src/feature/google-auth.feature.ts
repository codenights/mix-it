import { ref } from '@vue/composition-api'

// eslint-disable-next-line import/prefer-default-export
export function useGoogleAuth(context) {
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
