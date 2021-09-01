import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {setTitle} from './utils'
// 全局样式文件
import '@/style/index.scss'
Vue.config.productionTip = false
Vue.prototype.$setTitle = setTitle
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
