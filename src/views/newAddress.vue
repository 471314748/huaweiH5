<template>
  <div class="newAddress">
    <!-- 下单 -->
    <div class="main">
      <!-- <div class="bottomImg"></div> -->
      <div class="addr"
           @click="routeadd"
           v-show="showSite">
        <div class="top">
          <ul class="clearfix">
            <li>{{form.real_name}}</li>
            <li>{{form.phone}}</li>
          </ul>
        </div>
        <div class="botton">
          {{form.province+''+form.city+''+form.county+''+form.addr}}
        </div>
        <van-icon class="rigicon"
                  name="arrow" />
      </div>
      <!-- 地址出问题 -->
      <div class="addr2"
           @click="routeadd"
           v-show="!showSite">
        <p>请填写地址</p>
        <van-icon class="rigicon"
                  name="arrow" />
      </div>
      <van-card :num='form.num'
                class="card"
                :price="price"
                thumb="https://cache.bydauto.com.cn/jifen/jifen_rel//2020/08/05/86884a19ef27c49c52d6eb244e173284.jpg ">
        <template #title>
          <p class="productName">
            汉定制华为P40手机
          </p>
        </template>
        <template #desc>
          <p class="describe">
            8GB+256GB
          </p>
        </template>
        <template #price>
          <p class="univalence">
            ￥{{price}}
          </p>
        </template>
        <template #num>
          <p class="num">
            x {{form.num}}
          </p>
        </template>
        <template #thumb>
          <img class="cardImg"
               src="https://cache.bydauto.com.cn/jifen/jifen_rel//2020/08/05/86884a19ef27c49c52d6eb244e173284.jpg"
               alt="">
        </template>
      </van-card>
      <van-field input-align="right"
                 name="stepper"
                 label="购买数量">
        <template #input>
          <van-stepper disabled
                       disable-input
                       v-model="form.num" />
        </template>
      </van-field>
      <van-cell title="配送方式"
                value="免运费" />
      <van-cell title="积分余额"
                :value="balance" />
      <van-cell title="商品金额"
                :value="product" />
      <van-cell />
    </div>
    <div class="footer">
      <!-- <van-submit-bar :decimal-length='0' currency='' :price="form.score*100" button-text="提交订单" @submit="onSubmit">
</van-submit-bar> -->
      <div class="footMain">
        <div class="left">
          <span class="sum">合计：</span>
          <span class="nub">{{product}}</span>
          <span class="integral">积分</span>
        </div>
        <van-button class="subBtn"
                    type="danger"
                    @click="onSubmit">提交订单</van-button>
      </div>

    </div>
  </div>
</template>

