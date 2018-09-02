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
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <div class="popup-list">
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="coupons"
          :disabled-coupons="disabledCoupons"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zIndex: 100,
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: []
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
</style>
