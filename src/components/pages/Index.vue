<template>
  <div class="main">
    <div class="guide-container">
      <router-link to="/location?fromIndex=true" class="location">
        <van-icon name="location" class="iconfont" />
        <span class="address">{{ address.address }}</span>
        <van-icon name="arrow" class="iconfont" />
      </router-link>
      <router-link to="/search" class="search">
        <van-icon name="search" class="iconfont" />
        <span class="search-name">请输入商品名</span>
      </router-link>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" @click="goGoodsInfo(banner.goodsId)" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--category bar-->
    <div class="category-bar">
      <div v-for="(cat, index) in category" :key="index">
        <img v-lazy="cat.image" width="90%" />
        <span>{{ cat.mallCategoryName }}</span>
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item, index) in recommendGoods" :key="index">
            <div class="recommend-item" @click="goGoodsInfo(item.goodsId)">
              <img :src="item.image" width="80%" />
              <div class="info" :title="item.goodsName">{{ item.goodsName }}</div>
              <div>￥{{ item.price }} (￥{{ item.mallPrice }})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-row gutter="20">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index" class="hot-goods-01">
            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
          </van-col>
        </van-row>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import {URL} from '@/serviceAPI.config.js'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        effect: 'slide',
        slidesPerView: 3
      },
      locationIcon: require('@/assets/images/location.svg'),
      bannerPicArray: [],
      category: [],
      adBanner: [],
      recommendGoods: [],
      floorName: {},
      floor1: [],
      floor2: [],
      floor3: [],
      hotGoods: []
    }
  },
  computed: {
    ...mapGetters(['address'])
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created () {
    let {lat, lng} = this.address
    if (!lat || !lng) {
      this.$store.dispatch('location')
    }

    axios({
      url: URL.getShoppingMallInfo,
      method: 'get'
    }).then(result => {
      if (result.status === 200) {
        this.category = result.data.data.category
        this.bannerPicArray = result.data.data.slides
        this.adBanner = result.data.data.advertesPicture
        this.recommendGoods = result.data.data.recommend
        this.floorName = result.data.data.floorName
        this.floor1 = result.data.data.floor1
        this.floor2 = result.data.data.floor2
        this.floor3 = result.data.data.floor3
        this.hotGoods = result.data.data.hotGoods
      }
    }).catch((error) => {
      console.log(error.message)
    })
  },
  methods: {
    goGoodsInfo (id) {
      this.$router.push({name: 'Goods', query: {goodsId: id}})
    }
  }
}
</script>

<style scoped>
.main {
  width: 20rem;
  margin: 0 auto;
  padding-top: 2.875rem;
}
.guide-container {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.875rem;
  background-color: #ff9000;
  z-index: 100;
  user-select: none;
}
.guide-container .location, .guide-container .search {
  display: flex;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
}
.guide-container .location {
  width: 8rem;
  display: flex;
  margin: 0 0.2rem;
}
.guide-container .location .iconfont {
  color: #fff;
  font-size: 1.05rem;
}
.guide-container .location i:first-child {
  padding-left: 8px;
  padding-right: 1px;
}
.guide-container .location .address {
  flex: 1;
  font-size: 0.75rem;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.guide-container .location i:last-child {
  padding-right: 8px;
  font-size: 0.75rem;
}
.guide-container .search {
  flex: 1;
  background: #ffaa71;
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
}
.guide-container .search .iconfont {
  display: inline-block;
  color: #fff;
  padding-left: 10px;
  font-size: 1.05rem;
}
.guide-container .search .search-name {
  color: #fff;
  font-size: 0.75rem;
  display: inline-block;
  padding-left: 10px;
}
.swiper-area {
  font-size: 0;
  width:20rem;
  max-height: 9.15rem;
  clear:both;
}
.category-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.category-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 1px;
}
.recommend-title {
border-bottom: 1px solid #eee;
font-size: 14px;
padding: 0.2rem;
color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
  padding-bottom: 0.2rem;
}
.recommend-item .info {
  color: #ffaa71;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  line-height: 1.8rem;
  padding-bottom: 50px;
}
.hot-goods {
  overflow: hidden;
  background-color: #fff;
}
.hot-title {
  background-color: #ffaa71;
}
.hot-goods-01 {
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.hot-goods-01:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>
