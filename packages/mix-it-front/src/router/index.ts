import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import MainLayout from '@/views/MainLayout/MainLayout.vue'
import Room from '@/views/Room/Room.vue'
import Host from '@/views/Host/Host.vue'

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
