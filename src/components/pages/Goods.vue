<template>
  <div class="goods-details">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" :onerror="errorImage" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">￥{{ goodsInfo.PRESENT_PRICE | moneyFormat}}元</div>
    <div style="padding-bottom: 50px;">
      <van-tabs swipeable>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" text="客服" @click="onClickMiniBtn" />
      <van-goods-action-mini-btn icon="cart" text="购物车" :info="cartListNum" @click="toCart" />
      <van-goods-action-big-btn text="加入购物车" @click="addGoodsToCart" />
      <van-goods-action-big-btn text="立即购买" @click="toConfirmOrder" primary />
    </van-goods-action>
  </div>
</template>

<script>
import {Toast} from 'vant'
import axios from 'axios'
import {URL} from '@/serviceAPI.config.js'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {},
      zIndex: 100,
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"'
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartListNum'])
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
    this.getInfo()
  },
  methods: {
    getInfo () {
      axios({
        url: URL.getDetailGoodsInfo,
        method: 'post',
        data: {
          goodsId: this.goodsId
        }
      }).then(response => {
        if (response.data.code === 200 && response.data.message) {
          this.goodsInfo = response.data.message
        } else {
          Toast('服务器错误，数据取得失败')
        }
      }).catch(error => {
        console.log(error.message)
        Toast('服务器错误，数据取得失败')
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    toCart () {
      this.$router.push({name: 'Cart'})
    },
    addGoodsToCart () {
      if (this.cartList[this.goodsInfo.ID]) {
        Toast('购物车已经有该商品了')
        return
      }
      let newGoodsInfo = {
        goodsId: this.goodsInfo.ID,
        name: this.goodsInfo.NAME,
        price: Number((Number(this.goodsInfo.PRESENT_PRICE) || 0).toFixed(2)),
        image: this.goodsInfo.IMAGE1,
        count: 1
      }
      this.$store.dispatch('addCart', newGoodsInfo)
    },
    onClickMiniBtn () {
      Toast('人工智能客服即将上线,敬请期待!')
    },
    toConfirmOrder () {
      let newGoodsInfo = {
        goodsId: this.goodsInfo.ID,
        name: this.goodsInfo.NAME,
        price: Number((Number(this.goodsInfo.PRESENT_PRICE) || 0).toFixed(2)),
        image: this.goodsInfo.IMAGE1,
        checked: true,
        count: 1
      }
      localStorage.setItem('confirmOrderData', JSON.stringify({[this.goodsInfo.ID]: newGoodsInfo}))
      this.$router.push({name: 'ConfirmOrder', params: { fromGoods: true }})
    }
  }
}
</script>

<style scoped>
.goods-details {
  padding-top: 46px;
}
.van-nav-bar {
  background-color: #ff9000;
}
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
  color:blue;
}
.goods-price {
  background-color: #fff;
  color: red;
}
</style>
