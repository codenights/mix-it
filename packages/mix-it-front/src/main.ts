import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCompositionApi from '@vue/composition-api'
import VueYoutubeEmbed from 'vue-youtube-embed'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
import GAuth from 'vue-google-oauth2'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

const SocketInstance = socketio.connect('http://localhost:3000/party', {
  query: {
    clientType: 'host',
    partyId: 'uuid'
  }
})

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance
}))
const gauthOption = {
  clientId: '298958821124-70r9qplggm5je4d3jhqt9n7j927v5n65.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.config.productionTip = false

Vue.use(GAuth, gauthOption)
Vue.use(VueAxios, axios)
Vue.use(VueCompositionApi)
Vue.use(VueYoutubeEmbed)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
