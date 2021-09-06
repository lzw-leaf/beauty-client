import {callApi} from '@/helper/callApi'
declare module 'vue/types/vue' {
  interface Vue {
    $callApi: typeof callApi
  }
}
