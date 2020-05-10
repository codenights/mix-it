<template>
  <div>
    <h1>{{ roomId }}</h1>
    <form @submit.prevent="submitSong(songId)" class="join-room">
      <mi-input
        v-model="songId"
        type="add"
        placeholder="Ajouter une musique"
        data-test="join-room"
        class="input__join-room"
        @submit="submitSong(songId)"
      />
      <button type="button" @click="clearValue()">Clear</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import useRoom from '@client/views/Room/room.feature'
import MiInput from '@core/ui-components/input/Input.vue'

const Room = defineComponent({
  components: {
    MiInput
  },
  name: 'Room',
  setup(props, context) {
    const songId = ref('')
    const { roomId, submitSong } = useRoom(context)

    function clearValue() {
      console.log('helo')
      songId.value = ''
      console.log('songId')
    }

    return {
      roomId,
      songId,
      submitSong,
      clearValue
    }
  }
})
export default Room
</script>

<style lang="scss" scoped>
.room__container {
  background-color: #fafafa;
  display: flex;
  height: 100%;
}
.container__title {
  width: 100%;
  text-align: center;
}
.join-room {
  display: flex;
  width: 100%;
}
.input__join-room {
  width: 100%;
}
</style>
