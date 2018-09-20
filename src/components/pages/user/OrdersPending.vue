<template>
  <div>
    <van-nav-bar
      title="我的订单 (待发货)"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="orderinfo-panel">
      <span>您还没有相关订单</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
.orderinfo-panel {
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
