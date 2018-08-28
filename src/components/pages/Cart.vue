<template>
  <div id="cart">
    <van-nav-bar
      title="购物车"
      fixed
      :z-index="zIndex"
      @click-right="onClickRight"
    >
      <span v-if="!!this.cartListNum" slot="right" style="color: #ff0505;">{{ editStatus === true ? '取消' : '编辑' }}</span>
    </van-nav-bar>
    <div class="empty-cart" v-if="!this.cartListNum">
      <img src="../../assets/images/nothing.png">
      <span class="text">购物车空空如也，快去逛逛吧</span>
      <router-link class="redirect-index" to="/index"><span>去逛逛</span></router-link>
    </div>
    <div class="cart-list">
      <div class="cart-list-row" v-for="(item) in cartInfo" :key="item.goodsId">
        <div class="row-left">
          <van-checkbox v-if="editStatus" v-model="item.delchecked" @change="checkedChange"></van-checkbox>
          <van-checkbox v-else v-model="item.checked" @change="checkedChange"></van-checkbox>
        </div>
        <div class="row-right">
          <van-card
            :title="item.name"
            desc="包邮"
            :num="item.count"
            :price="item.price | moneyFormat"
          >
            <div slot="thumb">
              <img :src="item.image" width="100%" :onerror="errorImage" />
            </div>
            <div slot="footer">
              <van-stepper v-model="item.count" />
            </div>
          </van-card>
        </div>
      </div>
    </div>
    <van-submit-bar
      v-if="!!this.cartListNum"
      :price="totalPrice"
      :button-text="editStatus === true ? '删除' : '结算'"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click.native="checkedAllChange(checked)">全选</van-checkbox>
    </van-submit-bar>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      cartInfo: {},
      zIndex: 100,
      errorImage: 'onerror=null;src="' + require('@/assets/images/img-404.gif') + '"',
      editStatus: false,
      checked: true
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartListNum']),
    totalPrice () {
      let totalPrice = 0
      if (!this.editStatus) {
        for (let goods in this.cartInfo) {
          if (this.cartInfo[goods].checked) {
            totalPrice += (Number(this.cartInfo[goods].count) || 1) * (Number(this.cartInfo[goods].price) || 0)
          }
        }
      }
      this.$store.dispatch('updateCart', {cartList: this.cartInfo})
      localStorage.setItem('cartList', JSON.stringify(this.cartInfo))
      return totalPrice * 100 // 组件的价格单位是分
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  created () {
    this.cartInfo = {...this.cartList}
  },
  methods: {
    onClickRight () {
      this.editStatus = !this.editStatus
    },
    checkedChange (value) {
      let F
      if (this.editStatus) {
        if (value) {
          F = true
          for (let goods in this.cartInfo) {
            if (!this.cartInfo[goods].delchecked) {
              F = false
              break
            }
          }
        } else {
          F = false
        }
      } else {
        if (value) {
          F = true
          for (let goods in this.cartInfo) {
            if (!this.cartInfo[goods].checked) {
              F = false
              break
            }
          }
        } else {
          F = false
        }
      }
      this.checked = F
    },
    checkedAllChange (value) {
      if (this.editStatus) {
        if (value) {
          for (let goods in this.cartInfo) {
            this.cartInfo[goods].delchecked = true
          }
        } else {
          for (let goods in this.cartInfo) {
            this.cartInfo[goods].delchecked = false
          }
        }
      } else {
        if (value) {
          for (let goods in this.cartInfo) {
            this.cartInfo[goods].checked = true
          }
        } else {
          for (let goods in this.cartInfo) {
            this.cartInfo[goods].checked = false
          }
        }
      }
    },
    onSubmit () {
      if (this.editStatus) { // 删除商品
        let newCartInfo = {}
        for (let goods in this.cartInfo) {
          if (!this.cartInfo[goods].delchecked) {
            newCartInfo[goods] = this.cartInfo[goods]
          }
        }
        this.cartInfo = newCartInfo
        this.$store.dispatch('updateCart', {cartList: newCartInfo})
        localStorage.setItem('cartList', JSON.stringify(newCartInfo))
      } else { // 确认订单
        let newCartInfo = {}
        let T = false
        for (let goods in this.cartInfo) {
          if (this.cartInfo[goods].checked) {
            newCartInfo[goods] = this.cartInfo[goods]
            T = true
          }
        }
        if (!T) {
          Toast('没有可结算的商品')
          return
        }
        localStorage.setItem('confirmOrderData', JSON.stringify(newCartInfo))
        this.$router.push({name: 'ConfirmOrder'})
      }
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
#cart .empty-cart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
#cart .empty-cart img {
  width: 9.75rem;
  height: 9.75rem;
}
#cart .empty-cart .text {
  display: block;
  font-size: 0.7rem;
}
#cart .empty-cart .redirect-index {
  display: flex;
  width: 9.75rem;
  height: 2rem;
  margin: 0.6rem auto;
  justify-content: center;
  align-items: center;
  background: yellow;
}
.empty-cart .redirect-index span {
  font-size: 0.6rem;
  color: #000;
}
.cart-list {
  background-color: #fff;
  padding-top: 46px;
  padding-bottom: 100px;
}
.cart-list-row {
  display: flex;
}
.row-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fafafa;
}
.row-right {
  flex: 9;
  display: flex;
}
.van-card {
  width: 100%;
}
.van-submit-bar {
  bottom: 50px;
}
</style>
