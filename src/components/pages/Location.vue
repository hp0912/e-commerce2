<template>
  <div class="location">
    <van-nav-bar
      title="选择收货地址"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    />
    <van-search placeholder="请输入收货地址" v-model.trim="value" @input="fun_search" />
    <div class="location-current" v-if="fromIndex && !suggestionLists.length" @click="locationCurrent">
      <van-icon name="location" class="iconfont" />
      <span>点击定位当前位置</span>
    </div>
    <div class="lists" v-else>
      <ul>
        <li v-for="item in suggestionLists" :key="item.id" @click="selectAddress(item)">
          <h3>{{ item.title }}</h3>
          <span>{{ item.address }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {suggestion} from '@/api/location'

export default {
  data () {
    return {
      zIndex: 100,
      value: '',
      suggestionLists: [],
      fromIndex: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    fun_search () {
      if (this.value === '') {
        this.suggestionLists = []
        return
      }
      suggestion({keyword: this.value}).then((response) => {
        this.suggestionLists = response.data.data.data
      }).catch(error => {
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误，数据取得失败')
        }
      })
    },
    locationCurrent () { // 定位当前位置
      this.$store.dispatch('clearAddress')
      this.$store.dispatch('location')
      this.$router.push('/index')
    },
    selectAddress (item) {
      // 如果是首页定位
      if (this.fromIndex) {
        this.$store.dispatch('clearAddress')
        this.$store.dispatch('recordAddress', {address: item.title, ...item.location})
        this.$router.push('/index')
      } else { // 新增收货地址
        this.$store.dispatch('recodeDeliveryAddress', item)
        this.$router.go(-1) // 返回上一个路由
      }
    }
  },
  mounted () {
    this.fromIndex = !!this.$route.query.fromIndex
  }
}
</script>

<style scoped>
.location {
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
.location-current {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  margin: 0 15px;
  padding: 7px 0;
}
.location-current .iconfont {
  display: inline-block;
  font-size: 0.8rem;
  margin-right: 1px;
}
.location-current span {
  font-size: 0.8rem;
  font-weight: 500;
}
.lists ul li {
  border-bottom: 1px solid rgb(231, 231, 231);
  background: #fff;
  font-size: 0.68rem;
  padding-left: 0.2rem;
}
.lists ul li h3 {
  margin-bottom: 0.2rem;
  padding-top: 0.2rem;
}
.lists ul li span {
  color: rgb(163, 163, 163);
}
</style>
