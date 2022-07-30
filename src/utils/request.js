import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { Storage } from '@/utils/Storage';// 浏览器缓存实例
// import { StorageKey } from "@/config"

const service = axios.create({
  // baseURL: "",
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    //设置请求头
    // debugger
    if (config.formatType === "file") {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    //鉴权
    // let token = Storage.get(StorageKey.tokenKey)
    // if (token) {
    //   config.headers['authorization'] = 'Bearer ' + token
    // }


    return config
  },
  (error) => {
    return Promise.reject(error)
  })

service.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权或帐号密码错误，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    console.warn(error.message)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)

  })

export default service