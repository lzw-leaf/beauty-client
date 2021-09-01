import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const children = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
]

const routes: Array<RouteConfig> = [
  {path: '/', redirect: 'home', children},
  {path: '/login', component: () => import('@/views/login/index.vue')}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
