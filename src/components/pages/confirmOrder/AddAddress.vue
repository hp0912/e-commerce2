<template>
  <div id="add-address">
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      fixed
      :z-index="zIndex"
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      :show-delete="!!addressInfo.id"
      show-set-default
      show-search-result
      :tel-validator="telValidator"
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
    />
  </div>
</template>

<script>
import {Toast} from 'vant'
import {getAreaList, addAddress, delAddress, getUserAddress} from '@/api/area'

export default {
  data () {
    return {
      zIndex: 100,
      addressInfo: {},
      areaList: {},
      searchResult: [],
      isSaving: false,
      isDeleting: false
    }
  },
  created () {
    this.areaList = getAreaList()
    let id = this.$route.query.id
    if (id) {
      getUserAddress({id}).then((response) => {
        let data = response.data.data.address
        if (data.length) {
          let addressInit = {id: data[0]._id, ...data[0]}
          this.addressInfo = addressInit
        }
      }).catch(error => {
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误')
        }
      })
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    telValidator (tel) {
      if (!tel.match(/^[1][34578]\d{9}$/)) {
        return false
      }
      return true
    },
    onSave (content) {
      this.isSaving = true
      addAddress(content).then((response) => {
        this.$router.go(-1)
      }).catch(error => {
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误')
        }
      })
    },
    onDelete (content) {
      this.isDeleting = true
      delAddress(content).then((response) => {
        this.$router.go(-1)
      }).catch(error => {
        if (error.message.indexOf('timeout') !== -1) {
          Toast('网络不给力啊, 嗷了个呜...')
        } else {
          Toast('服务器错误')
        }
      })
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
