import Vue from 'vue'
import VueRouter from 'vue-router'

const authView = () => import('@/views/auth/authView.vue')

const CanvasView = () => import('@/views/canvas/canvasView.vue')
const ActualReadingView = () => import('@/views/canvas/actualReadingView.vue')

const HomeView = () => import('@/views/home/homeView.vue')
const TemplateList = () => import('@/views/home/templateList.vue')

const NoFound = () => import('@/views/noFound.vue')

Vue.use(VueRouter)

export const baseRoutes = [
  {
    path: '/',
    name: 'auth',
    component: authView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: {
      name: 'templateList',
    },
    children: [
      {
        path: 'templateList',
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
    path: '/canvas/:id',
    name: 'canva',
    component: CanvasView,
  },
  {
    path: '/actualReading',
    name: 'actualReading',
    component: ActualReadingView,
  },
  {
    path: '*',
    name: 'noFound',
    component: NoFound,
  },
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRoutes,
})

export default router
