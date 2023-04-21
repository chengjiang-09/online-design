import {
  getTemplateClassification,
  getCanvasHeaderMenu,
  saveChart,
  updateChart,
  getChartById,
} from '@/apis/chartsApi'
import {
  ALL_CHARTS_EX_TIME,
  CANVAS_HEADER_MENU_EX_TIME,
  COMPLETE_CHART_EX_TIME,
} from '@/utils/expirationTime'
import Vue from 'vue'
import { Message } from 'element-ui'
import {
  rulesToChart,
  basePermission,
  batchAddPermission,
  hasPermission,
} from '@/utils/authorityManage'
import goBackListType from '@/utils/goBackListType'

/**
 * 找到修改的child
 *
 * @param {*} children
 * @param {*} id
 * @returns
 */
const findChildChart = (children, id) => {
  let chart = null

  const fn = (children, id) => {
    let childrenLength = children.length
    for (let i = 0; i < childrenLength; i++) {
      if (children[i].id === id) {
        chart = children[i]
      } else if (children[i].children.length !== 0) {
        fn(children[i].children, id)
      }
    }
  }
  fn(children, id)
  return chart
}

const charts = {
  namespaced: true,
  state: {
    allCharts: [], //左侧边栏所有组件模板列表的存储
    configureList: {}, //右侧边栏依赖的数据列表
    canvasHeaderMenu: [], //头部导航栏选项列表
    chartsTypeList: [], //需要动态获取当前组件库的类型列表，用以保证拖拽事件能够动态获取不同类型的数据
    layoutTypeList: [], //用以在designPanel中动态限制组件插入类型
    //工作中的渲染树
    canvasData: {},
    //上方渲染树根节点的详细配置列表
    //早期设计的遗留问题，原本想要将渲染树和渲染树对应的配置树分开存储，使得渲染树只专注于样式的保存，后来因架构设计的修改，方案大范围更改，但是一部分核心代码已使用该方案，所以此数据给予保留。
    canvasConfigureList: {},
    completeChart: {}, //存储完成绘制的模版(由后端返回)，同时做一点简单的持久化
    permissionId: '', //标识用户拥有的权限规则（与util/authorityManage.js中rulesToChart规则对应）
    targetCanvasDefault: {
      //记录当前画布的一些基本信息，用以修改以及存在的画布
      id: '',
      authorName: '',
      authorId: '',
      groupId: '',
      title: '',
      context: '',
      imgName: '',
    },
    updateFlag: false, //这个值是做一点小小的优化，如果用户未修改视图，仅修改标题或简介和分组，则不再重新生成封面并上传
    canvasIsNotEmpty: false, //不允许画布为空进行上传
    coverageArray: {
      //图层对象
      fatherId: '',
      array: [],
    },
    goBcakArray: [], //撤回功能的状态数组
    dataFromAll: {}, //存放所有的数据源请求后的结果信息
  },
  mutations: {
    SET_TARGET_CANVAS_DAFAULT(state, value) {
      state.targetCanvasDefault = value
    },
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
      if (state.permissionId) {
        const rules = rulesToChart[state.permissionId]
        let permission = basePermission
        permission = batchAddPermission(permission, rules)

        value = value.filter((menu) => {
          if (menu.type == 'edit') {
            menu.action = true
          } else {
            menu.action = false
          }
          return hasPermission(permission, menu.type)
        })
      }
      state.canvasHeaderMenu = value
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
    DELETE_CANVAS_HEADER_MENU(state) {
      state.canvasHeaderMenu = []
    },
    SET_CANVAS_DATA(state, value) {
      state.canvasData = value
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    SET_CONFIGURE_LIST(state, value) {
      state.configureList = value
    },
    SET_CANVAS_CONFIGURE_LIST(state, value) {
      if (value && Array.isArray(value) && value.length !== 0) {
        state.configureList = {
          id: value[0].id, //id的作用在于修改配置信息时，通过递归动态找到对应id的节点
          default: value,
        }
        state.canvasConfigureList = {
          id: value[0].id,
          default: value,
        }
      } else if (
        value &&
        Object.prototype.toString.call(value) == '[object Object]'
      ) {
        state.configureList = value
        state.canvasConfigureList = value
      } else {
        state.configureList = {}
        state.canvasConfigureList = {}
      }
    },
    //早期设计的遗留问题，原本想要将渲染树和渲染树对应的配置树分开存储，使得渲染树只专注于样式的保存，后来因架构设计的修改，方案大范围更改，但是一部分核心代码已使用该方案，所以此数据给予保留。
    //只用于修改画布的属性值
    UPDATE_CANVAS_DATA(state, { type, data }) {
      if (!state.updateFlag) {
        state.updateFlag = true
      }

      //向回退数据添加节点标识,只记录最近30条操作
      if (state.goBcakArray.length >= 30) {
        state.goBcakArray.shift()
      }
      state.goBcakArray.push({
        fatherId: null,
        id: 'canvas',
        data: [data],
        defaultType: type,
        type: goBackListType.update,
      })

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
    //只用于向画布添加亲代子节点，理论上只能添加布局组件
    ADD_CANVAS_DATA_CHILD(state, value) {
      if (!state.canvasData.children) {
        state.canvasData.children = []
      }

      //向回退数据添加节点标识,只记录最近30条操作
      if (state.goBcakArray.length >= 30) {
        state.goBcakArray.shift()
      }
      state.goBcakArray.push({
        fatherId: value.fatherId,
        id: value.id,
        data: null,
        defaultType: null,
        type: goBackListType.add,
      })

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
      if (!state.updateFlag) {
        state.updateFlag = true
      }
      //通过id找到组件
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
            Message('title高度超过40%，已设置为默认最大值')
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
            Message('title高度超过40%，已设置为默认最大值')
          }
          let newHeight = 100 - data.value
          if (fatherNode.children[1]) {
            fatherNode.children[1].newHeight = newHeight
          }
        }
      }

      //这里处理的不是很好，只处理了两层嵌套的数据修改，由于echarts的配置较多，多余层数的样式数据修改由configureChartList组件做了统一处理，返回一个完整数组，由于数组内容不算巨大，性能影响不算太高,暂时先这样了，待优化。
      let defaultLength = targetChild.default.length
      for (let i = 0; i < defaultLength; i++) {
        if (targetChild.default[i].type === type) {
          let configureLength = targetChild.default[i].configure.length
          for (let j = 0; j < configureLength; j++) {
            if (targetChild.default[i].configure[j].type === data.key) {
              if (data.key === 'staticData') {
                targetChild.default[i].configure[j].jsonData = data.value
              } else if (data.key === 'dynamicDataUrl') {
                targetChild.default[i].configure[j].jsonData = {
                  param: data.value.param,
                  methods: data.value.methods,
                }
                targetChild.default[i].configure[j].value = data.value.value
              } else {
                targetChild.default[i].configure[j].value = data.value
              }
              break
            }
          }
          break
        }
      }
    },
    //通过fatherId动态插入子节点
    ADD_CHART(state, value) {
      if (!state.canvasIsNotEmpty) {
        state.canvasIsNotEmpty = true
      }

      //向回退数据添加节点标识,只记录最近30条操作
      if (state.goBcakArray.length >= 30) {
        state.goBcakArray.shift()
      }
      state.goBcakArray.push({
        fatherId: value.fatherId,
        id: value.id,
        data: null,
        defaultType: null,
        type: goBackListType.add,
      })

      let targetChild = findChildChart(
        state.canvasData.children,
        value.fatherId,
      )
      //由于所有的子节点都是通过v-for进行渲染，此处是为了保证title在布局组件中渲染在上方
      if (
        Array.isArray(targetChild.children) &&
        targetChild.children.length > 0 &&
        targetChild.children[0].type === 'title'
      ) {
        targetChild.children.push(value)
      } else {
        targetChild.children.unshift(value)
      }
      state.configureList = {
        id: value.id,
        default: value.default,
      }
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    DELETE_CHART(state, { id, fatherId }) {
      let targetChild =
        fatherId === 'canvas'
          ? state.canvasData
          : findChildChart(state.canvasData.children, fatherId)

      const index = targetChild.children.findIndex((chart) => {
        return chart.id == id
      })

      targetChild.children.splice(index, 1)
    },
    SET_LAYOUT_CHILD(state, value) {
      let targetChild = findChildChart(
        state.canvasData.children,
        value[0].fatherId,
      )
      targetChild.children = value
      Vue.ls.set('CANVAS_DATA', state.canvasData)
    },
    SET_COMPLETE_CHART(state, { data, id }) {
      const completeChart = Vue.ls.get('COMPLETE_CHART', {})

      if (!completeChart[id]) {
        completeChart[id] = data
        Vue.ls.set('COMPLETE_CHART', completeChart, COMPLETE_CHART_EX_TIME)
      }
      state.completeChart[id] = completeChart[id]
    },
    UPDATE_COMPLETE_CHART(state, { data, id }) {
      const completeChart = Vue.ls.get('COMPLETE_CHART', {})

      completeChart[id] = data
      Vue.ls.set('COMPLETE_CHART', completeChart, COMPLETE_CHART_EX_TIME)

      state.completeChart[id] = completeChart[id]
    },
    SET_PERMISSION_ID(state, value) {
      state.permissionId = value
    },
    //图层数组
    SET_COVERAGE_ARRAY(state, fatherId) {
      let targetChild = findChildChart(state.canvasData.children, fatherId)
      state.coverageArray = {
        fatherId,
        array:
          targetChild.children.length > 0 &&
          targetChild.children[0].type === 'layout'
            ? []
            : targetChild.children,
      }
    },
    //更新图层
    UPDATE_COVERAGE_ARRAY(state, array) {
      let targetChild = findChildChart(
        state.canvasData.children,
        state.coverageArray.fatherId,
      )

      //向回退数据添加节点标识,只记录最近30条操作
      if (state.goBcakArray.length >= 30) {
        state.goBcakArray.shift()
      }
      state.goBcakArray.push({
        fatherId: state.coverageArray.fatherId,
        id: null,
        data: targetChild.children.map((chart) => {
          return chart.id
        }),
        defaultType: null,
        type: goBackListType.coverage,
      })

      state.coverageArray.array = array
      targetChild.children = array
    },
    DELETE_COVERAGE_ARRAY(state) {
      state.coverageArray = {}
    },
    GO_BACK_COVERAGE(state, { fatherId, data }) {
      let targetChild = findChildChart(state.canvasData.children, fatherId)

      targetChild.children.sort((a, b) => {
        const indexA = data.findIndex((num) => num === a.id)
        const indexB = data.findIndex((num) => num === b.id)
        return indexA - indexB
      })
    },
    //data数据类似modify_canvasDataChild的data
    SET_GO_BACK_ARRAY(state, { id, defaultType, data, fatherId, type }) {
      //向回退数据添加节点标识,只记录最近30条操作
      if (state.goBcakArray.length >= 30) {
        state.goBcakArray.shift()
      }
      state.goBcakArray.push({
        fatherId,
        id,
        data,
        defaultType,
        type,
      })
    },
    DELETE_GO_BACK_ARRAY(state) {
      state.goBcakArray = []
    },
    POP_GO_BACK_ARRAY(state) {
      if (state.goBcakArray.length > 0) {
        state.goBcakArray.pop()
      }
    },
    SET_DATA_FROM_ALL(state, { key, data }) {
      state.dataFromAll[key] = data
    },
    DELETE_DATA_FROM_ALL(state) {
      state.dataFromAll = {}
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
          Message(msg)
        }
      }
      commit('SET_ALL_CHARTS', allCharts)
    },
    async set_canvasHeaderMenu({ commit }) {
      let canvasHeaderMenu = Vue.ls.get('CANVAS_HEADER_MENU', [])
      if (canvasHeaderMenu.length === 0) {
        const { code, msg, data } = await getCanvasHeaderMenu()

        if (code === 1) {
          canvasHeaderMenu = data.map((obj) => {
            obj.action = false
            if (obj.type == 'edit') {
              obj.action = true
            }
            return obj
          })
          Vue.ls.set(
            'CANVAS_HEADER_MENU',
            canvasHeaderMenu,
            CANVAS_HEADER_MENU_EX_TIME,
          )
          return commit('SET_CANVAS_HEADER_MENU', canvasHeaderMenu)
        } else {
          Message(msg)
        }
      }
      commit('SET_CANVAS_HEADER_MENU', canvasHeaderMenu)
    },
    update_canvasHeaderMenu({ commit }, payload) {
      commit('UPDATE_CANVAS_HEADER_MENU', payload)
    },
    delete_canvasHeaderMenu({ commit }) {
      commit('DELETE_CANVAS_HEADER_MENU')
    },
    set_canvasData({ commit }, payload) {
      commit('SET_CANVAS_DATA', payload)
    },
    async set_canvasDataAndCanvasConfigureListToServer({ commit }, { id }) {
      const { data, code, msg } = await getChartById(id)
      if (code) {
        commit('SET_CANVAS_DATA', data.data)
        commit('SET_CANVAS_CONFIGURE_LIST', data.baseData)
        commit('SET_TARGET_CANVAS_DAFAULT', {
          id: data.id,
          authorName: data.author_name,
          authorId: data.author_id,
          groupId: data.group_id.length > 0 ? `${data.group_id[0]}` : '',
          title: data.title,
          context: data.context,
          imgName: data.imgName,
        })
        return {
          authorId: data.author_id,
        }
      }

      Message(msg)
      return {
        authorName: null,
        authorId: null,
      }
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
    delete_chart({ commit }, payload) {
      commit('DELETE_CHART', payload)
    },
    async set_completeChart({ commit }, chartData) {
      const { data, code, msg } = await saveChart(chartData)

      if (code === 1) {
        commit('SET_COMPLETE_CHART', data)
        return data
      } else {
        Message(msg)
      }
    },
    async update_completeChart({ commit }, chartData) {
      const { data, code, msg } = await updateChart(chartData)

      if (code === 1) {
        commit('SET_COMPLETE_CHART', data)
        return data
      } else {
        Message(msg)
      }
    },
    set_permissionId({ commit }, payload) {
      commit('SET_PERMISSION_ID', payload)
    },
    set_coverageArray({ commit }, fatherId) {
      commit('SET_COVERAGE_ARRAY', fatherId)
    },
    update_coverageArray({ commit }, array) {
      commit('UPDATE_COVERAGE_ARRAY', array)
    },
    delete_coverageArray({ commit }) {
      commit('DELETE_COVERAGE_ARRAY')
    },
    gobackCoverage({ commit }, payload) {
      commit('GO_BACK_COVERAGE', payload)
    },
    set_goBcakArray({ commit }, payload) {
      commit('SET_GO_BACK_ARRAY', payload)
    },
    delete_goBcakArray({ commit }) {
      commit('DELETE_GO_BACK_ARRAY')
    },
    pop_goBackArray({ commit }) {
      commit('POP_GO_BACK_ARRAY')
    },
    set_dataFromAll({ commit }, paload) {
      commit('SET_DATA_FROM_ALL', paload)
    },
    delete_dataFromAll({ commit }) {
      commit('DELETE_DATA_FROM_ALL')
    },
  },
}

export default charts
