<template>
  <div class="Commodity">
    <!-- 头部图片轮播图 -->
    <div class="picList">
      <!-- 返回和转发 -->
      <div class="headerDom w">
        <div class="leftBtns">
          <!-- <van-icon name="arrow-left" /> -->
        </div>
        <div class="rightBtns">
          <!-- <van-icon name="cart-o" /> -->
          <img src="../assets/images/icon1.png" />
        </div>
      </div>
      <van-swipe :autoplay="3000"
                 indicator-color="white"
                 @change="onChange">
        <van-swipe-item v-for="(item, index) in commInfo.imgs"
                        :key="index">
          <img :src="item" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ imgsLength }}</div>
        </template>
      </van-swipe>
    </div>
    <!-- 商品信息 -->
    <div class="buyArea w">
      <!-- 第一 -->
      <div class="priceWrap"
           v-if="commInfo.car_auth == 2">
        <div class="ordinary">
          <div class="consumer">
            <img src="../assets/images/icon134@3x.png"
                 alt="" />
          </div>
          <span class="price"><em>{{ commInfo.price }}</em><a>积分</a></span>
          <del>149999积分</del>
          <span class="expressage">快递：包邮</span>
        </div>
      </div>
      <!-- 第二 -->
      <div class="priceWrap"
           v-else-if="commInfo.car_auth == 1">
        <div class="ordinary">
          <div class="consumer">
            <img src="../assets/images/icon136@3x.png"
                 alt="" />
          </div>
          <span class="price"><em>{{ commInfo.price }}</em><a>积分</a></span>
          <del>149999积分</del>
          <span class="expressage">快递：包邮</span>
        </div>
      </div>
      <!-- 第三 -->
      <div class="priceWrap puton"
           v-else>
        <div class="ordinary">
          <span class="price"><em>{{ commInfo.price }}</em><a>积分</a></span>
          <span class="expressage">快递：包邮</span>
        </div>
      </div>
      <!-- 结束 -->
      <div class="fn_text_wrap">
        <!-- 汉定制款华为p40手机 -->
        {{ commInfo.name }}
      </div>
      <p class="J_ping">
        <!-- 比亚迪汉车尽享5折优惠，比亚迪非汉车主享8折优惠 -->
        {{ commInfo.title }}
      </p>
    </div>
    <!-- 商品详情 -->
    <div class="particulars">
      <div class="title">
        商品详情
      </div>
      <div class="main">
        <img :src="commInfo.img_arr" />
      </div>
    </div>
    <div class="footer">
      <div class="boxfoot">
        <div class="left ordinaryBeing commInfoshow"
             v-if="commInfo.car_auth == 0">
          <b>{{ commInfo.price }}</b> 积分
        </div>
        <div class="left"
             v-else-if="commInfo.car_auth == 1">
          <p class="discount">比亚迪车主折后价</p>
          <p>
            <b>{{ commInfo.price }}</b> 积分
          </p>
        </div>
        <div class="left"
             v-else>
          <p class="discount">比亚迪汉车主折后价</p>
          <p>
            <b>{{ commInfo.price }}</b> 积分
          </p>
        </div>
        <div class="right">
          <van-button @click="showing"><span>立即兑换</span></van-button>
        </div>
      </div>
    </div>
    <van-popup v-model="show"
               position="bottom"
               round
               get-container="download"
               class="tcc">
      <download />
    </van-popup>
  </div>
</template>

