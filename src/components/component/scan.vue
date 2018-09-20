<template>
  <div id="scan-container">
    <header>
      <template v-if="payType === '1'">
        <van-icon name="alipay" class="iconfont-alipay" />
        <span class="pay-method-name">支付宝支付</span>
      </template>
      <template v-else>
        <van-icon name="wechat" class="iconfont-wechat" />
        <span class="pay-method-name">微信支付</span>
      </template>
    </header>
    <div class="qrcode-container">
      <div id="qrcode" ref="qrcode"></div>
    </div>
    <div class="info-container">
      <ul>
        <li><span class="itemName">产品名称：</span><span class="itemValue">{{orderData.tradeName}}</span></li>
        <li><span class="itemName">订单编号：</span><span class="itemValue">{{orderData.outTradeNo}}</span></li>
        <li><span class="itemName">订单金额：</span><span class="itemValue">{{orderData.amount / 100}}</span></li>
        <li><span class="itemName">实付金额：</span><span class="itemValue">{{orderData.amount / 100}}</span></li>
      </ul>
    </div>
    <div class="close" @click="close()">
      <van-icon name="close" style="font-size: 1.8rem;"/>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import QRCode from 'qrcode2'
import {queryPayStatus} from '@/api/order'

export default {
  data () {
    return {
      qrcode: null,
      timer: null
    }
  },
  methods: {
    close () {
      clearInterval(this.timer)
      this.$emit('close')
    },
    queryPayStatus (outTradeNo) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        queryPayStatus({outTradeNo}).then((response) => {
          if (response.data.status === 200) {
            clearInterval(this.timer)
            Toast('支付成功，准备跳转...')
            setTimeout(() => {
              this.$router.push({path: '/orderDetail', query: {id: this.orderData.orderId}})
            }, 1000)
          }
        })
      }, 3000)
    }
  },
  props: ['payType', 'orderData'],
  watch: {
    orderData (val) {
      this.orderData = val
      if (this.qrcode) {
        this.qrcode.makeCode(val.data.qrcode)
      } else {
        this.qrcode = new QRCode(this.$refs['qrcode'], {
          text: val.data.qrcode,
          width: 200,
          height: 200
        })
      }
      this.queryPayStatus(val.outTradeNo)
    }
  }
}
</script>

<style scoped>
#scan-container {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 102;
}
header {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem
}
.iconfont-alipay {
  color: #3d91e4;
}
.iconfont-wechat {
  color: #2aaf90;
}
.pay-method-name {
  font-weight: normal;
  font-size: 1.1rem;
  padding-left: 15px;
}
.qrcode-container {
  width: 200px;
  height: 200px;
  margin: 1rem auto;
}
.info-container {
  width: 200px;
  margin: 0 auto;
}
.info-container ul li {
  margin: 0.4rem 0;
}
.info-container .itemName {
  font-size: 14px;
}
.info-container .itemValue {
  font-size: 14px;
  color: grey;
}
.close {
  margin: 1.5rem 0;
  text-align: center;
}
</style>
