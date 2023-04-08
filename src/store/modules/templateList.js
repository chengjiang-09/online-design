import Vue from 'vue'
import { getChartsList } from '@/apis/chartsApi'
import { TEMPLATE_LIST_ALL } from '@/utils/expirationTime'

const templateList = {
  namespaced: true,
  state: {
    templateList: [],
    currentPage: 1,
    total: 0,
    totalPage: 0,
  },
  mutations: {
    SET_TEMPLATE_LIST(state, templateList) {
      state.templateList = templateList
    },
    SET_CURRENT_PAGE(state, currentPage) {
      state.currentPage = currentPage
    },
    SET_TOTAL(state, total) {
      state.total = total
    },
    SET_TOTAL_PAGE(state, totalPage) {
      state.totalPage = totalPage
    },
  },
  actions: {
    async set_tmplateListALL({ commit }, { limit, page }) {
      const templateListAll = Vue.ls.get('TEMPLATE_LIST_ALL', {
        templateList: {},
        currentPage: 1,
        total: 0,
        totalPage: 0,
      })

      if (templateListAll.templateList[page]) {
        commit('SET_TEMPLATE_LIST', templateListAll.templateList[page])
      } else {
        const { data, msg, code } = await getChartsList(limit, page)

        if (code) {
          commit('SET_TEMPLATE_LIST', data.data)
          commit('SET_CURRENT_PAGE', data.currentPage)
          commit('SET_TOTAL', data.total)
          commit('SET_TOTAL_PAGE', data.totalPage)

          templateListAll.templateList[page] = data.data
          templateListAll.currentPage = data.currentPage
          templateListAll.total = data.total
          templateListAll.totalPage = data.totalPage

          Vue.ls.set('TEMPLATE_LIST_ALL', templateListAll, TEMPLATE_LIST_ALL)
        } else {
          Vue.$message({
            message: msg,
            type: 'warning',
          })
        }
      }
    },
  },
}

export default templateList
