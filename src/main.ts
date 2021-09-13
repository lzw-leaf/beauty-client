import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/assign'
import {setTitle} from './utils'
import '@/style/index.scss'
import vuetify from './plugins/vuetify'

import {callApi} from '@/helper/callApi'

import VuetifyConfirm from 'vuetify-confirm'
Vue.use(VuetifyConfirm, {vuetify})
import {VSnackbar, VBtn, VIcon} from 'vuetify/lib'
Vue.component('v-snackbar', VSnackbar)
Vue.component('v-btn', VBtn)
Vue.component('v-icon', VIcon)
import message from 'vuetify-message-snackbar'
Vue.use(message)
Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
Vue.prototype.$setTitle = setTitle
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
