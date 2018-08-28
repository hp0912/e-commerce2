<template>
  <div class="error">
    <van-nav-bar
      title="页面出错了"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="info-container">
      <img :src="errorImg">
      <span class="tip">找不到此页面</span>
      <router-link class="redirect-index" to="/index"><span>回到首页</span></router-link>
    </div>
    <div class="service"><span>联系吼吼: 809211365</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorImg: require('@/assets/images/page-404.png')
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
.van-nav-bar {
  background-color: #ff9000;
}
.error {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.info-container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.info-container img{
  width: 6rem;
  height: 6rem;
}
.tip {
  display: block;
  margin: 0.2rem;
  font-size: 0.9rem;
}
.redirect-index {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2rem;
  margin: 0.6rem 0;
  background: #ffd161;
}
.redirect-index  span {
  font-size: 0.9rem;
}
.service {
  width: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
  text-align: center;
}
.service  span {
  font-size: 0.6rem;
  text-decoration: underline;
}
</style>
