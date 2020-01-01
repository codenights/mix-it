<template>
  <div class="room__container">
    <div class="players__container" data-test="players-container">
      <div class="player">
        <youtube :videoId="firstVideoId" @playing="playing"></youtube>
      </div>
      <div class="player">
        <youtube :videoId="secondVideoId"></youtube>
      </div>
    </div>
    <div class="playlist__container" data-test="playlist-container">
      <strong class="container__title">File d'attente</strong>
      <ul>
        <li v-for="song in room.playlist" :key="song">{{ song }}</li>
      </ul>
    </div>
    <div class="users__container" data-test="users-container">
      <div class="users__list__container">
        <strong class="container__title">Utilisateurs</strong>
      </div>
      <div class="qr-code__container" data-test="qr-code-container">
        <strong class="container__title">Host: {{ room.partyId }}</strong>
        <div class="qr-code__content">
          Experimentum vix ducunt ad albus historia. Experimentum vix ducunt ad albus historia. Experimentum vix ducunt
          ad albus historia. Experimentum vix ducunt ad albus historia. Experimentum vix ducunt ad albus historia.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createComponent, onMounted } from '@vue/composition-api'
import useHost from './host.feature'

const Host = createComponent({
  name: 'Host',
  setup(props, context) {
    const {
      room, firstVideoId, secondVideoId, createRoom, joinRoomAsHost
    } = useHost(context)
    onMounted(async () => {
      console.log('heelo')
      await createRoom()
      joinRoomAsHost()
    })
    return { room, firstVideoId, secondVideoId }
  },
  sockets: {
    connect() {
      console.log('connected')
    }
  },
  methods: {
    playing(event) {
      console.log(event)
    }
  }
})
export default Host
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
