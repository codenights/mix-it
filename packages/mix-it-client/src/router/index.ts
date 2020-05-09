import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@client/views/Home/Home.vue'
import MainLayout from '@client/views/MainLayout/MainLayout.vue'
import Room from '@client/views/Room/Room.vue'

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
        path: 'room/:roomId',
        name: 'room',
        component: Room
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
