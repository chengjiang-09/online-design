import { mapState } from 'vuex'

// 一些全局样式的控制混入
export const styleMixin = {
  computed: {
    ...mapState({
      operatingMode: (state) => state.app.operatingMode,
    }),
  },
}
