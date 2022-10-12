import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

var baseURL = Glod.VUE_APP_BASE_URL

// 创建一个axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 100000,
})

let loadingInstance = null

// 请求的拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // 错误的处理
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应请求
service.interceptors.response.use(
  response => {
    // Toast.clear();
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
