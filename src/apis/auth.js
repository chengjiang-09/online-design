import request from '@/utils/request'

export const getEmailCode = (data) => {
  return request('/design/login/emailCode', 'get', data)
}

export const loginByEmailCode = (data) => {
  return request('/design/login/email', 'post', data)
}
