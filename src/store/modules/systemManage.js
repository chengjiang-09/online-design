import { getSystemUsers } from '@/apis/systemApi'

const systemManage = {
  namespaced: 'systemManage',
  state: {
    users: {
      data: {},
      currentPage: 0,
      total: 0,
      totalPage: 0,
      limit: 10,
    },
    userList: [],
  },
  mutations: {
    SET_USERS(state, { data, page }) {
      if (!state.users) {
        state.users = data
      } else {
        state.users.data[page] = data.data
        state.users.currentPage = data.currentPage
        state.users.total = data.total
        state.users.totalPage = data.totalPage
        state.users.limit = data.limit
      }
    },
    SET_USER_LIST(state, value) {
      state.userList = value
    },
    DELETE_USERS(state, { page }) {
      state.users.data[page] = []
    },
  },
  actions: {
    set_users({ commit, state }, { limit, page }) {
      return new Promise((resolve) => {
        if (
          !state.users ||
          (state.users && !state.users.data[page]) ||
          (state.users && state.users.data[page].length < limit)
        ) {
          getSystemUsers({
            limit,
            page,
          }).then(({ data, code }) => {
            if (code == 1) {
              commit('SET_USERS', {
                data,
                page,
              })
              commit('SET_USER_LIST', data.data)
              resolve(data)
            }
          })
        } else {
          commit('SET_USER_LIST', state.users.data[page])
        }
      })
    },
    delete_users({ commit }, { page }) {
      commit('DELETE_USERS', { page })
    },
  },
}

export default systemManage
