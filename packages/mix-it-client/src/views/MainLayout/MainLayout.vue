<template>
  <div>
    <div id="nav" data-test="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'

const MainLayout = createComponent({
  name: 'MainLayout'
})

export default MainLayout
</script>

<style lang="scss" scoped>
$navbar-height: 64px;

.main-content {
  position: relative;
  background: linear-gradient(14.46deg, #303757 22.91%, #7076b2 65.88%, #c692ca 100.49%);
  height: calc(100vh - #{$navbar-height});
  margin-top: $navbar-height;
  width: 100%;
}
#nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: $navbar-height;
  background-color: #42b983;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