<script>
// import { RegExp } from '../utils/jweixin-1.3.2'
import { getCommInfo, goodsDetails } from '../api/getInfo'
import download from './download'
export default {
  components: {
    download
  },
  data () {
    return {
      // 子组件显示隐藏
      show: false,
      // 商品信息
      commInfo: {},
      // // 轮播图下标
      current: 0,
      // // 轮播图
      imgsLength: '',
      // // 用户id
      uid: 0
    }
  },
  methods: {
    // 轮播图下标
    onChange (index) {
      this.current = index
    },
    // 底部弹出层显示
    showing () {
      if (this.isopen === 1) {
        this.show = true
      } else {
        // 未开放下单****
        // this.$toast.fail('即将开放，敬请期待')
        this.show = true
      }
    },
    async getgetcom () {
      // 请求商品信息this.uid
      await goodsDetails().then(res => {
        if (res.status === 200) {
          const uid = res.data.session_uid
          this.isopen = res.data.is_open
          if (uid === '-1') {
            // this.$store.state.login_url = res.data.d_url
            this.$store.commit('setlogInurl', res.data.d_url)
            // this.$toast.success(res.data.data.d_url)
            // window.location.href = res.data.d_url
            // window.alert('uid=-1', res.data.reg_url)
            return
          }
          if (!uid || uid === '0') {
            // this.$store.state.login_url = res.data.reg_url
            this.$store.commit('setlogInurl', res.data.reg_url)
            // window.alert('uid=0', res.data.reg_url)
            // console.log(res.data.reg_url)
            // this.$toast.success(res.data.reg_url)
            // window.location.href = res.data.reg_url
            return
          }
          this.uid = uid
        }
      })
      await getCommInfo({ uid: this.uid }).then(res => {
        // console.log(res)
        // 商品信息
        this.commInfo = res.data
        // 存vuex
        this.$store.commit('setCommInfo', res.data)
        // console.log(this.commInfo)
        // 轮播图下标
        this.imgsLength = res.data.imgs.length
        // console.log(this.$router.options.routes[0].meta.title)
        // this.$router.options.routes[0].meta.title = res.data.name
        // 模拟权限
        // this.commInfo.car_auth = 2
        // 设置页头
        // document.title = res.data.name
        // console.log(res.data.name)
        // console.log('商品数据', res)
        // console.log('vuex', this.$store.state.commInfo)
      })
    }
    // 获取uid方法
    // getQueryString: function getUrlParam (name) {
    //   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    //   var r = window.location.search.substr(1).match(reg) // 匹配目标参数
    //   if (r != null) return unescape(r[2])
    //   return null // 返回参数值
    // }
  },
  created () {
    // console.log(window.location.search.substr(1))
    // 获取小程序传递的参数
    // this.uid = this.getQueryString('uid')
    // console.log('uid获取到了', this.uid)

    // this.$nextTick(() => {
    // this.getUid()
    this.getgetcom()
    // })
  }
}
</script>

