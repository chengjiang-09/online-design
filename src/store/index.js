import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import charts from './modules/charts'
import other from './modules/other'
import routerStore from './modules/routerStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { app, charts, routerStore, other },
})
