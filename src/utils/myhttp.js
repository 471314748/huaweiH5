// 导入 axios
import axios from 'axios'

// 创建一个 axios 实例
var instance = axios.create({
  // 设置基地址
  // 开发测试接口，生产正式接口
  baseURL:
    'https://weixin37.bydauto.com.cn/activity/public/shop/jfact'
  // process.env.NODE_ENV === 'development'
  //   ? '/activity/public/shop/jfact'
  //   : `${window.location.origin}${
  //   window.location.origin.indexOf('weixin37') > -1 ? '/activity' : '/jf'
  //   }/public/shop/jfact`
})
// 给 axios 设置拦截器
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 导入 axios 对象
export default instance
