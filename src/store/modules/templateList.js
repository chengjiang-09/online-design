import Vue from 'vue'
import { Message } from 'element-ui'
import { getChartsList } from '@/apis/chartsApi'
import { TEMPLATE_LIST_ALL } from '@/utils/expirationTime'

const templateList = {
  namespaced: true,
  state: {
    templateList: [],
    currentPage: 1, //未启用
    total: 0,
    totalPage: 0, //未启用
    templateImgBaseUrl: '', //初始化时，保存画布列表模板封面基础路由
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
    SET_TEMPLATE_IMG_BASE_URL(state, url) {
      state.templateImgBaseUrl = url
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
      //这里是保证能够获取新数据
      if (
        templateListAll.templateList[page] &&
        templateListAll.templateList[page].length === 9
      ) {
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
          Message({
            message: msg,
            type: 'warning',
          })
        }
      }
    },
    set_templateImgBaseUrl({ commit }, url) {
      commit('SET_TEMPLATE_IMG_BASE_URL', url)
    },
  },
}

export default templateList
