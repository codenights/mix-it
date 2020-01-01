<template>
  <div class="room__container">
    <div>
      <h1>{{ roomId }}</h1>
      <form @submit.prevent="addSongToPlaylist(songId)">
        <label for="song-id">{{ songId }}</label>
        <input type="text" id="song-id" v-model="songId">
        <button type="submit"> Envoyer</button>
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
    const { roomId, addSongToPlaylist } = useRoom(context)
    return {
      roomId,
      songId,
      addSongToPlaylist
    }
  },
  sockets: {
    connect() {
      console.log('Client connected')
    }
  }
})
export default Room
</script>

<style lang="scss" scoped>
.room__container {
  background-color: yellow;
  display: flex;
  height: 100%;
}
.container__title {
  width: 100%;
  text-align: center;
}
.players__container {
  background-color: red;
  width: 60%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  .player {
    width: 100%;
    height: 50%;
    background-color: purple;
    margin: 5px 0;
  }
}
.playlist__container {
  background-color: blue;
  height: 100%;
  width: 20%;
}
.users__container {
  background-color: green;
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  .users__list__container {
    display: flex;
    flex: 1;
    width: 100%;
    background-color: antiquewhite;
  }
  .qr-code__container {
    display: flex;
    flex-direction: column;

  }
}
</style>
