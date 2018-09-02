<template>
  <div class="about-us">
    <van-nav-bar
      title="关于我们"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <div>
      <div style="text-align: center;margin-top: 0.5rem;">
        <img src="@/assets/images/aboutus.gif" alt="关于我们">
      </div>
      <p style="text-indent: 1.5rem;">
         加入我们，待遇从优，装备齐全，食宿全免，一条大裤衩，一双人字拖，一把AK47，1000美元底薪+提成，全天移动式海景套房，只要大干一票，在大都市买楼不再是梦想，干两票，跻身上层社会，直接与奥巴马对话不再是距离。别再犹豫了，给你一个平台，换你一生奇迹！
      </p>
      <p style="text-align: right;">
        ——吼吼人事部
      </p>
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
p {
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  color: #8c8c8c;
}
</style>
