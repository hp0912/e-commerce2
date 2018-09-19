<!--支付页面-->
<template>
  <div id="pay">
    <van-nav-bar
      title="支付订单"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <!--支付剩余时间-->
    <div class="remain-time-container">
      <h3>支付剩余时间</h3>
      <div class="remain-time" v-if="!overtime">
        <span>{{minutes.slice(0, 1)}}</span><span>{{minutes.slice(1, 2)}}</span>
        <span>:</span>
        <span>{{seconds.slice(0, 1)}}</span>
        <span>{{seconds.slice(1, 2)}}</span>
      </div>
      <span class="overtime" v-else>支付超时</span>
    </div>
    <div class="order-info">
      <div class="info">
        <span class="price">￥{{ 0.10 }}</span>
        <p>{{ orderId }}</p>
      </div>
    </div>
    <!--支付方式-->
    <ul class="pay-way">
      <li @click="payTypeFunc('1')">
        <span class="pay-icon">
          <van-icon name="alipay" class="iconfont" />
        </span>
        <span class="pay-way-name">支付宝</span>
        <span>
          <van-checkbox v-model="alipayChecked"></van-checkbox>
        </span>
      </li>
      <li @click="payTypeFunc('2')">
        <span class="pay-icon">
          <van-icon name="wechat" class="iconfont" />
        </span>
        <span class="pay-way-name">微信支付</span>
        <span>
          <van-checkbox v-model="wechatChecked"></van-checkbox>
        </span>
      </li>
    </ul>
    <div class="Advertising">
    </div>
    <div class="submit" @click="selectPayType()">
      <span>确定支付 ￥ </span><span style="font-size: 1.3rem;">{{ 0.10 }}</span>
    </div>
    <transition name="fade">
      <div class="pay-channel" v-show="payMethodShow">
        <div class="channel-select-container">
          <div class="scan" @click="payMethodFunc('1')">
            <van-checkbox v-model="scanChecked"></van-checkbox>
            <span class="pay-method-name">扫二维码支付</span>
          </div>
          <div class="wap" @click="payMethodFunc('2')">
            <van-checkbox v-model="wapChecked"></van-checkbox>
            <span class="pay-method-name">手机APP支付</span>
          </div>
          <div class="pay-channel-submit" :class="{disabled: preventRepeat}" @click="submit()">确定支付</div>
        </div>
        <div class="close" @click="close()">
          <van-icon name="close" style="font-size: 1.8rem;color: #fff;"/>
        </div>
      </div>
    </transition>
    <!--扫码支付-->
    <scan :payType="payType" :orderData="orderData" @close="scanShow = false" v-show="scanShow"></scan>
    <!--调用app支付-->
    <form action="https://pay.trsoft.xin/order/trpayGetWay" method="post" id="form" ref="form">
      <input type="hidden" name="amount" v-model="formData.amount">
      <input type="hidden" name="outTradeNo" v-model="formData.outTradeNo">
      <input type="hidden" name="payType" v-model="payType">
      <input type="hidden" name="tradeName" v-model="formData.tradeName">
      <input type="hidden" name="notifyUrl" v-model="formData.notifyUrl">
      <input type="hidden" name="synNotifyUrl" v-model="formData.synNotifyUrl">
      <input type="hidden" name="payuserid" v-model="formData.payuserid">
      <input type="hidden" name="appkey" v-model="formData.appkey">
      <input type="hidden" name="method" v-model="method">
      <input type="hidden" name="sign" v-model="formData.sign">
      <input type="hidden" name="timestamp" v-model="formData.timestamp">
      <input type="hidden" name="version" v-model="formData.version">
    </form>
  </div>
</template>

<script>
import {initPay, getOrderInfo} from '@/api/order'
import {Toast} from 'vant'
import scan from '../component/scan'