<script>
import { getUserScore, getUserAddr } from '../api/getInfo'
import { sessionSet, sessionGet } from '../utils/mysession'
import { createOrder } from '../api/createOrder'
export default {
  data () {
    return {
      form: {
        uid: 0,
        real_name: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        addr: '',
        score: '',
        goods_id: '',
        product_id: '',
        num: 1
      },
      show: false,
      // 积分余额
      balance: 0,
      // 商品标题
      title: '',
      // 库存store_nums
      store_nums: 10,
      // 更新地址信息
      newForm: {},
      // 判断是否请求地址
      onoOff: false,
      // 地址问题
      showSite: true
    }
  },
  methods: {
    // 点击提交
    onSubmit () {
      this.$dialog.confirm({
        title: '提示',
        message: '请确认您的收货地址信息，订单提交后，将无法更改'
      })
        .then(() => {
          // on confirm
          // console.log('要提交信息', this.form)
          if (this.showSite) {
            if (this.balance < this.form.score) {
              this.$toast.fail('积分不足')
              // console.log(this.store_nums, this.form.num)
            } else if (this.store_nums < this.form.num) {
              this.$toast.fail('库存不足')
            } else {
              createOrder({ ...this.form }).then(res => {
                // console.log(res)
                // this.$toast.success(res.msg)
                if (res.status === 200) {
                  this.$toast.success(res.msg)
                  this.$router.push('/goodbye')
                } else {
                  this.$toast.fail(res.msg)
                }
              })
            }
          } else {
            this.$toast.fail('填写地址信息')
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    // 点击编辑地址
    routeadd () {
      this.onoOff = true
      sessionSet('onoff', this.onoOff)
      // this.$store.commit('onOff', this.onoOff)
      this.$router.push('/addressList')
      // showSite: true
      // this.$store.state.showSite = this.showSite
    }
  },
  created () {
    // this.onoOff = this.$store.state.onoff
    // sessionSet('onoff', true)
    if (sessionGet('onoff')) {
      this.onoOff = true
    }
    // 进来初始化开启
    this.showSite = this.$store.state.showsite
    // console.log(sessionGet('onoff'))
    // 获取数量
    this.form.num = this.$store.state.num
    // 获取单价
    this.price = this.$store.state.commInfo.price
    this.form.uid = +this.$store.state.commInfo.uid
    // 商品id
    this.form.goods_id = this.$store.state.commInfo.id
    // 套餐id
    this.form.product_id = this.$store.state.commInfo.product_id
    // 商品标题
    this.title = this.$store.state.commInfo.name
    // 库存
    this.store_nums = this.$store.state.commInfo.store_nums
    // 请求积分余额
    getUserScore({ uid: this.form.uid }).then(res => {
      // console.log('积分余额', res)
      this.balance = res.data
    })
    // 请求默认地址commInfo
    if (this.onoOff === false) {
      getUserAddr({ uid: this.form.uid }).then(res => {
        // console.log('默认地址', res)
        // 名字
        this.form.real_name = res.data.accept_name
        // 电话
        this.form.phone = res.data.phone
        // 省
        this.form.province = res.data.province
        // 市
        this.form.city = res.data.city
        // 区
        this.form.county = res.data.county
        // 详细地址
        this.form.addr = res.data.addr
        // console.log('最后', this.form)
        // console.log('商品信息', this.$store.state.commInfo)
      })
    }
  },
  mounted () {
    // 数据存vuex
    this.$store.commit('setForm', this.form)
    // 取出更新数据
    // console.log('更新地址', this.$store.state.addform)
    this.newForm = this.$store.state.addform
    // 名字
    this.form.real_name = this.newForm.real_name
    // 电话
    this.form.phone = this.newForm.phone
    // 省
    this.form.province = this.newForm.province
    // 市
    this.form.city = this.newForm.city
    // 区
    this.form.county = this.newForm.county
    // 详细地址
    this.form.addr = this.newForm.addr
    // console.log();
    if (this.form.real_name && this.form.phone && this.form.province && this.form.city && this.form.county && this.form.addr) {
      this.showSite = true
      this.$store.commit('setshowSite', this.showSite)
    } else {
      this.showSite = false
      this.$store.commit('setshowSite', this.showSite)
    }
  },
  computed: {
    // 价格总和
    product () {
      return +this.form.num * this.price
    }
  },
  watch: {
    form: {
      handler (val) {
        // 价格总和赋值form
        val.score = this.product
      },
      deep: true // true 深度监听
      // immediate: true // 声明后立刻调用
    }
  }
}
</script>

<style lang='less' scoped>
.newAddress {
  background-color: #f5f5f5ff;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  .main {
    background-color: #fff;
    position: relative;
    // 地址信息
    .addr {
      // margin-top: 10px;
      padding: 20px 16px 20px;
      background-color: #fff;
      border-bottom: 8px solid #eeeeeeff;
      position: relative;
      .rigicon {
        font-size: 17px;
        position: absolute;
        right: 12px;
        top: 30px;
      }
      .top {
        font-size: 16px;
        ul {
          li {
            float: left;
            margin-right: 20px;
            font-family: PingFang SC;
            font-weight: 400;
          }
        }
        margin-bottom: 10px;
      }
      .botton {
        font-size: 14px;
      }
    }
    .addr2 {
      padding: 30px 16px;
      background-color: #fff;
      border-bottom: 8px solid #eeeeeeff;
      position: relative;
      .rigicon {
        font-size: 17px;
        position: absolute;
        right: 12px;
        top: 20px;
      }
      p {
        text-align: center;
        // line-height: 70px;
        font-size: 18px;
        position: absolute;
        top: 20px;
      }
    }
    // 商品卡片标签名
    .productName {
      font-size: 18px;
      font-weight: bold;
      margin-top: 30px;
      margin-left: 20px;
    }
    .cardImg {
      width: 82px;
      height: 82px;
      margin-top: 28px;
    }
    .describe {
      font-size: 14px;
      color: #999f;
      margin: 12px 0 0 19px;
    }
    .univalence {
      font-weight: bold;
      margin: 6px 0 0 19px;
      font-size: 14px;
    }
    .num {
      font-size: 12px;
      margin-left: -150px;
      margin-top: 6px;
    }
    .van-submit-bar__price {
      display: none;
    }
    /deep/ .van-submit-bar__text {
      text-align: center;
    }
    .van-submit-bar__text span {
      font-size: 14px;
      line-height: 10px;
    }
    .card {
      margin-top: 0;
      margin-bottom: 23px;
      background-color: #fff;
    }
  }
  .footer {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .subBtn {
      display: block;
      height: 50px;
      float: right;
      padding: 0 45px;
      font-size: 17px;
      background-color: #f22e30ff;
    }
    .left {
      float: left;
      font-size: 14px;
      line-height: 50px;
      padding-left: 20px;
      .sum {
        font-family: PingFang SC;
        font-weight: bold;
      }
      .nub {
        margin-right: 4px;
        font-size: 18px;
        color: #eb121aff;
        font-family: PingFang SC;
        font-weight: bold;
      }
    }
  }
  // 单价
  // .van-card__price{
  //   // color: red;
  // }
}
// .addList{
//   position: fixed;
//   z-index: 999;
// }
</style>
