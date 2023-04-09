import request from '@/utils/request'

export const uploadFile = (formData) => {
  return request('design/chartImg', 'post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
