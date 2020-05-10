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

import { partyService } from '@client/services'
import MiInput from '@core/ui-components/input/Input.vue'

import useHome from './home.feature'

const Home = defineComponent({
  name: 'Home',
  components: {
    MiInput
  },
  setup(props, context) {
    const { error, room, redirectToRoom } = useHome({ partyService, router: context.root.$router })
    return {
      error,
      room,
      redirectToRoom
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
