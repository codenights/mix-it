export default function useHome(context) {
  function redirectToRoom() {
    context.root.$router.push('room/a')
  }
  function redirectToHost() {
    context.root.$router.push('host')
  }
  return { redirectToRoom, redirectToHost }
}
