<template>
  <div class="main-content">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

const MainLayout = defineComponent({
  name: 'MainLayout'
})

export default MainLayout
</script>

<style lang="scss" scoped>
.main-content {
  position: relative;
  height: calc(100vh - 4rem);
  width: 100%;
}
</style>
