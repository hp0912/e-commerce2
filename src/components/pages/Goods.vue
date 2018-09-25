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
          <div class="goods-comment-container" v-if="!!goodsComments.length">
            <van-list
              v-model="loading"
              :finished="finished"
              :offset="offset"
              @load="getGoodsComments()"
            >
              <div class="goods-comment" v-for="(comment, index) in goodsComments" :key="index">
                <div class="goods-comment-01">
                  <div class="goods-comment-user">
                    <div class="user-avatar">
                      <img class="user-avatar-img" :src="comment.userAvatar" :onerror="errorImage" />
                    </div>
                    <div class="user-nickname">
                      <span class="nickname">{{ comment.nickname }}</span>
                      <span class="comment-time">{{ comment.createTime | timeFormat }}</span>
                    </div>
                  </div>
                  <div class="goods-comment-rate">
                    <van-rate v-model="comment.rate" disabled disabled-color="#ffc355" :size="rateSize" />
                  </div>
                </div>
                <div class="goods-comment-02">
                  {{ comment.comment }}
                </div>
              </div>
            </van-list>
          </div>
          <div class="goods-comment-empty" v-else>
            <span>暂无商品评价</span>
          </div>
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
import {getDetailGoodsInfo, getGoodsComments} from '@/api/goods'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {},
      goodsComments: [],
      loading: false,
      finished: false,
      offset: 300,
      zIndex: 100,
      rateSize: 15,
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"',
      page: 1
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartListNum'])
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    },
    timeFormat (time) {
      let date = new Date(time)
      return date.getFullYear() + '-' +
       (date.getMonth() + 1 + '').padStart(2, '0') + '-' +
       (date.getDate() + '').padStart(2, '0')
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId
  },
  mounted () {
    this.getInfo()
    this.getGoodsComments()

    let winHeight = document.documentElement.clientHeight
    let panel = document.getElementsByClassName('goods-comment-container')
    if (panel.length) {
      panel[0].style.height = winHeight - 46 + 'px'
    }
  },
  methods: {
    getInfo () {
      getDetailGoodsInfo({
        goodsId: this.goodsId
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
      Toast('添加成功，在购物车等亲~')
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
    },
    getGoodsComments () {
      getGoodsComments({page: this.page, goodsId: this.goodsId}).then(response => {
        let result = response.data
        if (result.code === 200 && result.data.length) {
          this.page++
          this.goodsComments = this.goodsComments.concat(result.data)
        } else if (result.code === 200 && !result.data.length) {
          this.finished = true
        } else {
          Toast(result.message)
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        Toast(error.message)
      })
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
.goods-comment-container {
  overflow: scroll;
  background-color: #ededed;
}
.goods-comment {
  margin: 5px 0;
  padding: 0 10px;
  background-color: #fff;
}
.goods-comment-01 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.goods-comment-user {
  display: flex;
}
.user-avatar {
  width: 2rem;
  height: 2rem;
  text-align: center;
  margin: 0.1rem 0.2rem 0 0;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #333;
  font-size: 0;
}
.user-avatar-img {
  width: 100%;
  height: 100%;
}
.user-nickname {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 6rem;
}
.user-nickname .nickname {
  font-size: 0.75rem;
  color: #f85;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.user-nickname .comment-time {
  font-size: 0.75rem;
  color: dimgray;
}
.goods-comment-02 {
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1rem;
  word-break: break-all;
  font-size: 0.8rem;
  color: grey;
  padding: 2px 0;
}
.goods-comment-empty {
  padding-top: 15px;
  text-align: center;
  font-size: 0.8rem;
  color: #f85;
}
</style>
