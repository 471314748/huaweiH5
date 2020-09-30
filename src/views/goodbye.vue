<template>
  <div class="goodbye">
    <div class="img">
      <img src="../assets/images/goodbye.png" alt="">
    </div>
    <p class="one">购买成功</p>
    <p>请进入“迪粉汇微信小程序-我的订单”查看订单状态</p>
  </div>
</template>

<style lang='less' scoped>
.goodbye{
  display: flex;
  flex-direction: column;
  align-items:center;
  .img{
    margin-top: 75px;
    img{
      width: 70px;
      height: 70px;
    }
  }
  p{
    font-size: 14px;
    color: #333333FF;
  }
  .one{
      margin: 30px 0;
      color: #13B90FFF;
      font-size: 18px;
    }
}
</style>
