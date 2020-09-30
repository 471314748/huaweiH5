<template>
  <div class="download">
    <div class="divBlock">
      <div class="comWidth_690">
        <div class="left2">
          <img src="../assets/images/icomlogin.jpg"
               alt="" />
        </div>
        <div class="right">
          <div class="buy_details_price">
            <span>{{ $parent.$parent.commInfo.price }}</span>
            <em>积分</em>
            <img v-show="$parent.$parent.commInfo.car_auth === 1"
                 src="../assets/images/icon136@3x.png"
                 alt="" />
            <img v-show="$parent.$parent.commInfo.car_auth === 2"
                 src="../assets/images/icon134@3x.png"
                 alt="" />
          </div>
          <p>请选择颜色尺寸</p>
        </div>
      </div>
      <!-- 规格 -->
      <div class="specification">
        <div class="color">
          <div class="title">
            颜色
          </div>
          <div class="main">
            <van-button round
                        type="default"
                        class="btn red">亮黑色</van-button>
          </div>
        </div>
        <div class="color">
          <div class="title">
            版本
          </div>
          <div class="main">
            <van-button class="btn2 red"
                        round
                        type="info">8+256GB 汉定制款华为P40</van-button>
          </div>
        </div>
        <div class="amount">
          <div class="title">
            数量
          </div>
          <div class="clear"></div>
          <div class="main">
            <van-stepper disable-input
                         disabled
                         v-model="num" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer2">
      <van-button type="danger"
                  size="large"
                  round
                  class="buy_btn red"
                  @click="submit">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  },
  methods: {
    submit () {
      // 数量存vuex
      this.$store.commit('setNum', this.num)
      // this.$toast.success('成功')
      // this.$toast('即将上线，敬请期待')
      if (+this.$store.state.commInfo.uid !== 0) {
        this.$router.push('/newAddress')
      } else {
        this.$router.push('/newAddress')
        // window.location.href = this.$store.state.loginurl
      }
    }
  },
  created () {
    // console.log(+this.$parent.$parent.commInfo.uid)
  }
}
</script>

<style lang="less" scoped>
.download {
  // box-sizing: border-box;
  width: 375px;
  max-width: 435px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  // background-color: #ccc;
  padding: 22px 21px 18px 18px;
  .divBlock {
    // margin: 22px 18px 18px 18px;
    background-color: #fff;
    .comWidth_690 {
      display: flex;
      margin-bottom: 20px;
      .left2 {
        width: 80px;
        height: 80px;
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        margin-right: 18px;
        img {
          // width: 80px;
          position: absolute;
          height: 80px;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
      .right {
        margin-top: 10px;
        img {
          width: 42px;
          height: 18px;
          margin-top: -2px;
        }
        p {
          margin-top: 4px;
          height: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 12px;
          color: rgba(153, 153, 153, 1);
        }
        .buy_details_price {
          display: flex;
          span {
            height: 30px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            line-height: 12px;
            color: rgba(235, 18, 26, 1);
          }
          em {
            font-style: normal;
            // width: 34px;
            height: 24px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 12px;
            color: rgba(51, 51, 51, 1);
            margin: 0 10px;
            margin-top: 2px;
          }
          div {
            margin-top: -3px;
            display: flex;
            justify-content: center;
            width: 42px;
            height: 18px;
            line-height: 18px;
            background: rgba(19, 19, 19, 1);
            border-radius: 2px;
            padding-top: 3px;
            // text-align: center;
            // position: relative;
            // display: flex;
            span {
              // float: left;
              // width:24px;
              height: 11px;
              font-size: 8px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 12px;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
    .specification {
      .btn {
        // background-color: #CCCCCCFF;
        // width: 72px;
        height: 34px;
        color: #fff;
      }
      .btn2 {
        // background-color: #CCCCCCFF;
        color: #fff;
      }
      .van-button--normal {
        font-size: 14px;
      }
      div {
        margin-bottom: 20px;
      }
      .amount {
        display: flex;
        font-size: 14px;
        .title {
          margin-top: 8px;
        }
        .clear {
          flex: 1;
          height: 100%;
        }
      }
      .color {
        .title {
          width: 375px;
          // height: 467px;
          margin-bottom: 9px;
          font-size: 14px;
          a {
            width: 28px;
            height: 20px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: bold;
            line-height: 12px;
            color: rgba(51, 51, 51, 1);
            letter-spacing: 14px;
          }
        }
        .main {
          .van-button {
            // width: 72px;
            height: 34px;
            border: transparent;
            border-radius: 50px;
            margin-right: 14px;
          }
        }
      }
    }
  }
  .footer2 {
    // z-index: 99;
    margin: auto;
    padding: 0;
    // margin-bottom: 10px;
    // margin-bottom: 20px;
    position: relative;
    .buy_btn {
      position: absolute;
      bottom: -16px !important;
    }
  }
  .red {
    background-color: #f22e30ff;
  }
}
</style>
