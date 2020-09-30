import Vue from 'vue'
import VueRouter from 'vue-router'
import Commodity from '../views/commodity.vue'
import Download from '../views/download.vue'
import NewAddress from '../views/newAddress.vue'
import AddressList from '../views/addressList.vue'
import Goodbye from '../views/goodbye.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Commodity',
    component: Commodity,
    meta: {
      title: '汉定制款华为P40手机'
    }
  },
  {
    path: '/download',
    name: 'Download',
    component: Download,
    meta: {
      title: '选择套餐'
    }
  },
  {
    path: '/newAddress',
    name: 'NewAddress',
    component: NewAddress,
    meta: {
      title: '订单确认'
    }
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: AddressList,
    meta: {
      title: '修改地址'
    }
  },
  {
    path: '/goodbye',
    name: 'Goodbye',
    component: Goodbye,
    meta: {
      title: '购买成功'
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 进度条开启
  // console.log(to, from)
  next()
})
// 进入后守卫
router.afterEach((to) => {
  // 进度条结束
  document.title = to.meta.title
})

export default router
