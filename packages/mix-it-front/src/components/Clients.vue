<template>
  <div class="room__container">
    <div class="playlist__container" data-test="playlist-container">
      <strong class="container__title">File d'attente</strong>
      <ul class="song-list">
        <li v-for="song in party.playlist" :key="song" class="song-item">
          <span class="song-picture"></span>
          <span class="song-title">{{ song }}</span>
        </li>
      </ul>
    </div>
    <div class="players__container" data-test="players-container">
      <div class="player">
        <youtube
          id="player1"
          :videoId="firstVideoId"
          @ready="onReady"
          @playing="onPlay1"
          @paused="onPause1"
          @ended="onEnded1"
          ref="player1"
        ></youtube>
      </div>
      <div class="player">
        <youtube
          id="player2"
          :videoId="secondVideoId"
          @playing="onPlay2"
          @paused="onPause2"
          @ended="onEnded2"
          ref="player2"
        ></youtube>
      </div>
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

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Clients'
})
</script>
