<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn" data-test="btn-sign-in">google sign-in</button>
    <button type="button" @click="signOut" data-test="btn-sign-out">google sign-out</button>
    <template v-if="isSignIn">
      <button type="button" @click="createParty" data-test="btn-create-party">Créer un salon</button>
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useGoogleAuth from '@/feature/google-auth.feature'
import useHome from './home.feature'

const Home = defineComponent({
  name: 'Home',
  setup(props, context) {
    const { isSignIn, signIn, signOut } = useGoogleAuth()
    const { createParty, redirectToRoom, redirectToHost } = useHome(context)
    return {
      createParty,
      isSignIn,
      signIn,
      signOut,
      redirectToRoom,
      redirectToHost
    }
  }
})
export default Home
</script>
