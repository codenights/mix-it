import { SetupContext, ref, Ref } from '@vue/composition-api'

export default function useHome(context: SetupContext) {
  const room: Ref<string> = ref<string>('')

  function redirectToRoom() {
    context.root.$router.push(`room/${room.value}`)
  }
  function redirectToHost() {
    context.root.$router.push('host')
  }
  return { room, redirectToRoom, redirectToHost }
}
