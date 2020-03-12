import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCompositionApi from '@vue/composition-api'
import VueYoutubeEmbed from 'vue-youtube-embed'
import GAuth from 'vue-google-oauth2'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

const gauthOption = {
  clientId: '298958821124-bpn976c48gqth5prkho0jl8qtb7i88fa.apps.googleusercontent.com',
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
