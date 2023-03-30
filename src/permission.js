import router from './router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { getRoutes } from './apis/routeApi'
import routerShineUpon from '@/utils/routerShineUpon'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  // const token = Vue.ls.get('token')

  // if (!token && to.path !== '/') {
  //   next({
  //     name: 'auth',
  //     query: { redirect: to.fullPath },
  //   })
  // }
  NProgress.start()

  //等待页面显示控制
  store.commit('app/SET_WAITING', true)

  next()
})

router.beforeResolve((to, from, next) => {
  next()
})

router.afterEach(async (to) => {
  const token = Vue.ls.get('token')

  //根据token添加权限路由
  //不知道什么原因，router.addRoute写在路由前置守卫里，老是会阻塞页面跳转
  if (
    token &&
    store.state.routerStore.routes.length === 0 &&
    to.name !== 'auth'
  ) {
    let newRoutes = []
    router.getRoutes().forEach((route) => {
      if (
        route.parent &&
        route.parent.name === 'home' &&
        routerShineUpon[route.name]
      ) {
        newRoutes.push({
          path: route.path,
          name: route.name,
          icon: routerShineUpon[route.name].icon,
          label: routerShineUpon[route.name].name,
          action: true,
        })
      }
    })
    //请求路由信息
    try {
      const { data } = await getRoutes()
      data.routes.forEach((route) => {
        const component = () => import(`@/views/home/${route.component}.vue`)
        router.addRoute('home', {
          path: route.path,
          name: route.name,
          component,
        })
        newRoutes.push({
          path: route.path,
          name: route.name,
          icon: route.icon,
          label: route.label,
          action: false,
        })
      })
      await store.dispatch('routerStore/set_routes', newRoutes)
    } catch (e) {
      console.log(e)
    }
  }
  NProgress.done()
  store.commit('app/SET_WAITING', false)
})
