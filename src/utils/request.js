import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { baseUrl } from '@/setting'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? (baseUrl || process.env.VUE_APP_BASE_API) : process.env.VUE_APP_BASE_API,
  timeout: 9999999999999,
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = store.getters.token
    }
    // 根据不同情况设置不同的content-type
    if (config.url.includes('upload')) { // 所有上传文件的接口都要求包含upload
      config.headers['Content-Type'] = 'multipart/form-data'
    } else if (config.url.includes('/json')) {
      config.headers['Content-Type'] = 'application/json'
    } else {
      config.transformRequest = [function (data) {
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
  },
  error => {
    console.error('发起请求失败', error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      const { data } = res
      if (data.state === 'ok') {
        return data
      } else if (data.state === 'fail') {
        if (data.errorMsg === 'session异常,请重新登录') {
          store.dispatch('user/logout')
        } else {
          Message({
            message: data.errorMsg,
            type: 'error'
          })
          return Promise.reject(data.errorMsg)
        }
      } else {
        Message({
          message: '后台返回数据格式错误',
          type: 'error'
        })
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('后台返回数据格式错误')
      }
    } else if (res.code === 500) {
      Message({
        message: '服务器发生错误',
        type: 'error'
      })
    } else if (response.request.responseURL.includes('/download')) {
      return res
    } else if (response.request.responseURL.includes('/geoserver') || response.request.responseURL.includes('/shuiba')) {
      return res
    } else {
      Message({
        message: '返回格式错误',
        type: 'error'
      })
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error'
    })
    return null
  }
)

export default service
