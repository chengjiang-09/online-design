const routerStore = {
  namespaced: true,
  state: {
    routes: [], //动态路由列表
  },
  mutations: {
    SET_ROUTES(state, value) {
      state.routes = value
    },
  },
  actions: {
    set_routes: ({ commit }, payload) => {
      commit('SET_ROUTES', payload)
    },
  },
}

export default routerStore
