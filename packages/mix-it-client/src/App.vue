<template>
  <div id="app">
    <nav class="nav">
      <div class="nav__content">
        Mix it
      </div>
    </nav>
    <div class="main-content">
      <main-layout></main-layout>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { provideToast } from 'vue-toastification/composition'
import 'vue-toastification/dist/index.css'

import MainLayout from './views/MainLayout/MainLayout.vue'

const App = defineComponent({
  name: 'App',
  components: { MainLayout },
  setup() {
    provideToast({ timeout: 3000 })
  }
})

export default App
</script>

<style lang="scss">
@import '~mix-it-core/src/styles/main';

body {
  background-color: $color-primary;
}

.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $navbar-height;

  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  .nav__content {
    width: 80%;
    margin: auto;
  }
}

.main-content {
  position: relative;
  height: calc(100vh - #{$navbar-height});
  width: 80%;
  margin: $navbar-height auto;
}
</style>
