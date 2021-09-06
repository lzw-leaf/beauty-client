import Vue from 'vue'
import Vuex from 'vuex'

import {BaseState} from './modules/BaseStore'

Vue.use(Vuex)

export interface RootState {
  base: BaseState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({})
