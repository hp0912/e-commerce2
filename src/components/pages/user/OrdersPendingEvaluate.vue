<template>
  <div>
    <van-nav-bar
      title="我的订单 (待评价)"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="pending-evaluate-panel" v-if="orderDataCount">
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
              <span class="panel-header-status">{{ order.hasComment ? '已评价' : '待评价'}}</span>
            </div>
          </div>
          <div class="panel-content">
            <div class="panel-content-sub" v-for="(goods) in order.goods" :key="goods.goodsId">
              <div class="panel-content-sub-01">
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
              <div class="panel-comment">
                <van-rate v-model="goods.rate" />
                <van-field
                  v-model="goods.comment"
                  type="textarea"
                  placeholder="宝贝满足你的期待吗？说说你的心得，分享给想买的他们吧"
                  rows="3"
                  autosize
                />
              </div>
            </div>
          </div>
          <div slot="footer" v-if="!order.hasComment">
            <div class="panel-footer">
              <van-button size="small" class="comment" @click="submitComment(order.orderId, index)">提交评价</van-button>
            </div>
          </div>
        </van-panel>
      </van-list>
    </div>
    <div class="pending-evaluate-empty" v-else>
      <span>您还没有相关订单</span>
    </div>
  </div>
</template>

<script>
import {pendingEvaluate, submitComment} from '@/api/order'
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
    let panel = document.getElementsByClassName('pending-evaluate-panel')
    if (panel.length) {
      panel[0].style.height = winHeight - 46 + 'px'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getOrdersData () {
      pendingEvaluate({page: this.page}).then((response) => {
        let result = response.data
        if (result.status === 200 && result.data.length) {
          this.page++
          for (let i = 0, len = result.data.length; i < len; i++) {
            for (let j = 0, len2 = result.data[i].goods.length; j < len2; j++) {
              result.data[i].goods[j].rate = 0
              result.data[i].goods[j].comment = ''
            }
          }
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
    submitComment (orderId, index) {
      if (this.pending) {
        return
      }
      const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '请稍后...'
      })
      this.pending = true
      let T = false
      let commentData = {}
      commentData.orderId = orderId
      commentData.comment = {}
      for (let i = 0, len = this.orderData[index].goods.length; i < len; i++) {
        let goodsData = this.orderData[index].goods[i]
        commentData.comment[goodsData.goodsId] = {}
        commentData.comment[goodsData.goodsId].rate = goodsData.rate
        commentData.comment[goodsData.goodsId].comment = goodsData.comment
        if (goodsData.comment.length < 3) {
          T = true
          break
        }
      }
      if (T) {
        toast.clear()
        this.pending = false
        Toast('评论内容至少三个字')
        return
      }
      submitComment({commentData}).then((response) => {
        if (response.data.status === 200) {
          this.orderData.splice(index, 1)
        }
        toast.clear()
        Toast(response.data.message)
        this.pending = false
        this.orderDataCount = !!this.orderData.length
      }).catch((error) => {
        toast.clear()
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
.pending-evaluate-panel {
  overflow: scroll;
}
.pending-evaluate-empty {
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
}
.panel-content-sub-01 {
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
.panel-comment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
