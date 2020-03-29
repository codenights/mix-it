<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn">google signin</button>
    <button type="button" @click="signOut">google signout</button>
    <template v-if="isSignIn">
      <button type="button" @click="createParty">Créer un salon</button>
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
    const { isSignIn, signIn, signOut } = useGoogleAuth(context)
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
