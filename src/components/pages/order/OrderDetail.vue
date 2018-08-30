<template>
  <div id="orderDetail">
    <van-nav-bar
      title="订单详情"
      left-text="首页"
      right-text="个人中心"
      fixed
      left-arrow
      :z-index="zIndex"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <div class="tip">
      <h3>{{ orderStatus }}</h3>
      <h4>{{ statusDesc }}</h4>
      <router-link class="buy-again" :to="{path:'/index'}" tag="span">再来一单</router-link>
    </div>
    <div class="goods-list">
      <div class="goods-list-row" v-for="(item) in goods" :key="item.goodsId">
        <van-card
          :title="item.name"
          desc=""
          :num="item.count"
          :price="item.price | moneyFormat"
        >
          <div slot="thumb">
            <img :src="item.image" width="100%" :onerror="errorImage" />
          </div>
        </van-card>
      </div>
    </div>
    <div class="goods-info-wrap">
      <div class="total-price border-top">
        <span class="total-price ">总计￥{{ orderData.totalPrice | moneyFormat }}</span>
        <span class="discount-price">优惠￥{{ orderData.totalPrice | moneyFormat }}</span>
        <span class="pay-price">实付 <strong>￥{{ orderStatusCode === 200 ? 0.01 : 0.00 }}</strong></span>
      </div>
    </div>
    <div class="order-info-wrap">
      <div class="order-number">
        <span class="item-name">订单号码</span>
        <span class="item-value">{{ orderData.orderId }}</span>
        <span class="copy-order-number">复制</span>
      </div>
      <div class="order-time">
        <span class="item-name">订单时间</span>
        <span class="item-value">{{ orderData.createTime | timeFormat }}</span>
      </div>
      <div class="pay-way">
        <span class="item-name">支付方式</span>
        <span class="item-value">在线支付</span>
      </div>
      <div class="address-info">
        <span class="item-value">{{ address.name }}-{{ address.tel }}</span>
      </div>
      <div class="address-info">
        <span class="item-value">{{ address.province + address.city + address.county + address.addressDetail }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {getOrderInfo} from '@/api/order'

export default {
  data () {
    return {
      zIndex: 100,
      orderStatusCode: -1,
      orderStatus: '', // 订单状态
      statusDesc: '', // 状态描述
      goods: [],
      orderData: {
        totalPrice: 0
      },
      address: {},
      errorImage: 'onerror=null;src="' + require('@/assets/images/img-404.gif') + '"'
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    },
    timeFormat (time) {
      let date = new Date(time)
      return date.getFullYear() + '-' +
       (date.getMonth() + 1 + '').padStart(2, '0') + '-' +
       (date.getDate() + '').padStart(2, '0') + ' ' +
       (date.getHours() + '').padStart(2, '0') + ':' +
       (date.getMinutes() + '').padStart(2, '0') + ':' +
       (date.getSeconds() + '').padStart(2, '0')
    }
  },
  created () {
    let id = this.$route.query.id
    getOrderInfo({orderId: id}).then((response) => {
      let res = response.data
      if (res.status === -1) {
        Toast('获取订单失败')
        return
      }
      let data = this.orderData = res.data
      if (data.code === 200) {
        this.orderStatusCode = 200
        this.orderStatus = '订单已完成'
        this.statusDesc = '感谢您对吼吼平台的支持，欢迎再次光临'
      } else {
        this.orderStatus = '订单已取消'
        this.statusDesc = '支付超时，订单已取消'
      }
      this.goods = data.goods
      this.address = data.addressId
    })
  },
  methods: {
    onClickLeft () {
      this.$router.push({name: 'Index'})
    },
    onClickRight () {
      this.$router.push({name: 'Error'})
    }
  }
}
</script>

<style scoped>
#orderDetail {
  padding-top: 46px;
  background: #f4f4f4;
}
.van-nav-bar {
  background-color: #ff9000;
}
.tip {
  margin-top: 0.4rem;
  text-align: center;
  background: #fff;
}
.tip h3 {
  margin: 0.3rem 0;
  padding: 0.4rem 0;
  font-size: 1rem;
  font-weight: 600;
}
.tip h4 {
  margin: 0.2rem 0;
  padding: 0.2rem 0;
  font-size: 0.8rem;
}
.buy-again {
  margin: 0.4rem;
  padding: 2px 3px;
  display: inline-block;
  text-align: center;
  font-size: 0.8rem;
  background: #ffd161;
}
.goods-list {
  background-color: #fff;
}
.goods-list-row {
  display: flex;
}
.van-card {
  width: 100%;
}
.goods-info-wrap {
  margin-top: 0.6rem;
}
.total-price {
  text-align: right;
  padding: 0.4rem;
}
.total-price, .discount-price {
  font-size: 0.75rem;
}
.pay-price {
  font-weight: 600;
  font-size: 0.8rem;
}
.pay-price strong {
  color: #fb4e44;
}
.order-info-wrap {
  margin-top: 0.6rem;
  background: #fff;
}
.order-info-wrap .order-number {
  display: flex;
  align-items: center;
  padding: 0.4rem;
}
.order-info-wrap .order-time {
  display: flex;
  align-items: center;
  padding: 0.4rem;
}
.order-info-wrap .pay-way {
  display: flex;
  align-items: center;
  padding: 0.4rem;
}
.order-info-wrap .address-info {
  display: flex;
  align-items: center;
  padding: 0.4rem;
}
.copy-order-number {
  font-size: 0.75rem;
  display: inline-block;
  text-align: center;
  border: 1px solid grey;
}
.item-name {
  margin-right: 0.4rem;
  font-size: 0.8rem;
  color: grey;
}
.item-value {
  font-size: 0.75rem;
  flex: 1;
}
</style>
