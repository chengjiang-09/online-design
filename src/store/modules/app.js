import Vue from 'vue'
import {
  LEFT_SIDEBAR,
  OPERATING_MODE,
  RIGHT_SIDERBAR,
  ONLINE_HEADER,
} from '@/store/style-types'

const app = {
  namespaced: true,
  state: {
    leftSidebar: {
      //左侧边栏控制
      opened: true,
    },
    rightSidebar: {
      //右侧边栏控制
      opened: true,
    },
    onlineHeader: {
      //头部导航栏控制
      opened: true,
    },
    operatingMode: '', //阅览模式和编辑模式的模式控制
    menuOpened: false, // 鼠标右击对应组件时，右击菜单栏的打开控制
    editCanvasOpened: true, //画布创建弹窗的弹出控制
    authMove: false, //控制登录界面登录组件的展开关闭
  },
  mutations: {
    SET_LEFT_SIDEBAR(state, value) {
      state.leftSidebar.opened = value
      Vue.ls.set(LEFT_SIDEBAR, value)
    },
    SET_RIGHT_SIDERBAR(state, value) {
      state.rightSidebar.opened = value
      Vue.ls.set(RIGHT_SIDERBAR, value)
    },
    SET_ONLINE_HEADER(state, value) {
      state.onlineHeader.opened = value
      Vue.ls.set(ONLINE_HEADER, value)
    },
    SET_OPERATING_MODE(state, value) {
      state.operatingMode = value
      Vue.ls.set(OPERATING_MODE, value)
    },
    SET_MENU_OPENED(state, value) {
      state.menuOpened = value
    },
    SET_EDIT_CANVAS_OPENED(state, value) {
      state.editCanvasOpened = value
    },
    SET_AUTH_MOVE(state, value) {
      state.authMove = value
    },
  },
  actions: {
    set_leftSidebar: ({ commit }, type) => {
      commit('SET_LEFT_SIDEBAR', type)
    },
    set_rightSidebar: ({ commit }, value) => {
      commit('SET_RIGHT_SIDERBAR', value)
    },
    set_onlineHeader: ({ commit }, value) => {
      commit('SET_ONLINE_HEADER', value)
    },
    set_OperatingMode: ({ commit }, value) => {
      commit('SET_OPERATING_MODE', value)
    },
    set_menuOpened: ({ commit }, value) => {
      commit('SET_MENU_OPENED', value)
    },
    set_editCanvasOpened: ({ commit }, value) => {
      commit('SET_EDIT_CANVAS_OPENED', value)
    },
    set_authMove: ({ commit }, value) => {
      commit('SET_AUTH_MOVE', value)
    },
  },
}

export default app
