// 引入 axios
import axios from 'axios'
// 引入进度条 nprogress
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
const requests = axios.create({
  // baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: '/api',
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 5000
})

// 请求拦截器： 在发请求之前。请求拦截器可以检测到，在发出去之前做一些事情
requests.interceptors.request.use((config) => {
  // config: 配置对象，对象里面有一个属性很重要 headers请求头
  // 进度条开始
  nprogress.start()
  return config
})

// 响应拦截器：
requests.interceptors.response.use((response) => {
  // 进度条结束
  nprogress.done()
  return response.data
}, (Error) => {
  return Promise.reject(new Error('falie'))
})

// 对外暴露
export default requests
