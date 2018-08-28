<template>
  <div>
    <van-nav-bar title="吼吼精选">
    </van-nav-bar>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li @click="clickCategory(index, item.ID)" :class="{categoryActive: categoryIndex === index}" v-for="(item, index) in category" :key="index">
                {{ item.MALL_CATEGORY_NAME }}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  :offset="offset"
                  @load="onLoad"
                >
                  <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImage" /></div>
                    <div class="list-item-text">
                      <div>{{ item.NAME }}</div>
                      <div class="productPrice">￥{{ item.ORI_PRICE | moneyFormat}}</div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
        </van-col>
      </van-row>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
import {Toast} from 'vant'
import axios from 'axios'
import {URL} from '@/serviceAPI.config.js'

export default {
  data () {
    return {
      category: [],
      categorySub: [],
      active: 0,
      categoryIndex: 0,
      loading: false,
      finished: false,
      isRefresh: false,
      page: 1,
      goodList: [],
      categorySubId: '',
      errorImage: 'onerror=null;src="' + require('@/assets/images/img-404.gif') + '"',
      offset: 300
    }
  },
  filters: {
    moneyFormat (money) {
      return (parseFloat(money) || 0).toFixed(2)
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    getCategory () {
      axios({
        url: URL.getCategoryList,
        method: 'get'
      }).then(response => {
        if (response.data.code === 200 && response.data.message) {
          this.category = response.data.message
          this.getCategorySubByCategoryId(this.category[0].ID)
        } else {
          Toast('服务器错误，数据取得失败')
        }
      }).catch(error => {
        console.log(error.message)
      })
    },
    getCategorySubByCategoryId (categoryId) {
      axios({
        url: URL.getCategorySubList,
        method: 'post',
        data: {categoryId: categoryId}
      }).then(response => {
        if (response.data.code === 200 && response.data.message) {
          this.categorySub = response.data.message
          this.active = 0
          this.categorySubId = this.categorySub[0].ID
          this.onLoad()
        } else {
          Toast('服务器错误，数据取得失败')
        }
      }).catch(error => {
        console.log(error.message)
      })
    },
    getGoodList () {
      axios({
        url: URL.getGoodsListByCategorySubID,
        method: 'post',
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then(response => {
        if (response.data.code === 200 && response.data.message.length) {
          this.page++
          this.goodList = this.goodList.concat(response.data.message)
        } else {
          this.finished = true
        }
        this.loading = false
      }).catch(error => {
        console.log(error.message)
      })
    },
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    clickCategory (index, categoryId) {
      this.categoryIndex = index
      this.categorySubId = ''
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    onClickCategorySub (index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    goGoodsInfo (id) {
      this.$router.push({name: 'Goods', query: {goodsId: id}})
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
.productPrice {
  font-family: arial;
  font-weight: 400;
  font-size: 1rem;
  color: #ff0036;
}
</style>
