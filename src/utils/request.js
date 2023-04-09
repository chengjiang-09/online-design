import Vue from 'vue'
import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    // 查询是否存在Token，修改请求头
    const token = Vue.ls.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.requestBase === 'VUE_APP_BASE_URL') {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default (url, method, requestData, options) => {
  return request({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: requestData,
    ...options,
  })
}
