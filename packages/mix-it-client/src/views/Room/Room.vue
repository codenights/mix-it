<template>
  <div class="room__container">
    <div>
      <h1>{{ roomId }}</h1>
      <form @submit.prevent="submitSong(songId)">
        <label for="song-id">{{ songId }}</label>
        <input type="text" id="song-id" v-model="songId" />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createComponent, ref } from '@vue/composition-api'
import useRoom from '@/views/Room/room.feature'

const Room = createComponent({
  name: 'Room',
  setup(props, context) {
    const songId = ref('')
    const { roomId, submitSong } = useRoom(context)

    return {
      roomId,
      songId,
      submitSong
    }
  },
  sockets: {
    connect() {
      // eslint-disable-next-line
      console.log('Client connected')
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
