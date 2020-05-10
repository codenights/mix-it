import { ref, SetupContext, watchEffect } from '@vue/composition-api'

export default function useInput(context: SetupContext) {
  const value = ref('')

  function buttonClick(event: Event) {
    event.preventDefault()
    context.emit('submit', value.value)
  }

  watchEffect(() => {
    context.emit('input', value.value)
  })

  return {
    value,
    buttonClick
  }
}
