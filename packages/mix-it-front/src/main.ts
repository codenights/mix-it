import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCompositionApi from '@vue/composition-api'
import VueYoutubeEmbed from 'vue-youtube-embed'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueCompositionApi)
Vue.use(VueYoutubeEmbed)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
