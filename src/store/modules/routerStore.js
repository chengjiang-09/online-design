import Vue from 'vue'

const routerStore = {
  namespaced: true,
  state: {
    routes: [], //动态路由列表
    routesGroup: [],
    targetRouteId: '', //用来保证页面刷新，侧边栏的样式正常
  },
  mutations: {
    SET_ROUTES(state, { index }) {
      if (state.routesGroup[index]) {
        state.routes = state.routesGroup[index].routes
        state.routes.forEach((route) => {
          route.action = false
        })
        state.routes[0].action = true
      } else {
        state.routes = []
      }
    },
    SET_ROUTES_GROUP(state, value) {
      state.routesGroup = value
    },
    SET_TARGET_ROUTE_ID(state, value) {
      state.targetRouteId = value
      Vue.ls.set('SET_TARGET_ROUTE_ID', value)
    },
    UPDATE_ROUTES_GROUP(state, value) {
      state.routesGroup = value
    },
    UPDATE_ROUTES(state, value) {
      state.routes = value
    },
  },
  actions: {
    set_routes: ({ commit, state }, { id }) => {
      const index = state.routesGroup.findIndex((data) => data.id === id)
      commit('SET_ROUTES', { index })
    },
    set_routesGroupAndRoutes: ({ commit }, payload) => {
      commit('SET_ROUTES_GROUP', payload)
      commit('SET_ROUTES', { index: 0 })
    },
    update_routesGroup_action: ({ commit, state }, { id }) => {
      const newRoutesGroup = state.routesGroup.map((data) => {
        if (data.id === id) {
          data.action = true
        } else {
          data.action = false
        }
        return data
      })
      commit('SET_TARGET_ROUTE_ID', id)
      commit('UPDATE_ROUTES_GROUP', newRoutesGroup)
    },
    update_routes: ({ commit, state }, { name }) => {
      const newRoutes = state.routes.map((data) => {
        if (data.name === name) {
          data.action = true
        } else {
          data.action = false
        }
        return data
      })
      commit('UPDATE_ROUTES', newRoutes)
    },
  },
}

export default routerStore
