<template>
  <div id="confirm-order">
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="delivery-info-container">
      <router-link class="info-container address-container" v-if="emptyAddress" to="/addaddress">
        <div class="address-info">
          <van-icon name="add" class="iconfont icon-add" />
          <span class="add-text">新增收货地址</span>
        </div>
        <van-icon name="arrow" class="iconfont icon-right" />
      </router-link>
      <router-link class="info-container address-container" to="/address" v-else>
        <div class="address-info">
          <van-icon name="location" class="iconfont" />
          <div class="main-info">
            <p class="address">{{ defineAddress.province + defineAddress.city + defineAddress.county + defineAddress.addressDetail }}</p>
            <span class="name">{{ defineAddress.name }}</span>
            <span class="phone">{{ defineAddress.tel }}</span>
          </div>
        </div>
        <van-icon name="arrow" class="iconfont icon-right" />
      </router-link>
    </div>
    <div class="cart-list">
      <div class="cart-list-row" v-for="(item) in cartInfo" :key="item.goodsId">
        <van-card
          :title="item.name"
          desc="包邮"
          :num="item.count"
          :price="item.price | moneyFormat"
        >
          <div slot="thumb">
            <img :src="item.image" width="100%" :onerror="errorImage" />
          </div>
          <div slot="footer" v-if="fromGoods">
            <van-stepper v-model="item.count" />
          </div>
        </van-card>
      </div>
    </div>
    <div class="info-container desc-container">
      <div class="desc-info">
        <span class="desc-text">使用优惠券</span>
      </div>
      <div class="desc-info">
        <span class="coupon">免单优惠</span>
        <van-icon name="arrow" class="iconfont icon-right" />
      </div>
    </div>
    <div class="info-container desc-container">
      <div class="desc-info">
        <span class="desc-text">配送方式</span>
      </div>
      <div class="desc-info">
        <span class="coupon">顺丰快递 免邮</span>
        <van-icon name="arrow" class="iconfont icon-right" />
      </div>
    </div>
    <div class="info-container desc-container">
      <div class="desc-info">
        <span class="desc-text">运费险</span>
      </div>
      <div class="desc-info">
        <span class="coupon">因商品质量问题退货可赔付1元</span>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice"
      :loading="loading"
      button-text="提交订单"
      @submit="onSubmit"
    >
    </van-submit-bar>
  </div>
</template>

<script>
import {getUserAddress} from '@/api/area'
import {submitOrder} from '@/api/order'
import {Toast} from 'vant'

export default {
  data () {
    return {
      zIndex: 100,
      emptyAddress: true,
      defineAddress: {},
      cartInfo: {},
      fromGoods: false,
      loading: false,
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"'
    }
  },
  computed: {
    totalPrice () {
      return 10 // 组件的价格单位是分，最低支付0.1元
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  created () {
    this.cartInfo = JSON.parse(localStorage.getItem('confirmOrderData') || '{}')
    getUserAddress({}).then((response) => {
      let data = response.data.data.address
      let defaultAddress

      if (data.length) {
        this.emptyAddress = false
        for (let i = 0, len = data.length; i < len; i++) {
          let addressId = this.$route.params.addressId
          if (addressId) {
            if (data[i]._id === addressId) {
              defaultAddress = data[i]
              break
            }
          } else {
            if (data[i].isDefault) {
              defaultAddress = data[i]
              break
            }
          }
        }
        if (!defaultAddress) {
          defaultAddress = data[0]
        }
        this.defineAddress = defaultAddress
      } else {
        this.emptyAddress = true
      }
    })
  },
  mounted () {
    this.fromGoods = !!this.$route.params.fromGoods
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onSubmit () {
      this.loading = true
      if (this.emptyAddress) {
        this.loading = false
        Toast('请添加收货地址')
        return
      }
      let goods = []
      let keys = Object.keys(this.cartInfo)
      keys.forEach((key) => {
        goods.push({goodsId: key, count: this.cartInfo[key]['count']})
      })
      submitOrder({goods, addressId: this.defineAddress._id}).then((response) => {
        if (response.data.status === 200) {
          Toast(response.data.message)
          this.$router.replace({path: '/pay', query: {orderId: response.data.orderId}})
        } else {
          this.loading = false
          Toast(response.data.message)
        }
      }).catch(error => {
        this.loading = false
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误')
        }
      })
    }
  }
}
</script>

<style scoped>
#confirm-order {
  padding-top: 46px;
  padding-bottom: 50px;
}
.van-nav-bar {
  background-color: #ff9000;
}
.info-container {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  justify-content: space-between;
}
.address-container, .desc-container {
  border-bottom: 1px solid #fafafa;
}
.address-info, .desc-info {
  display: flex;
  align-items: center;
}
.address {
  font-size: 0.8rem;
  margin: 0;
  color: #000;
}
.iconfont {
  margin: 0 0.2rem;
  font-size: 1rem;
}
.name, .gender, .phone {
  font-size: 0.4rem;
  color: grey;
}
.phone {
  margin-left: 0.5rem;
}
.add-text {
  color: #979696;
  font-size: 0.8rem;
}
.desc-text {
  color: grey;
  font-size: 0.8rem;
}
.coupon {
  color: #f85;
  font-size: 0.8rem;
}
.icon-add {
  color: #979696;
}
.icon-right {
  font-size: 0.8rem;
}
.cart-list {
  background-color: #fff;
}
.cart-list-row {
  display: flex;
}
.van-card {
  width: 100%;
}
</style>
