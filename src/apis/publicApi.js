import request from '@/utils/request'

export const uploadFile = (formData) => {
  return request('/design/chartImg', 'post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateFile = (formData) => {
  return request('/design/chartImg', 'put', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const dataFromApi = ({ url, methods, data }) => {
  return request(url, methods, data)
}
