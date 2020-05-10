import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@front/views/Home/Home.vue'
import MainLayout from '@front/views/MainLayout/MainLayout.vue'
import Host from '@front/views/Host/Host.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'host/:partyId',
        name: 'host',
        component: Host
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
