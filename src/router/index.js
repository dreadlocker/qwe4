import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/components/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: `${process.env.BASE_URL}tehnika`,
  routes
})

export default router
