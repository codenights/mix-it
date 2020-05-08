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
@import '../../../../core/src/styles/variables';

.main-content {
  position: relative;
  height: calc(100vh - #{$navbar-height});
  margin-top: $navbar-height;
  width: 100%;
}
</style>
