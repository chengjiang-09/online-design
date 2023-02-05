import Vue from 'vue'
import { OPERATING_MODE } from '@/store/style-types'

const other = {
  namespaced: true,
  state: {
    templateData: {}, //每个组件创建时的默认值存储
    targetChart: null, //保存当前选中的目标组件，用以实现例如激活样式的控制
    actualReading: false, //实际展示模式是否开启，控制组件某些功能在实际展示页面的关闭
    actualReadingCanvas: {}, //缓存实际保存页面配置
    targetParent: null, //记录目标子组件的父组件，用以做拖动
    scaling: {
      //由于缩放导致无法获取dom真实尺寸，此处记录缩放的比例，换算真实尺寸
      x: 0,
      y: 0,
    },
    inputValue: {}, //由于右侧边栏的数据修改是单向的，但是因为用户可以通过拖动组件修改组件的宽高以及定位，导致实际值无法及时更新右侧边栏视图，也没想到什么更好的解决方法，所以选择此处记录值，进行动态修改
    scaleFlag: false, // 控制是否处于缩放状态，是则关闭移动功能
  },
  mutations: {
    SET_TEMPLATE_DATA(state, { key, value }) {
      if (!state.templateData[key]) {
        state.templateData[key] = value
      }
    },
    SET_TARGET_CHART(state, value) {
      let mode = Vue.ls.get(OPERATING_MODE)
      if (mode === 'readingMode') {
        return (state.targetChart = '')
      }
      state.targetChart = value
    },
    SET_ACTUAL_READING(state, value) {
      state.actualReading = value
    },
    SET_ACTUAL_READING_CANVAS(state, value) {
      state.actualReadingCanvas = value
      Vue.ls.set('SET_ACTUAL_READING_CANVAS', state.actualReadingCanvas)
    },
    SET_TARGET_PARENT(state, value) {
      if (state.targetParent !== value) {
        state.targetParent = value
      }
    },
    SET_SCALING(state, value) {
      state.scaling = value
    },
    SET_INPUT_VALUE(state, value) {
      state.inputValue = value
    },
    SET_SCALE_FLAGE(state, value) {
      state.scaleFlag = value
    },
  },
  actions: {
    set_templateData({ commit }, payload) {
      commit('SET_TEMPLATE_DATA', payload)
    },
    set_targetChart({ commit }, payload) {
      commit('SET_TARGET_CHART', payload)
    },
    set_actualReading({ commit }, payload) {
      commit('SET_ACTUAL_READING', payload)
    },
    set_actualReadingCanvas({ commit }, payload) {
      commit('SET_ACTUAL_READING_CANVAS', payload)
    },
    set_targetParent({ commit }, payload) {
      commit('SET_TARGET_PARENT', payload)
    },
    set_scaling({ commit }, payload) {
      commit('SET_SCALING', payload)
    },
    set_inputValue({ commit }, payload) {
      commit('SET_INPUT_VALUE', payload)
    },
    set_scaleFlag({ commit }, payload) {
      commit('SET_SCALE_FLAGE', payload)
    },
  },
}

export default other
