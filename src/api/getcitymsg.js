// 省份城市信息获取，废弃
import instance from '../utils/myhttp.js'
function getCityMsg (data) {
  return instance({
    url: '/getCityMsg',
    method: 'post',
    data
  })
}
export { getCityMsg }
