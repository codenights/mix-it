import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueYoutubeEmbed from 'vue-youtube-embed'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueYoutubeEmbed)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
