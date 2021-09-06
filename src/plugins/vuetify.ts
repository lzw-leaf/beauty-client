import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import zhHans from 'vuetify/src/locale/zh-Hans'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: {zhHans},
    current: 'zhHans'
  },
  icons: {
    iconfont: 'md' // 默认值 - 仅用于展示目的
  }
})
