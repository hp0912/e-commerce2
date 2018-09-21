<template>
  <div>
    <van-nav-bar
      title="我的订单 (待收货)"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="pending-deliver-panel" v-if="orderDataCount">
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
              <span class="panel-header-status">支付完成</span>
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
                  <span>共{{ goods.count }}件商品 已付款: </span><span class="price">￥{{ goods.count * goods.price | moneyFormat }}</span>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer">
            <div class="panel-footer">
              <van-button size="small" class="logistics" @click="viewLogistics(order.orderId)">查看物流</van-button>
              <span>&nbsp;</span>
              <van-button size="small" v-if="!order.confirmReceipt" class="confirmReceipt" @click="confirmReceipt(order.orderId, index)">确认收货</van-button>
            </div>
          </div>
        </van-panel>
      </van-list>
    </div>
    <div class="pending-deliver-empty" v-else>
      <span>您还没有相关订单</span>
    </div>
    <van-actionsheet v-model="showActionsheet" title="商家已发货">
      <div class="logisticsList">
        <div class="logisticsList-01">
          <span>我的心</span>
        </div>
        <div class="logisticsList-02">
          <img src="https://img.aoaoaowu.com/images/logistics.png" width="100%" :onerror="errorImage" />
        </div>
        <div class="logisticsList-03">
          <span>你的心</span>
        </div>
      </div>
    </van-actionsheet>
  </div>
</template>

<script>
import {pendingDeliver, confirmReceipt} from '@/api/order'
import {Toast} from 'vant'

export default {
  data () {
    return {
      orderData: [],
      orderDataCount: true,
      loading: false,
      finished: false,
      pending: false,
      showActionsheet: false,
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
    let panel = document.getElementsByClassName('pending-deliver-panel')
    if (panel.length) {
      panel[0].style.height = winHeight - 46 + 'px'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getOrdersData () {
      pendingDeliver({page: this.page}).then((response) => {
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
    confirmReceipt (orderId, index) {
      if (this.pending) {
        return
      }
      this.$dialog.confirm({
        title: '确认收货',
        message: '为了减少亲不必要的损失，请收到商品后再确认收货'
      }).then(() => {
        this.pending = true
        confirmReceipt({orderId}).then((response) => {
          if (response.data.status === 200) {
            this.orderData[index].confirmReceipt = true
          }
          Toast(response.data.message)
          this.pending = false
        }).catch((error) => {
          this.pending = false
          Toast(error.message)
        })
      }).catch(() => {
        console.log('取消确认收货')
      })
    },
    viewLogistics () {
      this.showActionsheet = true
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
.pending-deliver-panel {
  overflow: scroll;
}
.pending-deliver-empty {
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
.panel-footer .confirmReceipt {
  color: #f44;
  border: 1px solid #f44;
}
.panel-footer .logistics {
  color: #38f;
  border: 1px solid #38f;
}
.logisticsList {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logisticsList-01, .logisticsList-02, .logisticsList-03 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logisticsList-01, .logisticsList-03 {
  height: 11rem;
  font-size: 0.8rem;
  color: #f43407;
}
.logisticsList-02 {
  width: 14rem;
  height: 11rem;
  font-size: 0;
}
</style>
