import chartsList from './assets/chartsList.json'
import headerMenu from './assets/headerMenu.json'

//左侧侧边栏模板列表数据
export const getChartsList = (Mock) => {
  return Mock.mock(
    'https://127.0.0.1:8000/onlineDesign/chartsList',
    'get',
    () => {
      return {
        status: 0,
        message: '',
        data: {
          chartsList,
        },
      }
    },
  )
}

//头部导航栏选项列表
export const getHeaderMenu = (Mock) => {
  return Mock.mock(
    'https://127.0.0.1:8000/onlineDesign/headerMenu',
    'get',
    () => {
      return {
        status: 0,
        message: '',
        data: {
          headerMenu,
        },
      }
    },
  )
}
