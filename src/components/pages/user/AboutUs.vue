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
      <p style="text-indent: 1.5rem;">
         加入我们，待遇从优，装备齐全，食宿全免，全天移动式海景套房，只要大干一票，在大都市买楼不再是梦想，干两票，跻身上层社会，直接与奥巴马对话不再是距离。别再犹豫了，给你一个平台，换你一生奇迹！
      </p>
      <p style="text-align: right;">
        ——吼吼人事部
      </p>
      <div style="position: fixed;left: 0;bottom: 0;width: 100%;margin: 0.5rem 0;padding: 0 0.5rem;font-size: 0.75rem;color: gray;">
        <div style="line-height: 1rem;margin: 5px 0;"><span>Github: </span><a href="https://github.com/hp0912/e-commerce2">前端项目地址</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/hp0912/e-commerce2-backend">后端项目地址</a></div>
        <div style="line-height: 1rem;margin: 5px 0;"><span>邮箱: </span>xiehuaping0912@gmail.com</div>
        <div style="line-height: 1rem;margin: 5px 0;"><span>新浪微博: </span>https://weibo.com/u/2573399657</div>
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
