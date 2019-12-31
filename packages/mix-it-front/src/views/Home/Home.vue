<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn">google signin</button>
    <button type="button" @click="signOut">google signout</button>
    <template v-if="isSignIn">
      <button type="button" @click="redirectToHost">Créer un salon</button>
      <button type="button" @click="redirectToRoom">Rejoindre un salon</button>
    </template>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import { useGoogleAuth } from '@/feature/google-auth.feature'
import { useHome } from './home.feature'

const Home = createComponent({
  name: 'Home',
  setup(props, context) {
    const { isSignIn, signIn, signOut } = useGoogleAuth(context)
    const { redirectToRoom, redirectToHost } = useHome(context)
    return {
      isSignIn,
      signIn,
      signOut,
      redirectToRoom,
      redirectToHost
    }
  }
  // sockets: {
  //   connect() {
  //     console.log('connected')
  //   },
  //   request(data) {
  //     console.log(data)
  //     this.$socket.emit('pingServer', 'PING!')
  //   },
  //   pongClient(data) {
  //     console.log('Server sent : ', data)
  //   }
  // }
})
export default Home
</script>
