import { mapState } from 'vuex'

// 一些全局样式的控制混入
export const styleMixin = {
  computed: {
    ...mapState({
      leftSidebarOpened: (state) => state.app.leftSidebar.opened,
      rightSidebarOpened: (state) => state.app.rightSidebar.opened,
      onlineHeaderOpened: (state) => state.app.onlineHeader.opened,
      operatingMode: (state) => state.app.operatingMode,
    }),
  },
}
