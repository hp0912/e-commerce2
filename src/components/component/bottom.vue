<template>
  <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed">
    <div class="van-tabbar-item" :class="{'van-tabbar-item--active': active === 'index'}" @click="toIndex">
      <div class="van-tabbar-item__icon"><i class="van-icon van-icon-shop"><!----></i><!----></div>
      <div class="van-tabbar-item__text">首页</div>
    </div>
    <div class="van-tabbar-item" :class="{'van-tabbar-item--active': active === 'categoryList'}" @click="toCategoryList">
      <div class="van-tabbar-item__icon"><i class="van-icon van-icon-records"><!----></i><!----></div>
      <div class="van-tabbar-item__text">吼吼精选</div>
    </div>
    <div class="van-tabbar-item" :class="{'van-tabbar-item--active': active === 'cart'}" @click="toCart">
      <div class="van-tabbar-item__icon"><i class="van-icon van-icon-cart"><!----></i><div class="van-icon__info">{{ cartListNum }}</div></div>
      <div class="van-tabbar-item__text">购物车</div>
    </div>
    <div class="van-tabbar-item" :class="{'van-tabbar-item--active': active === 'error'}" @click="toError">
      <div class="van-tabbar-item__icon"><i class="van-icon van-icon-contact"><!----></i></div>
      <div class="van-tabbar-item__text">会员中心</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      active: 'index'
    }
  },
  computed: {
    ...mapGetters(['cartListNum'])
  },
  mounted () {
    this.active = this.$route.path.slice(1)
  },
  methods: {
    toIndex () {
      this.$router.push({name: 'Index'})
    },
    toCategoryList () {
      this.$router.push({name: 'CategoryList'})
    },
    toCart () {
      this.$router.push({name: 'Cart'})
    },
    toError () {
      this.$router.push({name: 'Error'})
    }
  }
}
</script>

<style scoped>

</style>
