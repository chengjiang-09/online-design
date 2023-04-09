import request from '@/utils/request'

export const getTemplateClassification = () => {
  return request('/design/templateClassification', 'get')
}

export const getCanvasHeaderMenu = () => {
  return request('/design/canvasHeaderMenu', 'get')
}

export const getChartsList = (limit, page) => {
  return request('design/template/list', 'get', {
    limit,
    page,
  })
}

export const saveChart = (chartData) => {
  return request('design/template', 'post', chartData)
}
