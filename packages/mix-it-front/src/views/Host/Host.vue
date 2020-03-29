<template>
  <div class="room__container">
    <div class="players__container" data-test="players-container">
      <div class="player">
        <youtube
          :videoId="firstVideoId"
          @ready="onReady1"
          @playing="onPlay1"
          @paused="onPause1"
          @ended="onEnded1"
          ref="player1"
        ></youtube>
      </div>
      {{ firstVideoId }} {{ secondVideoId }}
      <div class="player">
        <youtube
          :videoId="secondVideoId"
          @ready="onReady2"
          @playing="onPlay2"
          @paused="onPause2"
          @ended="onEnded2"
          ref="player2"
        ></youtube>
      </div>
    </div>
    <div class="playlist__container" data-test="playlist-container">
      <strong class="container__title">File d'attente</strong>
      <ul>
        <li v-for="song in party.playlist" :key="song">{{ song }}</li>
      </ul>
    </div>
    <div class="users__container" data-test="users-container">
      <div class="users__list__container">
        <div class="container__title">
          <strong>Utilisateurs</strong>
        </div>
        <ul>
          <li>
            <span class="users__list__img"></span>
            <span>Artur Carme</span>
          </li>
          <li>
            <span class="users__list__img"></span>
            <span>Lorem Ipsum</span>
          </li>
          <li>
            <span class="users__list__img"></span>
            <span>Èric Roc</span>
          </li>
          <li>
            <span class="users__list__img"></span>
            <span>Maria Marcel</span>
          </li>
          <li>
            <span class="users__list__img"></span>
            <span>Diana Ramon</span>
          </li>
        </ul>
      </div>
      <div class="qr-code__container" data-test="qr-code-container">
        <span>{{ party.id }}</span>
        <div class="qr-code__content">
          <qrcode-vue :value="generateQrCodeValue(party.id)" :size="qrCodeSize" level="H"></qrcode-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, watch } from '@vue/composition-api'
import QrcodeVue from 'qrcode.vue'
import usePlayerFeature from '@/feature/player.feature'
import useQrCodeFeature from '@/feature/qr-code.feature'
import useHost from './host.feature'

const Host = defineComponent({
  name: 'Host',
  components: {
    QrcodeVue
  },
  setup(props, context) {
    const { party, fetchParty, joinRoomAsHost, leave, onPlaylist } = useHost(context)

    const { qrCodeSize, generateQrCodeValue } = useQrCodeFeature()

    const {
      player: player1,
      videoId: firstVideoId,
      linkPlayer: linkPlayer1,
      onReady: onReady1,
      onPlay: onPlay1,
      onPause: onPause1,
      onEnded: onEnded1
    } = usePlayerFeature(context, party.playlist)
    const {
      player: player2,
      videoId: secondVideoId,
      linkPlayer: linkPlayer2,
      onReady: onReady2,
      onPlay: onPlay2,
      onPause: onPause2,
      onEnded: onEnded2
    } = usePlayerFeature(context, party.playlist)

    watch(() => {
      if (party && party.playlist && party.playlist.length) {
        const { playlist } = party
        const [first, second] = playlist
        firstVideoId.value = first
        secondVideoId.value = second
        setTimeout(() => {
          if (player1.value.player.getPlayerState() !== 1 && player2.value.player.getPlayerState() !== 1) {
            player1.value.player.playVideo()
          }
        }, 2000)
      }
    })

    onMounted(async () => {
      // TODO: use props as an alternative
      await joinRoomAsHost(player1, player2, firstVideoId, secondVideoId)
      await fetchParty()
      onPlaylist()

      setTimeout(() => {
        linkPlayer1(player2.value)
        linkPlayer2(player1.value)
        if (player1.value.player.getPlayerState() !== 3 && player2.value.player.getPlayerState() !== 3) {
          player1.value.player.playVideo()
        }
      }, 2000)
    })

    onUnmounted(async () => {
      await leave()
    })

    return {
      party,
      player1,
      player2,
      firstVideoId,
      secondVideoId,
      onPlay1,
      onPlay2,
      onPause1,
      onPause2,
      onReady1,
      onReady2,
      onEnded1,
      onEnded2,
      qrCodeSize,
      generateQrCodeValue
    }
  }
})
export default Host
</script>

<style lang="scss" scoped>
.room__container {
  display: flex;
  height: 100%;
}
.container__title {
  width: 100%;
  text-align: center;
}
.players__container {
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
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.playlist__container {
  height: 100%;
  width: 20%;
}
.users__container {
  height: 100%;
  width: 20%;
  display: flex;
  flex-direction: column;
  .users__list__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    ul > li {
      display: flex;
      align-items: center;
    }
    .users__list__img {
      width: 32px;
      height: 32px;
      background-image: url('../../assets/user.jpg');
      background-size: contain;
      display: block;
      margin-right: 8px !important;
      border-radius: 50%;
      border: 2px solid white;
    }
  }
  .qr-code__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 16px;
  }
  .qr-code__content {
    border: 4px solid white;

    & > div {
      height: 150px;
    }
  }
}
.border-right-8 {
  border-right: 8px !important;
}
</style>
