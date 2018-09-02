<template>
  <div class="popup">
    <van-nav-bar
      title="优惠券"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <div class="popup-list">
      <img src="@/assets/images/popup.jpg" alt="">
      <span>信超越，得免单优惠券</span>
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
.popup {
  padding-top: 46px;
}
.van-nav-bar {
  background-color: #ff9000;
}
.popup-list {
  text-align: center;
}
.popup-list img {
  width: 100%;
  height: 100%;
}
.popup-list span {
  font-size: 0.75rem;
  color: #dca105;
}
</style>
