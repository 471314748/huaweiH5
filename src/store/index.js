import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 商品信息
    commInfo: '',
    // 库存
    num: 1,
    // 身份地址信息
    form: {},
    // 编辑地址信息
    addform: {},
    // 地址开关
    onoff: true,
    // 开关地址显示s
    showsite: true,
    // 注册地址
    loginurl: ''
  },
  mutations: {
    setCommInfo: function (state, payload) {
      state.commInfo = payload
    },
    setNum: function (state, payload) {
      state.num = payload
    },
    setForm: function (state, payload) {
      state.form = payload
    },
    setaddForm: function (state, payload) {
      state.addform = payload
    },
    onOff: function (state, payload) {
      state.onoff = payload
    },
    setshowSite: function (state, payload) {
      state.showsite = payload
    },
    setlogInurl: function (state, payload) {
      state.loginurl = payload
    }
  },
  actions: {},
  modules: {}
})
