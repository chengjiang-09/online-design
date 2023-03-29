import Vue from 'vue'
import VueRouter from 'vue-router'

const authView = () => import('@/views/auth/authView.vue')

const CanvasView = () => import('@/views/canvas/canvasView.vue')
const ActualReadingView = () => import('@/views/canvas/actualReadingView.vue')

const HomeView = () => import('@/views/home/homeView.vue')
const TemplateList = () => import('@/views/home/templateList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: authView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'templateList',
        component: TemplateList,
      },
    ],
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: CanvasView,
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
