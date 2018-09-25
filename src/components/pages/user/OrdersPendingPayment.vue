<template>
  <div>
    <van-nav-bar
      title="我的订单 (待付款)"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="pending-payment-panel" v-if="orderDataCount">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="offset"
        @load="getOrdersData()"
      >
        <van-panel v-for="(order, index) in orderData" :key="order.orderId">
          <div slot="header">
            <div class="panel-header">
              <span class="panel-header-title">{{ order.orderId }}</span>
              <span class="panel-header-status">{{ order.code === 0 ? '等待支付' : order.code === -1 ? '已取消' : ''}}</span>
            </div>
          </div>
          <div class="panel-content">
            <div class="panel-content-sub" v-for="(goods) in order.goods" :key="goods.goodsId">
              <div class="panel-content-img">
                <img :src="goods.image" width="100%" :onerror="errorImage">
              </div>
              <div class="panel-content-info">
                <div class="goods-name">{{ goods.name }}</div>
                <div class="goods-price">
                  <span>共{{ goods.count }}件商品 需付款: </span><span class="price">￥{{ goods.count * goods.price | moneyFormat }}</span>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" v-if="order.code === 0">
            <div class="panel-footer">
              <van-button size="small" class="cancel" @click="cancel(order.orderId, index)">取消订单</van-button>
              <span>&nbsp;</span>
              <van-button size="small" class="pay" @click="pay(order.orderId)">去支付 <span class="price">￥{{ order.totalPrice | moneyFormat }}</span></van-button>
            </div>
          </div>
        </van-panel>
      </van-list>
    </div>
    <div class="pending-payment-empty" v-else>
      <span>您还没有相关订单</span>
    </div>
  </div>
</template>

<script>
import {pendingPayment, cancelOrder} from '@/api/order'
import {Toast} from 'vant'

export default {
  data () {
    return {
      orderData: [],
      orderDataCount: true,
      loading: false,
      finished: false,
      pending: false,
      offset: 300,
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"',
      page: 1
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    let panel = document.getElementsByClassName('pending-payment-panel')
    if (panel.length) {
      panel[0].style.height = winHeight - 46 + 'px'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getOrdersData () {
      pendingPayment({page: this.page}).then((response) => {
        let result = response.data
        if (result.status === 200 && result.data.length) {
          this.page++
          this.orderData = this.orderData.concat(result.data)
        } else if (result.status === 200 && !result.data.length) {
          this.finished = true
        } else {
          Toast(result.message)
        }
        this.loading = false
        this.orderDataCount = !!this.orderData.length
      }).catch((error) => {
        this.loading = false
        Toast(error.message)
      })
    },
    pay (orderId) {
      this.$router.push({path: '/pay', query: {orderId}})
    },
    cancel (orderId, index) {
      if (this.pending) {
        return
      }
      this.pending = true
      cancelOrder({orderId}).then((response) => {
        if (response.data.status === 200) {
          this.orderData[index].code = -1
        }
        Toast(response.data.message)
        this.pending = false
      }).catch((error) => {
        this.pending = false
        Toast(error.message)
      })
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
.pending-payment-panel {
  overflow: scroll;
}
.pending-payment-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}
.panel-header-title {
  white-space: nowrap;
  font-size: 14px;
}
.panel-header-status {
  font-size: 14px;
  color: red;
}
.panel-content {
  padding: 1px 5px;
  background: #fafafa;
}
.panel-content-sub {
  margin-top: 5px;
  display: flex;
}
.panel-content-img {
  width: 90px;
  height: 90px;
}
.panel-content-info {
  flex: 1;
  height: 90px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-left: 6px;
}
.goods-name {
  max-height: 40px;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-price {
  height: 20px;
  text-align: right;
  font-size: 12px;
  color: grey;
}
.goods-price .price {
  color: red;
}
.panel-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: -12px;
}
.panel-footer .cancel {
  border: 1px solid grey;
}
.panel-footer .pay {
  color: red;
  border: 1px solid red;
}
.panel-footer .price {
  font-weight:bold;
  color: red;
}
</style>
