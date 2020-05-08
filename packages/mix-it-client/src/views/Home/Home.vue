<template>
  <div>
    <section class="join-room">
      <mi-input />
      <input id="room-input" type="text" v-model="room" @keydown.enter="redirectToRoom" data-test="join-room" />
      <label v-if="error" for="room-input" class="room-label">{{ error }}</label>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useGoogleAuth } from '@/feature/google-auth.feature'
import { partyService } from '@/services'
import useHome from './home.feature'

const Home = defineComponent({
  name: 'Home',
  setup(props, context) {
    const { isSignIn, signIn, signOut } = useGoogleAuth(context)
    const { error, room, redirectToRoom } = useHome({ partyService, router: context.root.$router })
    return {
      error,
      isSignIn,
      room,
      redirectToRoom,
      signIn,
      signOut
    }
  }
})
export default Home
</script>

<style scoped lang="scss">
.room-label {
  font-size: 14px;
  color: indianred;
}
</style>
