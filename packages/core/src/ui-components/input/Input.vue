<template>
  <input type="text" class="input" placeholder="Mon gros input" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import useInput from './input.feature'

export default defineComponent({
  name: 'MiInput',
  setup() {
    const input = useInput()
    return input
  }
})
</script>

<style lang="scss" scoped>
.input {
}
</style>
