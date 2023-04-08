import {
  getTemplateClassification,
  getCanvasHeaderMenu,
} from '@/apis/chartsApi'
import {
  ALL_CHARTS_EX_TIME,
  CANVAS_HEADER_MENU_EX_TIME,
} from '@/utils/expirationTime'
import Vue from 'vue'
import { findChildChart } from '@/utils/utils'

const charts = {
  namespaced: true,
  state: {
    allCharts: [], //左侧边栏所有组件模板列表的存储
    canvasHeaderMenu: [], //头部导航栏选项列表
    chartsTypeList: [], //需要动态获取当前组件库的类型列表，用以保证拖拽事件能够动态获取不同类型的数据
    layoutTypeList: [], //用以在designPanel中动态限制组件插入类型
    //工作中的渲染树
    canvasData: {},
    //右侧边栏依赖的数据列表
    configureList: {},
    //上方渲染树根节点的详细配置列表
    //早期设计的遗留问题，原本想要将渲染树和渲染树对应的配置树分开存储，使得渲染树只专注于样式的保存，后来因架构设计的修改，方案大范围更改，但是一部分核心代码已使用该方案，所以此数据给予保留。
    canvasConfigureList: {},
  },
  mutations: {
    SET_ALL_CHARTS(state, value) {
      state.allCharts = value
      state.chartsTypeList = value.map((obj) => {
        if (obj.type === 'layout') {
          state.layoutTypeList = obj.items.map((chart) => {
            return chart.type
          })
        }
        return obj.type
      })
      Vue.ls.set('ALL_CHARTS', state.allCharts, ALL_CHARTS_EX_TIME)
    },
    SET_CANVAS_HEADER_MENU(state, value) {
      state.canvasHeaderMenu = value
      Vue.ls.set(
        'CANVAS_HEADER_MENU',
        state.canvasHeaderMenu,
        CANVAS_HEADER_MENU_EX_TIME,
      )
    },
    UPDATE_CANVAS_HEADER_MENU(state, { type }) {
      state.canvasHeaderMenu.forEach((obj) => {
        obj.action = false
        if (obj.type === type) {
          obj.action = true
        }
      })
      Vue.ls.set(
        'CANVAS_HEADER_MENU',
        state.canvasHeaderMenu,
        CANVAS_HEADER_MENU_EX_TIME,
      )
    },
    SET_CANVAS_DATA(state, value) {
      state.canvasData = value
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    SET_CONFIGURE_LIST(state, value) {
      state.configureList = value
    },
    SET_CANVAS_CONFIGURE_LIST(state, value) {
      if (value && value.length !== 0) {
        state.configureList = {
          id: value[0].id, //id的作用在于修改配置信息时，通过递归动态找到对应id的节点
          default: value,
        }
        state.canvasConfigureList = {
          id: value[0].id,
          default: value,
        }
      } else {
        state.configureList = {}
        state.canvasConfigureList = {}
      }
    },
    //早期设计的遗留问题，原本想要将渲染树和渲染树对应的配置树分开存储，使得渲染树只专注于样式的保存，后来因架构设计的修改，方案大范围更改，但是一部分核心代码已使用该方案，所以此数据给予保留。
    //只用于修改画布的属性值
    UPDATE_CANVAS_DATA(state, { type, data }) {
      state.canvasData[data.key] = data.value

      let canvasConfigureListLength = state.canvasConfigureList.default.length
      for (let i = 0; i < canvasConfigureListLength; i++) {
        if (state.canvasConfigureList.default[i].type === type) {
          let configureLength =
            state.canvasConfigureList.default[i].configure.length
          for (let j = 0; j < configureLength; j++) {
            if (
              state.canvasConfigureList.default[i].configure[j].type ===
              data.key
            ) {
              state.canvasConfigureList.default[i].configure[j].value =
                data.value
              break
            }
          }
          break
        }
      }
      state.configureList = state.canvasConfigureList

      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    //早期设计的遗留问题，原本想要将渲染树和渲染树对应的配置树分开存储，使得渲染树只专注于样式的保存，后来因架构设计的修改，方案大范围更改，但是一部分核心代码已使用该方案，所以此数据给予保留。
    //只用于向画布添加亲代子节点
    ADD_CANVAS_DATA_CHILD(state, value) {
      if (!state.canvasData.children) {
        state.canvasData.children = []
      }

      if (Array.isArray(value) && value.length === 0) {
        state.canvasData.children = []
        state.configureList = state.canvasConfigureList
      } else {
        state.canvasData.children.push(value)
        state.configureList = {
          id: value.id, //用于找到对应组件，修改样式
          fatherId: value.fatherId, //用于找到父组件，插入新的子组件
          default: value.default, //所有的可修改的样式数组
        }
      }
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    //找到并修改对应节点对应的某个属性值
    UPDATE_CANVAS_DATA_CHILD(state, { id, type, data, fatherId }) {
      let targetChild = findChildChart(state.canvasData.children, id)
      if (fatherId === 'canvas') {
        if (
          state.canvasData.children.length !== 0 &&
          state.canvasData.children[0].type === 'title' &&
          state.canvasData.children[0] === targetChild &&
          data.key === 'height'
        ) {
          if (data.value > 40) {
            data.value = 40
            alert('title高度超过40%，已设置为默认最大值')
          }
          let newHeight = 100 - data.value
          if (state.canvasData.children[1]) {
            state.canvasData.children[1].newHeight = newHeight
          }
        }
      } else {
        let fatherNode = findChildChart(state.canvasData.children, fatherId)
        if (
          fatherNode &&
          fatherNode.children.length !== 0 &&
          fatherNode.children[0].type === 'title' &&
          fatherNode.children[0] === targetChild &&
          data.key === 'height'
        ) {
          if (data.value > 40) {
            data.value = 40
            alert('title高度超过40%，已设置为默认最大值')
          }
          let newHeight = 100 - data.value
          if (fatherNode.children[1]) {
            fatherNode.children[1].newHeight = newHeight
          }
        }
      }

      let defaultLength = targetChild.default.length
      for (let i = 0; i < defaultLength; i++) {
        if (targetChild.default[i].type === type) {
          let configureLength = targetChild.default[i].configure.length
          for (let j = 0; j < configureLength; j++) {
            if (targetChild.default[i].configure[j].type === data.key) {
              targetChild.default[i].configure[j].value = data.value
              break
            }
          }
          break
        }
      }
    },
    //通过fatherId动态插入子节点
    ADD_CHART(state, value) {
      let targetChild = findChildChart(
        state.canvasData.children,
        value.fatherId,
      )
      //由于所有的子节点都是通过v-for进行渲染，虽然只有title组件只能先插入，但此处还是为了保证title在布局组件中优先渲染
      if (value.type === 'title') {
        targetChild.children.unshift(value)
      } else {
        targetChild.children.push(value)
      }
      state.configureList = {
        id: value.id,
        default: value.default,
      }
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    SET_LAYOUT_CHILD(state, value) {
      let targetChild = findChildChart(
        state.canvasData.children,
        value[0].fatherId,
      )
      targetChild.children = value
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
  },
  actions: {
    async set_allCharts({ commit }) {
      let allCharts = Vue.ls.get('ALL_CHARTS', null)
      if (!allCharts) {
        const { data, msg, code } = await getTemplateClassification()

        if (code === 1) {
          return commit('SET_ALL_CHARTS', data)
        } else {
          Vue.$message({
            message: msg,
            type: 'warning',
          })
        }
      }
      commit('SET_ALL_CHARTS', allCharts)
    },
    async set_canvasHeaderMenu({ commit }) {
      let canvasHeaderMenu = Vue.ls.get('Canvas_Header_Menu', [])
      if (canvasHeaderMenu.length === 0) {
        const { code, msg, data } = await getCanvasHeaderMenu()

        if (code === 0) {
          canvasHeaderMenu = data.map((obj) => {
            obj.action = false
            return obj
          })
          canvasHeaderMenu[0].action = true
          return commit('SET_CANVAS_HEADER_MENU', canvasHeaderMenu)
        } else {
          Vue.$message({
            message: msg,
            type: 'warning',
          })
        }
      }
      commit('SET_CANVAS_HEADER_MENU', canvasHeaderMenu)
    },
    update_canvasHeaderMenu({ commit }, payload) {
      commit('UPDATE_CANVAS_HEADER_MENU', payload)
    },
    set_canvasData({ commit }, payload) {
      commit('SET_CANVAS_DATA', payload)
    },
    set_configureList({ commit }, payload) {
      commit('SET_CONFIGURE_LIST', payload)
    },
    set_canvasConfigureList({ commit }, payload) {
      commit('SET_CANVAS_CONFIGURE_LIST', payload)
    },
    modify_canvasData({ commit }, payload) {
      commit('UPDATE_CANVAS_DATA', payload)
    },
    add_canvasDataChild({ commit }, payload) {
      commit('ADD_CANVAS_DATA_CHILD', payload)
    },
    modify_canvasDataChild({ commit }, payload) {
      commit('UPDATE_CANVAS_DATA_CHILD', payload)
    },
    add_chart({ commit }, payload) {
      commit('ADD_CHART', payload)
    },
    set_layoutChild({ commit }, payload) {
      commit('SET_LAYOUT_CHILD', payload)
    },
  },
}

export default charts
