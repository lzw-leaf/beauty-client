import {Module, Mutation, VuexModule} from 'vuex-module-decorators'
import store from '@/store/assign'

export interface BaseState {
  id: string | number
  username: string
  avatar: string
}

@Module({dynamic: true, store, name: 'base', namespaced: true})
export class BaseStore extends VuexModule implements BaseState {
  id = 0
  username = ''
  avatar = ''

  @Mutation // 设置基础信息
  setBaseInfo(baseInfo: Partial<BaseState>) {
    Object.assign(this, baseInfo)
  }
}
