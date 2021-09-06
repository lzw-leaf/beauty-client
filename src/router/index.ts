import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/customer-manage',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/home/statistics.vue')
      },
      {
        path: 'customer-manage',
        name: 'customerManage',
        component: () => import('@/views/home/customerManage/index.vue')
      },
      {
        path: 'cost-manage',
        name: 'costManage',
        component: () => import('@/views/home/costManage.vue')
      }
    ]
  },
  {
    path: '/create-customer',
    name: 'createCustomer',
    component: () => import('@/views/home/customerManage/create.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('ht_id')
  console.log('token', token, to.name)
  to.name === 'login' || token ? next() : next({name: 'login'})
})

export default router
