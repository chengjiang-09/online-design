import request from '@/utils/request'

export const getSystemUsers = ({ limit, page }) => {
  return request('/design/system/users', 'get', {
    limit,
    page,
  })
}

export const updateSystemUser = ({ id, username }) => {
  return request('/design/system/users', 'put', {
    id,
    username,
  })
}

export const updateSystemTemplate = (data) => {
  return request('design/system/template', 'put', data)
}
