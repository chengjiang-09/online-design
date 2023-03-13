import router from './router'
// import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  // const token = Vue.ls.get('token')

  // if (!token && to.path !== '/') {
  //   next({
  //     name: 'auth',
  //     query: { redirect: to.fullPath },
  //   })
  // }

  next()
})

router.afterEach(() => {
  NProgress.done()
})
