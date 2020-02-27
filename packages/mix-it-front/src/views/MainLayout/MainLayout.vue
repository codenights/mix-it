<template>
  <div class="main-content">
    <router-view></router-view>
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
  .main-content {
    position: relative;
    background: linear-gradient(14.46deg, #303757 22.91%, #7076B2 65.88%, #C692CA 100.49%);
    height: 100vh;
    width: 100%;
  }
</style>
