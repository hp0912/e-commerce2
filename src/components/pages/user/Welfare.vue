<template>
  <div class="about-us">
    <van-nav-bar
      title="福利红包"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <div class="welfare">
      <img src="@/assets/images/welfare.png" alt="">
      <span>识别图中二维码领取支付宝福利红包</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zIndex: 100
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.about-us {
  padding-top: 46px;
}
.van-nav-bar {
  background-color: #ff9000;
}
.welfare {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.welfare img {
  width: 100%;
  height: 100%;
}
.welfare span {
  font-size: 0.8rem;
  color: grey;
}
</style>
