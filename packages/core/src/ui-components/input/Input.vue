<template>
  <label class="input-group">
    <input
      type="text"
      class="input"
      @keydown.enter="buttonClick"
      v-model="inputValue"
      :placeholder="placeholder"
      data-test="input"
      aria-label="mon gros label"
    />
    <button
      v-if="type"
      class="button"
      :class="'button__' + type"
      type="button"
      @click="buttonClick"
      data-test="btn-input"
    ></button>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from '@vue/composition-api'

export default defineComponent({
  name: 'MiInput',
  props: {
    type: {
      type: String,
      default: '',
      validator: (val: string) => !val || val === 'search' || val === 'add'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const inputValue = ref('')

    function buttonClick() {
      context.emit('submit', inputValue.value)
    }

    watch(
      () => props.value,
      () => {
        inputValue.value = props.value
      }
    )

    watchEffect(() => {
      // Putting this effect in useInput cause infinite loop o_O
      console.log('hello')
      context.emit('input', inputValue.value)
    })

    return {
      inputValue,
      buttonClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.input {
  background-color: $input-background;
  border: $input-border;
  padding-right: 2.25rem;
  padding-left: 0.75rem;
  height: 2.25rem;
  border-radius: 2rem;
  color: white;
  width: 100%;
  outline: none;
  transition: border-color 0.1s ease-out;
  font-size: 0.8rem;
  &:focus {
    border-color: white;
    &::placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: white;
  }
  & + .button {
    position: absolute;
    right: 0.25rem;
    background-color: $color-secondary;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    border: none;
    background-size: 1.1rem;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    color: white;
    &.button__search {
      background-image: url('../../../assets/search.svg');
    }
    &.button__add {
      background-image: url('../../../assets/add.svg');
    }
  }
}
</style>
