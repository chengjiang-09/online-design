import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeView = () => import('@/views/home/homeView.vue')
const ActualReadingView = () => import('@/views/home/actualReadingView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/actualReading',
    name: 'actualReading',
    component: ActualReadingView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

export default router
