import router from './router' // 导入路由器
import Vue from 'vue' // 导入 Vue
import NProgress from 'nprogress' // 导入进度条库
import 'nprogress/nprogress.css' // 导入进度条样式
import store from './store' // 导入 Vuex store
import { getRoutes } from './apis/routeApi' // 导入获取路由的 API
import routerShineUpon from '@/utils/routerShineUpon' // 导入路由高亮的配置

NProgress.configure({ showSpinner: false }) // 配置进度条选项，隐藏加载图标

router.beforeEach(async (to, from, next) => {
  // const token = Vue.ls.get('token')

  // if (!token && to.path !== '/') {
  //   next({
  //     name: 'auth',
  //     query: { redirect: to.fullPath },
  //   })
  // }
  NProgress.start() // 开始进度条

  //等待页面显示控制
  store.commit('app/SET_WAITING', true) // 显示等待页面

  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

//不知道什么原因，router.addRoute写在路由前置守卫里，老是会阻塞页面跳转
router.afterEach(async (to) => {
  const token = Vue.ls.get('token')
  let routesGroup = []
  //这里有一种情况就是用户先不登录拿到路由后，再返回来登录，vuex routes不再为空，无法再获取路由信息。已通过在登录页挂载后的钩子添加清空routes方法
  if (
    token &&
    store.state.routerStore.routesGroup.length === 0 &&
    to.name !== 'auth'
  ) {
    try {
      const { data } = await getRoutes() // 请求路由数据
      data.routes.forEach((route) => {
        const component = () => import(`@/views/home/${route.component}.vue`)
        router.addRoute('home', {
          path: route.path,
          name: route.name,
          component,
        })
        let routeData = {
          path: route.path,
          name: route.name,
          icon: route.icon,
          label: route.label,
          groupId: route.group_id,
          groupName: route.group_name,
          groupIcon: route.group_icon,
          action: false,
        }
        routesGroup = initRoutes(routesGroup, routeData)
      })
    } catch (e) {
      console.log(e) // 输出错误信息
    }
    await store.dispatch('routerStore/set_routesGroupAndRoutes', routesGroup) // 存储新的路由配置到 Vuex State 中
  } else if (
    (!token &&
      store.state.routerStore.routesGroup.length === 0 &&
      to.name !== 'auth') ||
    (!token && to.fullPath.split('/')[1] == 'home')
  ) {
    //没有token时，依然可以访问模版列表
    router.getRoutes().forEach((route) => {
      if (
        route.parent &&
        route.parent.name === 'home' &&
        routerShineUpon[route.name]
      ) {
        let routeData = {
          path: route.path,
          name: route.name,
          icon: routerShineUpon[route.name].icon,
          label: routerShineUpon[route.name].name,
          groupId: routerShineUpon[route.name].groupId,
          groupName: routerShineUpon[route.name].groupName,
          groupIcon: routerShineUpon[route.name].groupIcon,
          action: false,
        }
        routesGroup = initRoutes(routesGroup, routeData)
      }
    })
    await store.dispatch('routerStore/set_routesGroupAndRoutes', routesGroup) // 存储新的路由配置到 Vuex State 中
  }
  NProgress.done() // 完成进度条
  store.commit('app/SET_WAITING', false) // 隐藏等待页面
})

/**
 * 初始化routesGroup信息，用以通过groupId区分不同路由具体所在子模块，最后形成一个用于渲染侧边栏和头部导航栏的数组
 *
 * @param {*} route
 * @param {*} routes
 * @param {*} routeData
 * @returns
 */
function initRoutes(routesGroup, routeData) {
  let group = routesGroup.find((group) => group.id == routeData.groupId)

  if (!group) {
    let groupData = {
      id: routeData.groupId,
      name: routeData.groupName,
      icon: routeData.groupIcon,
      action: false,
      routes: [],
    }

    groupData.routes.push(routeData)
    if (groupData.id === 'design') {
      groupData.action = true
      routesGroup.unshift(groupData)
    } else {
      routesGroup.push(groupData)
    }
  } else {
    group.routes.push(routeData)
  }
  return routesGroup
}
