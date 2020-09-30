import instance from '../utils/myhttp.js'
// 下单
function createOrder (data) {
  return instance({
    url: '/createOrder',
    method: 'post',
    data
  })
}
export { createOrder }
