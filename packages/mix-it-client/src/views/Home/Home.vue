<template>
  <div>
    hello
    {{ isSignIn }}
    <button type="button" @click="signIn">google signin</button>
    <button type="button" @click="signOut">google signout</button>
<!--    <template v-if="isSignIn">-->
<!--    </template>-->
    <section class="join-room">
      <input type="text" v-model="room" @keydown.enter="redirectToRoom" data-test="join-room">
      {{ room }}
    </section>
  </div>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import { useGoogleAuth } from '@/feature/google-auth.feature'
import useHome from './home.feature'

const Home = createComponent({
  name: 'Home',
  setup(props, context) {
    return {
      ...useGoogleAuth(context),
      ...useHome(context)
    }
  }
})
export default Home
</script>