export default {
  data () {
    return {
      zIndex: 100,
      orderInfo: null,
      orderId: null,
      payType: '1', // 支付渠道
      alipayChecked: true,
      wechatChecked: false,
      scanChecked: true,
      wapChecked: false,
      formData: {},
      seconds: '', // 倒计时秒
      minutes: '', // 倒计时分
      method: 'trpay.trade.create.scan', // 支付方式
      scanShow: false,
      payMethodShow: false,
      orderData: {},
      overtime: false,
      preventRepeat: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    payTypeFunc (type) {
      if (type === '1') {
        this.payType = '1'
        this.alipayChecked = true
        this.wechatChecked = false
      } else {
        this.payType = '2'
        this.alipayChecked = false
        this.wechatChecked = true
      }
    },
    payMethodFunc (method) {
      if (method === '1') {
        this.method = 'trpay.trade.create.scan'
        this.scanChecked = true
        this.wapChecked = false
      } else {
        this.method = 'trpay.trade.create.wap'
        this.scanChecked = false
        this.wapChecked = true
      }
    },
    close () {
      this.payMethodShow = false
      this.scanChecked = true
      this.wapChecked = false
      this.method = 'trpay.trade.create.scan'
    },
    selectPayType () {
      if (this.overtime) {
        Toast('支付超时')
        return
      }
      this.payMethodShow = true
    },
    submit () {
      if (this.preventRepeat) {
        Toast('不要重复提交订单')
        return
      }
      if (this.overtime) {
        Toast('支付超时')
        return
      }
      this.preventRepeat = true
      initPay({orderId: this.orderId, payType: this.payType, method: this.method}).then((response) => {
        let res = response.data
        this.preventRepeat = false
        if (res.status === -1) { // 支付接口出错
          Toast(res.message)
          return
        }
        if (res.status === 302) { // 判断该订单是否已经支付完成
          Toast(res.message)
          setTimeout(() => {
            this.$router.push('/order')
          }, 1000)
          return
        }
        if (this.method === 'trpay.trade.create.scan') {
          this.orderData = response.data.data
          this.scanShow = true
        } else {
          this.formData = response.data.data
          this.$nextTick(() => {
            this.$refs['form'].submit()
          })
        }
        localStorage.removeItem('cartList')
        localStorage.removeItem('confirmOrderData')
      })
    },
    calcRemainTime (remainTime) { // 倒计时
      let minutes = (remainTime / 60 % 60)
      this.minutes = minutes >= 10 ? minutes + '' : '0' + minutes // 计算剩余的分钟
      let seconds = (remainTime % 60)
      this.seconds = seconds >= 10 ? seconds + '' : '0' + seconds // 计算剩余的分钟 计算剩余的秒数
      if (!this.minutes && !this.seconds) {
        clearInterval(this.timer)
        this.overtime = true // 支付超时
      }
    }
  },
  mounted () {
    this.orderId = this.$route.query.orderId
    getOrderInfo({orderId: this.orderId}).then((response) => {
      this.orderInfo = response.data.data
      let remainTime = response.data.data.payRemainTime
      if (Number(remainTime) <= 0) {
        this.overtime = true
      }
      this.timer = setInterval(() => {
        remainTime--
        this.calcRemainTime(remainTime)
      }, 1000)
    })
  },
  components: {
    scan
  }
}
</script>

<style scoped>
#pay {
  padding-top: 46px;
  background: #f3f3f6;
}
.van-nav-bar {
  background-color: #ff9000;
}
.remain-time-container {
  text-align: center;
  background-color: #fff;
}
.remain-time-container h3 {
  margin: 6px 0;
  font-size: 0.8rem;
  color: #727272;
}
.remain-time span {
  font-size: 0.6rem;
  display: inline-block;
  color: #fff;
  background: #656467;
  margin: 0.1rem;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
}
.remain-time span:nth-of-type(3) {
  color: #656467;
  background: #f3f3f6;
}
.overtime {
  font-size: 0.6rem;
  margin: 0.1rem 0;
  color: #656467;
}
.order-info {
  display: flex;
  align-items: center;
  background: #f8f8fb;
  margin: 0.5rem 0;
  border-top: 1px solid #e9e8ea;
  border-bottom: 1px solid #e9e8ea;
}
.order-info .info {
  flex: 1;
  display: inline-block;
  text-align: center;
}
.order-info .price {
  color: #fe8402;
}
.order-info p {
  font-size: 0.7rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.pay-way {
  background: #fff;
}
.pay-way li {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #e9e8ea;
}
.pay-way .pay-icon {
  margin-right: 15px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}
.pay-way .pay-way-name {
  flex: 1;
  font-size: 0.8rem;
}
.Advertising {
  margin: 1rem auto;
}
.submit {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.95rem;
  background: yellow;
  margin: 1rem 0 0 0;
  padding: 5px 0;
}
.pay-channel {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(21, 17, 17, 0.8);
  z-index: 101;
}
.channel-select-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.channel-select-container .scan, .channel-select-container .wap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}
.pay-method-name {
  padding-left: 12px;
  font-size: 0.8rem;
  color: #fff;
}
.pay-channel .close {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
}
.pay-channel-submit {
  text-align: center;
  font-size: 1.1rem;
  background: yellow;
  width: 8rem;
  line-height: 2.6rem;
  margin: 2rem auto;
}
.disabled {
  background: #999;
}
</style>
