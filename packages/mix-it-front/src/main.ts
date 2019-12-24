import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueYoutubeEmbed from 'vue-youtube-embed'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

const SocketInstance = socketio.connect('http://localhost:3000')

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}))

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueYoutubeEmbed)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
