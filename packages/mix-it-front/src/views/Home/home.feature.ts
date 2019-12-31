export function useHome(context) {
  function redirectToRoom() {
    context.root.$router.push('room')
  }
  function redirectToHost() {
    context.root.$router.push('host')
  }
  return { redirectToRoom, redirectToHost }
}
