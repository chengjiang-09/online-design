import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import 'animate.css'
import * as echarts from 'echarts'

import '@/style/common.less'
import '@/permission'
import config from './defaultSettings'
import DesignUI from '@/components/designUI'
import ConfigureUI from '@/components/configureUI'
import CommonUI from '@/components/publicUI/common'
import {
  LEFT_SIDEBAR,
  OPERATING_MODE,
  RIGHT_SIDERBAR,
  ONLINE_HEADER,
} from '@/store/style-types'

import '@/mock'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts
Vue.use(Storage, config.storageOptions)
Vue.use(ElementUI)
Vue.use(DesignUI)
Vue.use(ConfigureUI)
Vue.use(CommonUI)

// '记得修改lib-flexible源码,让其支持大屏适配,允许适配800-5400'
new Vue({
  router,
  store,
  mounted() {
    store.commit('app/SET_LEFT_SIDEBAR', Vue.ls.get(LEFT_SIDEBAR, true))
    store.commit('app/SET_RIGHT_SIDERBAR', Vue.ls.get(RIGHT_SIDERBAR, true))
    store.commit('app/SET_ONLINE_HEADER', Vue.ls.get(ONLINE_HEADER, true))
    store.commit(
      'app/SET_OPERATING_MODE',
      Vue.ls.get(OPERATING_MODE, config.operatingMode),
    )
    console.log('记得修改lib-flexible源码,让其支持大屏适配,允许适配800-5400')
  },
  render: (h) => h(App),
}).$mount('#app')
