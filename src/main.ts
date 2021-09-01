import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {setTitle} from './utils'
// 全局样式文件
import '@/style/index.scss'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
Vue.prototype.$setTitle = setTitle
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
