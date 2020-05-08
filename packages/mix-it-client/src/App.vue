<template>
  <div id="app">
    <nav class="nav">
      Mix-it Client Lerna
    </nav>
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
body {
  margin: 0;
}
.nav {
  height: 4rem;
  padding: 1rem;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(14.46deg, #b3e5fc 22.91%, #bbdefb 65.88%, #81d4fa 100.49%);
}
* {
  box-sizing: border-box;
}
</style>
