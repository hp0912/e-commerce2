<template>
  <div>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="userinfo-panel">
      <van-field
        v-model="nickname"
        label="昵称"
        icon="clear"
        placeholder="请输入昵称"
        required
        @click-icon="nickname=''"
        :error-message="nicknameErrorMsg"
      />
    </div>
    <div class="userinfo-button">
      <van-button type="primary" size="large" @click="userinfoAction" :loading="openLoading">保存</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {URL} from '@/serviceAPI.config.js'
import {Toast} from 'vant'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      nickname: '',
      nicknameErrorMsg: '',
      openLoading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.nickname = this.userInfo.nickname || ''
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    userinfoAction () {
      this.checkForm() && this.updateUserInfo()
    },
    checkForm () {
      let isOk = true
      if (this.nickname === '') {
        this.nicknameErrorMsg = '昵称不能为空'
        isOk = false
      } else {
        this.nicknameErrorMsg = ''
      }
      return isOk
    },
    updateUserInfo () {
      this.openLoading = true
      axios({
        url: URL.updateUserInfo,
        method: 'post',
        withCredentials: true,
        data: {
          nickname: this.nickname
        }
      }).then(response => {
        if (response.data.status === 200) {
          Toast.success(response.data.message)
          let user = {}
          Object.assign(user, this.userInfo, {nickname: this.nickname})
          this.$store.dispatch('updateUserInfo', user)
          this.$router.go(-1)
        } else {
          Toast(response.data.message)
          this.openLoading = false
        }
      }).catch((error) => {
        Toast.fail(error.message)
        this.openLoading = false
      })
    }
  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff9000;
}
.userinfo-panel {
  width: 96%;
  border-radius: 5px;
  margin: 5px auto;
  padding-bottom: 5px;
}
.userinfo-button {
  padding-top: 5px;
}
</style>
