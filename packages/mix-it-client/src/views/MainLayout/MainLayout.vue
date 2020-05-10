<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

const MainLayout = defineComponent({
  name: 'MainLayout'
})

export default MainLayout
</script>
