<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn">google signin</button>
    <button type="button" @click="signOut">google signout</button>
    <!--    <template v-if="isSignIn">-->
    <!--    </template>-->
    <section class="join-room">
      <input id="room-input" type="text" v-model="room" @keydown.enter="redirectToRoom" data-test="join-room" />
      <label v-if="error" for="room-input" class="room-label">{{ error }}</label>
    </section>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { useGoogleAuth } from '@/feature/google-auth.feature'
import { partyService } from '@/services'
import useHome from './home.feature'

const Home = createComponent({
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
