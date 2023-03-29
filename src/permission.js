import router from './router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { getRoutes } from './apis/routeApi'
import routerShineUpon from '@/utils/routerShineUpon'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  const token = Vue.ls.get('token')

  // if (!token && to.path !== '/') {
  //   next({
  //     name: 'auth',
  //     query: { redirect: to.fullPath },
  //   })
  // }

  NProgress.start()

  //等待页面显示控制
  store.commit('app/SET_WAITING', true)

  //根据token添加权限路由
  if (token && store.state.routerStore.routes.length === 0) {
    let newRoutes = []

    router.getRoutes().forEach((route) => {
      if (route.parent && route.parent.name === 'home') {
        newRoutes.push({
          path: route.path,
          name: route.name,
          icon: routerShineUpon[route.name].icon,
          label: routerShineUpon[route.name].name,
        })
      }
    })
    //请求路由信息
    const { data } = await getRoutes()
    data.routes.forEach((route) => {
      router.addRoute('home', {
        path: route.path,
        name: route.name,
        component: () => import(`@/views/home/${route.component}.vue`),
      })
      console.log(route)
      newRoutes.push({
        path: route.path,
        name: route.name,
        icon: route.icon,
        label: route.label,
      })
    })
    store.commit('routerStore/SET_ROUTES', newRoutes)
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
  store.commit('app/SET_WAITING', false)
})
