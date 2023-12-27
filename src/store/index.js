

import { createApp } from 'vue'
const Vue = createApp({
  // 这里是你的应用配置
})

import Vuex from 'vuex'

import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
// import modules from './modules/module'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
//   modules
})
