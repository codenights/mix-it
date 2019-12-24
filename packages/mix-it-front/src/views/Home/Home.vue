<template>
  <div>
    hello
  </div>
</template>

<script>
// @ is an alias to /src

import { createComponent } from '@vue/composition-api'

const Home = createComponent({
  name: 'Home',
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
      this.$socket.emit('pingServer', 'PING!')
    }
  }
})
export default Home
</script>
