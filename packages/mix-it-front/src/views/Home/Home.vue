<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn"> google signin </button>
    <button type="button" @click="signOut"> google signout </button>
  </div>
</template>

<script>
// @ is an alias to /src

import { createComponent } from '@vue/composition-api'
import { useGoogleAuth } from '@/feature/google-auth.feature'

const Home = createComponent({
  name: 'Home',
  setup(props, context) {
    const { isSignIn, signIn, signOut } = useGoogleAuth(context)
    return {
      isSignIn, signIn, signOut
    }
  },
  sockets: {
    connect() {
      console.log('connected')
    },
    request(data) {
      console.log(data)
      this.$socket.emit('pingServer', 'PING!')
    },
    pongClient(data) {
      console.log('Server sent : ', data)
    }
  }
})
export default Home
</script>
