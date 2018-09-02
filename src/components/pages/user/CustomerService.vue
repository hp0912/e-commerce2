<template>
  <div class="cusser">
    <van-nav-bar
      title="联系客服"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <div class="cusserList">
      <div class="cusserList-01">
        <van-icon name="contact" />
      </div>
      <div class="cusserList-02">
        <div><span>二柱子</span></div>
        <div><span>15100000000</span></div>
      </div>
    </div>
    <div class="cusserList">
      <div class="cusserList-01">
        <van-icon name="contact" />
      </div>
      <div class="cusserList-02">
        <div><span>二狗子</span></div>
        <div><span>15800000000</span></div>
      </div>
    </div>
    <div class="cusserList">
      <div class="cusserList-01">
        <van-icon name="contact" />
      </div>
      <div class="cusserList-02">
        <div><span>狗剩子</span></div>
        <div><span>15900000000</span></div>
      </div>
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
.cusser {
  padding-top: 46px;
}
.van-nav-bar {
  background-color: #ff9000;
}
.cusserList {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: grey;
  margin: 0.4rem 0;
  padding: 0 0.2rem;
  border-bottom: 1px dashed gray;
}
.cusserList-01 {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cusserList-02 {
  flex: 9;
  display: flex;
  flex-direction: column;
}
.cusserList-02 div {
  padding: 0.2rem 0;
}
</style>
