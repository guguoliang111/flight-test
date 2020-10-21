import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrl } from '@/setting'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? (baseUrl || process.env.VUE_APP_BASE_API) : process.env.VUE_APP_BASE_API,
  timeout: 99999999999999,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
    }
    const { url, data } = config
    Object.keys(data).forEach(item => {
      if (data[item] === '' || data[item] === null || data[item] === 'null' || data[item] === undefined || data[item] === 'undefined' || (data[item] instanceof Array && data[item].length === 0) || (data[item].constructor === Object && Object.keys(data[item]).length === 0)) {
        delete data[item]
      }
    })
    config.data = `method=${url}&params=${JSON.stringify(data)}`
    config.url = '/api'
    config.method = 'post'
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 2.0
// service.interceptors.request.use(
//   config => {
//     if (store.getters.sessionId) {
//       config.headers.Authorization = store.getters.sessionId
//     }
//     const { url, data } = config
//     const reqParams = `method=${url}&params=${JSON.stringify(data)}`
//     if (config.method === 'post') {
//       config.url = '/api'
//       config.data = reqParams
//     } else if (config.method === 'get') {
//       config.url = `/api?${reqParams}`
//     }
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      if (res.data.state === 'fail') {
        res.data.errorMsg === '请重新登陆' ? store.dispatch('user/resetToken') : Message({ type: 'error', message: res.data.errorMsg })
      }
      return res
    } else if (response.request.responseURL.includes('/geoserver')) {
      return res
    } else if (res.code === 400) {
      Message({ type: 'error', message: res.msg })
    } else if (res.code === 401) {
      Message({ type: 'error', message: '登录已失效,请重新登录' })
    } else if (res.code === 500) {
      Message({ type: 'error', message: '服务器发生错误' })
    }
  },
  error => {
    const { data: { code, message } } = error.response
    switch (code) {
      case 400:
        Message({ type: 'error', message: message })
        break
      default:
        Message({ type: 'error', message: '请求失败' })
    }
    return Promise.reject(error)
  }
)

export default service
