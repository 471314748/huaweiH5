import instance from '../utils/myhttp.js'
// 获取商品数据
function getCommInfo (data) {
  return instance({
    url: '/goodsDetails',
    method: 'post',
    data
  })
}
// 获取积分余额
function getUserScore (data) {
  return instance({
    url: '/getUserScore',
    method: 'post',
    data
  })
}
// 获取默认地址/getUserAddr
function getUserAddr (data) {
  return instance({
    url: '/getUserAddr',
    method: 'post',
    data
  })
}
// 获取uid
function goodsDetails (data) {
  return instance({
    url: '/goodsDetails',
    method: 'post',
    data
  })
}

export { getCommInfo, getUserScore, getUserAddr, goodsDetails }
