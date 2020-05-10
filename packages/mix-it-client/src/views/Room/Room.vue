<template>
  <div class="room__container">
    <div>
      <h1>{{ roomId }}</h1>
      <form @submit.prevent="submitSong(songId)">
        <label for="song-id">Id video: </label>
        <input type="text" id="song-id" v-model="songId" />
        <button type="submit">Envoyer</button>
        <button type="button" @click="songId = ''">Clear</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import useRoom from '@client/views/Room/room.feature'

const Room = defineComponent({
  name: 'Room',
  setup(props, context) {
    const songId = ref('')
    const { roomId, submitSong } = useRoom(context)

    return {
      roomId,
      songId,
      submitSong
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
</style>
