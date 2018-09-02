<template>
  <div id="add-address">
    <van-nav-bar
      title="地址列表"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

<script>
import {Toast} from 'vant'
import {getUserAddress} from '@/api/area'

export default {
  data () {
    return {
      zIndex: 100,
      chosenAddressId: '',
      fromUser: false,
      list: []
    }
  },
  created () {
    if (this.$route.params.fromUser) {
      this.fromUser = true
    }
    getUserAddress({}).then((response) => {
      let data = response.data.data.address
      let addressList = []
      if (data.length) {
        this.chosenAddressId = data[0]._id
        for (let i = 0, len = data.length; i < len; i++) {
          let address = {
            id: data[i]._id,
            name: data[i].name,
            tel: data[i].tel,
            address: data[i].province + data[i].city + data[i].county + data[i].addressDetail
          }
          addressList.push(address)
        }
      }
      this.list = [...addressList]
    }).catch(error => {
      if (error.message.indexOf('timeout') !== -1) {
        Toast('网络不给力啊, 嗷了个呜...')
      } else if (error.status === 401) {
        Toast('亲, 您还没登录呢~')
      } else {
        Toast('服务器错误')
      }
    })
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onAdd () {
      this.$router.push({path: 'addAddress'})
    },
    onEdit (item, index) {
      this.$router.push({path: 'addAddress', query: {id: item.id, index: index}})
    },
    onSelect (item, index) {
      if (this.fromUser) {
        return
      }
      this.$router.push({name: 'ConfirmOrder', params: {addressId: item.id, index: index}})
    }
  }
}
</script>

<style scoped>
#add-address {
  padding-top: 46px;
}
.van-nav-bar {
  background-color: #ff9000;
}
</style>
