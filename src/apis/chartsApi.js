import request from '@/utils/request'

export const getTemplateClassification = () => {
  return request('/design/templateClassification', 'get')
}

export const getCanvasHeaderMenu = () => {
  return request('/design/canvasHeaderMenu', 'get')
}
