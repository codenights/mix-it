<template>
  <div id="app">
    <nav class="nav">Mix it</nav>
    <main-layout></main-layout>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import MainLayout from './views/MainLayout/MainLayout.vue'

const App = defineComponent({
  name: 'App',
  components: { MainLayout }
})

export default App
</script>

<style lang="scss">
@import '../../core/src/styles/main';

body {
  background-color: $color-primary;
}

.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $navbar-height;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