<style lang="less" scoped>
.Commodity {
  background-color: #f5f5f5ff;
  .van-popup--bottom.van-popup--round {
    border-radius: 10px 10px 0 0;
  }
  .w {
    padding: 0 20px 0 18px;
  }
  // 轮播图
  .picList {
    position: relative;
    width: 375px;
    height: 375px;
    .custom-indicator {
      position: absolute;
      right: 13px;
      bottom: 8px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      width: 42px;
      text-align: center;
      height: 21px;
      line-height: 18px;
      background: rgba(7, 7, 7, 0.1);
      border-radius: 50px;
    }
    .headerDom {
      height: 36px;
      line-height: 36px;
      width: 100%;
      position: absolute;
      padding: 6px;
      top: 0;
      left: 0;
      z-index: 10;
      .leftBtns {
        float: left;
        font-size: 12px;
      }
      .rightBtns {
        display: none;
        // background-image: url('../assets/images/icon1.png');
        // background-size: 28px;
        float: right;
        width: 35px;
        height: 35px;
        background: rgba(5, 5, 5, 0.2);
        border-radius: 50%;
        position: relative;
        img {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 17px;
          height: 17px;
        }
        i {
          color: #fff;
          transform: translate(2px, 2px);
        }
      }
    }
    .van-swipe-item {
      height: 375px;
      height: 375px;
      overflow: hidden;
      position: relative;
      width: 100%;
      img {
        position: absolute;
        height: 375px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
  // 商品信息
  .buyArea {
    min-height: 125px;
    background-color: #fff;
    padding-top: 16px;
    padding-bottom: 12px;
    .price {
      position: absolute;
      left: 15px;
      top: 0;
      // width: 32px;
      height: 28px;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: rgba(51, 51, 51, 1);
      a {
        font-size: 12px;
      }
      em {
        width: 74px;
        height: 28px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        // font-weight: 500;
        font-style: normal;
        line-height: 12px;
        color: rgba(235, 18, 26, 1);
        margin-right: 10px;
      }
    }
    .expressage {
      position: absolute;
      right: 0;
      top: 4px;
      height: 20px;
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 12px;
      color: rgba(51, 51, 51, 1);
    }
    .priceWrap {
      // overflow: hidden;
      position: relative;
      height: 30px;
      .consumer {
        position: absolute;
        top: 25px;
        width: 50px;
        height: 18px;
        // background: rgba(19, 19, 19, 1);
        border-radius: 2px;
      }
      .ordinary {
        width: 100%;
        height: 18px;
        img {
          width: 42px;
          height: 18px;
        }
        del {
          position: absolute;
          left: 168px;
          top: 5px;
          height: 17px;
          font-size: 14px;
          font-weight: 400;
          line-height: 12px;
          color: rgba(180, 177, 177, 1);
        }
        .consumer {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.8);
          // padding: 0 0 0 8px;
          font-weight: 400;
          text-align: center;
          font-size: 10px;
          span {
            display: block;
            height: 18px;
          }
        }
        .price {
          left: 60px;
          top: -3px;
        }
      }
    }
    .fn_text_wrap {
      width: 200px;
      height: 28px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 12px;
      color: rgba(51, 51, 51, 1);
      margin: 10px 0 3px 0;
    }
    .J_ping {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 23px;
      color: rgba(153, 153, 153, 1);
    }
  }
  // 商品详情
  .particulars {
    margin-top: 8px;
    padding-top: 15px;
    background-color: #fff;
    .title {
      margin: 0 18px;
      height: 24px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 12px;
      color: rgba(51, 51, 51, 1);
    }
    .main {
      width: 375px;
      img {
        width: 375px;
      }
    }
  }
  // 底部按钮
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    // padding-left: 18px;
    .boxfoot {
      width: 100%;
      display: flex;
      // background-color: #fff;
      // padding-left: 18px;
    }
    // padding: ;
    // background-color: #fff;
    .ordinaryBeing {
      // padd-top: -10px;
      // padding-top: -20px;
      // position: relative;
      position: absolute;
      top: 50%;
      left: 0;
      // top: 100px;
      // display: flex;
      // align-items: center;
      // line-height: 10px;
    }
    .commInfoshow {
      line-height: 50px;
    }
    .left {
      padding: 0;
      font-size: 12px;
      flex: 1;
      // line-height: 50px;
      background-color: #fff;
      color: #333f;
      // text-align: center;
      position: relative;
      // left: px;
      // margin-left: 18px;
      padding-left: 18px;
      top: 0px;
      .discount {
        // position: absolute;
        // top: -16px;
        // left: 18px;
        font-size: 10px;
        color: #999999ff;
        font-weight: bold;
        line-height: 24px;
        height: 24px;
      }
      b {
        color: rgb(235, 18, 26);
        // font-weight: 400;
        // line-height: 50px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        font-style: normal;
      }
    }
    .right {
      // float: right;
      display: block;
      width: 159px;
      button {
        width: 100%;
        height: 50px;
        background-color: rgb(235, 18, 26);
        border: none;
        color: #fff;
        // font-size: 17px;
        font-size: 16px;
        vertical-align: top;
      }
    }
  }
  .tcc {
    //  height: 384px;
    height: 435px;
    width: 375px;
    max-width: 375px;
    z-index: 9999;
  }
  .puton {
    .price {
      left: 0px !important;
    }
  }
}
</style>
