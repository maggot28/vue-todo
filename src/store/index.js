import Vue from 'vue'
import Vuex from 'vuex'

import sync from './modules/sync'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sync,
    auth
  },
  strict: true,
})
