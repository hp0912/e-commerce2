<template>
  <div class="searchGoods">
    <van-nav-bar
      title="商品搜索"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <van-search placeholder="请输入商品" v-model="keyword" />
    <div id="list-div">
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="offset"
        @load="fun_search()"
      >
        <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in searchList" :key="index">
          <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImage" /></div>
          <div class="list-item-text">
            <div>{{ item.NAME }}</div>
            <div class="productPrice">￥{{ item.ORI_PRICE | moneyFormat}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {searchGoods} from '@/api/goods'

export default {
  data () {
    return {
      zIndex: 100,
      keyword: '',
      searchList: [],
      loading: false,
      finished: false,
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
    document.getElementById('list-div').style.height = winHeight - 46 + 'px'
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    beforeSearch () {
      this.searchList = []
      this.finished = false
      this.page = 1
    },
    fun_search () {
      if (this.keyword === '') {
        this.loading = false
        return
      }
      searchGoods({keyword: this.keyword, page: this.page}).then((response) => {
        let res = response.data
        if (res.code === 200 && res.message.length) {
          this.page++
          this.searchList = this.searchList.concat(res.message)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误，数据取得失败')
        }
      })
    },
    goGoodsInfo (id) {
      this.$router.push({name: 'Goods', params: {goodsId: id}})
    }
  },
  watch: {
    keyword () {
      this.beforeSearch()
      this.fun_search()
    }
  }
}
</script>

<style scoped>
.searchGoods {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  padding-top: 46px;
  background: rgb(244, 244, 244);
}
.van-nav-bar {
  background-color: #ff9000;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-item-img img {
  max-width: 60px;
  max-height: 60px;
}
.list-item-text {
  flex: 16;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
.productPrice {
  font-family: arial;
  font-weight: 400;
  font-size: 1rem;
  color: #ff0036;
}
</style>
