import request from '@/utils/request'

export const getChartsList = () => {
  return request('/onlineDesign/chartsList', 'get')
}

export const getHeaderMenu = () => {
  return request('/onlineDesign/headerMenu', 'get')
}
