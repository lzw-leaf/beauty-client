import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
// import {baseStore} from '@/store'

export interface CallApiConfig {
  api: string
  param?: Record<string, any>
  config?: AxiosRequestConfig
  mock?: boolean
  async?: boolean
  readonly?: boolean
  errorCapture?: boolean // 是否自定义错误抓取
}

class CallApi {
  static PROGRAM_NAME = `beauty-client`
  private instance: AxiosInstance
  private apiConfig: CallApiConfig = {
    api: '',
    param: {}
  }

  constructor() {
    this.instance = this.createAxiosInstance()
    this.instance.interceptors.response.use(
      this.responseSuccess.bind(this),
      this.responseError.bind(this)
    )
  }

  //请求的基础请求域
  get baseUrl() {
    return `${location.origin}/api`
  }

  /**
   * 创建一个具有一定默认配置的axios实例
   */
  private createAxiosInstance() {
    return axios.create({
      timeout: 1000 * 15
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      // },
      //   transformRequest: (data: CallApiConfig) => {
      //     // todo 后续额外的转换参数可以在此处维护
      //     // if (!objectUtils.isVaildObject(data)) return data
      //     const {id} = baseStore //从vuex中取值
      //     const {param, readonly, async} = data
      //     const params = {id, ...param}
      //     const project = CallApi.PROGRAM_NAME
      //     return qs.stringify({
      //       apiparams: JSON.stringify({params, readonly, async, project})
      //     })
      //   }
    })
  }

  private async responseSuccess(res: AxiosResponse) {
    const {data, config} = res
    if (data.status !== 1) {
      console.warn(`调用接口失败，服务器处理错误 
      url: ${config.url}, msg: ${data.message}`)
      return this.apiConfig.errorCapture ? Promise.reject(data.message) : ''
    }
    return data.data
  }

  private responseError(error: any) {
    console.warn(`调用接口失败，服务器处理错误  error: ${error}`)
    if (this.apiConfig.errorCapture) return Promise.reject(error)
  }

  /**
   * 接口封装请求
   * @param apiConfig 实际的请求参数
   * @returns
   */
  async request<T extends any>(apiConfig: CallApiConfig) {
    Object.assign(this.apiConfig, apiConfig)
    const {api, config: reqConfig} = this.apiConfig
    const config: AxiosRequestConfig = {
      method: 'get',
      baseURL: this.baseUrl,
      ...reqConfig,
      ...{
        [['post', 'POST'].includes('' + reqConfig?.method) ? 'data' : 'params']:
          this.apiConfig.param
      }
    }

    console.log('请求参数', config)

    return this.instance(api, config) as Promise<T>
  }
}
const callApiInstance = new CallApi()
export const callApi = callApiInstance.request.bind(callApiInstance)
