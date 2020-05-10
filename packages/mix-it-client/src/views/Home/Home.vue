<template>
  <div>
    <section class="join-room">
      <mi-input
        v-model="room"
        type="search"
        placeholder="Saisir l'id de la room"
        data-test="join-room"
        @submit="redirectToRoom"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useGoogleAuth } from '@client/feature/google-auth.feature'
import { partyService } from '@client/services'
import MiInput from '@core/ui-components/input/Input.vue'

import useHome from './home.feature'

const Home = defineComponent({
  name: 'Home',
  components: {
    MiInput
  },
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
