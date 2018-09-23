<template>
  <div>
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      :z-index="zIndex"
      @click-left="goBack"
    />
    <van-tabs v-model="active">
      <van-tab title="已过期">
      </van-tab>
      <van-tab title="已完成">
      </van-tab>
    </van-tabs>
    <div class="order-panel">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
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
                <span class="panel-header-status">{{ order.code === 200 ? '已完成' : '已过期'}}</span>
              </div>
            </div>
            <div class="panel-content">
              <div class="panel-content-sub" v-for="(goods) in order.goods" :key="goods.goodsId">
                <div class="panel-content-img">
                  <img :src="goods.image" width="100%" :onerror="errorImage">
                </div>
                <div class="panel-content-info">
                  <div class="goods-name">{{ goods.name }}</div>
                  <div class="goods-price" v-if="order.code === 200">
                    <span style="color: #38f;" @click="showComments">查看评价</span>
                    <span>共{{ goods.count }}件商品 已付款: </span><span class="price">￥{{ goods.count * goods.price | moneyFormat }}</span>
                  </div>
                  <div class="goods-price" v-else>
                    <span>共{{ goods.count }}件商品 需付款: </span><span class="price">￥{{ goods.count * goods.price | moneyFormat }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer" v-if="order.code === 0">
              <div class="panel-footer">
                <van-button size="small" class="remove" @click="removeOrder(order.orderId, index)">删除订单</van-button>
              </div>
            </div>
          </van-panel>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="order-panel-empty" v-if="!orderData.length">
      <span>您还没有相关订单</span>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {expiredOrder, completedOrder} from '@/api/order.js'

export default {
  data () {
    return {
      orderData: [],
      active: 0,
      loading: false,
      finished: false,
      isRefresh: false,
      page: 1,
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"',
      offset: 300,
      zIndex: 100
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    let panel = document.getElementsByClassName('order-panel')
    if (panel.length) {
      panel[0].style.height = winHeight - 90 + 'px'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getOrdersData () {
      if (this.active === 0) {
        expiredOrder({page: this.page++}).then(response => {
          if (response.data.status === 200 && response.data.data.length) {
            this.orderData = this.orderData.concat(response.data.data)
          } else {
            this.finished = true
          }
          this.loading = false
        }).catch(error => {
          Toast(error.message)
        })
      } else {
        completedOrder({page: this.page++}).then(response => {
          if (response.data.status === 200 && response.data.data.length) {
            this.orderData = this.orderData.concat(response.data.data)
          } else {
            this.finished = true
          }
          this.loading = false
        }).catch(error => {
          Toast(error.message)
        })
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.orderData = []
        this.page = 1
        this.getOrdersData()
      }, 500)
    },
    showComments () {
      Toast('VIP用户尊享特权!')
    },
    removeOrder () {
      Toast('VIP用户尊享特权!')
    }
  },
  watch: {
    active () {
      this.orderData = []
      this.finished = false
      this.page = 1
      this.getOrdersData()
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
.order-panel {
  overflow: scroll;
}
.order-panel-empty {
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
.panel-footer .remove {
  border: 1px solid grey;
}
.panel-footer .price {
  font-weight:bold;
  color: red;
}
</style>
