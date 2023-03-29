import request from '@/utils/request'

export const getRoutes = () => {
  return request('/design/routes', 'post')
}
