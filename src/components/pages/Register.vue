<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
    </div>
    <van-cell-group>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :error-message="smsErrorMsg"
      >
        <van-button slot="button" size="small" type="primary" :class="{'sent': sent}" @click="sendVerificationCode">{{ smsButtonText }}</van-button>
      </van-field>
    </van-cell-group>
    <div class="register-button">
      <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {URL} from '@/serviceAPI.config.js'
import {Toast} from 'vant'

export default {
  data () {
    return {
      username: '',
      password: '',
      sms: '',
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      smsErrorMsg: '',
      sent: false,
      openLoading: false,
      smsButtonText: '发送验证码',
      timer: 0,
      countdown: 60
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    registerAction () {
      this.checkForm() && this.axiosRegisterUser()
    },
    checkForm () {
      let isOk = true
      if (!this.username.match(/^[1][34578]\d{9}$/)) {
        this.usernameErrorMsg = '请输入正确的手机号'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      if (this.sms.length < 4) {
        this.smsErrorMsg = '请输入验证码'
        isOk = false
      } else {
        this.smsErrorMsg = ''
      }
      return isOk
    },
    sendVerificationCode () {
      if (this.sent) {
        return
      }
      this.sent = true
      axios({
        url: URL.sentVerificationCode,
        method: 'post',
        data: {}
      }).then(response => {
        if (response.data.code === 200) {
          this.smsButtonText = `${this.countdown}S`
          this.timer = setInterval(() => {
            this.countdown--
            if (this.countdown === 0) {
              clearInterval(this.timer)
              this.countdown = 60
              this.sent = false
              this.smsButtonText = `发送验证码`
              return
            }
            this.smsButtonText = `${this.countdown}S`
          }, 1000)
        } else {
          Toast.fail('验证码发送失败')
          this.sent = false
        }
      }).catch((error) => {
        console.log(error.message)
        Toast.fail('注册失败')
        this.openLoading = false
      })
    },
    axiosRegisterUser () {
      this.openLoading = true
      axios({
        url: URL.registerUser,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      }).then(response => {
        if (response.data.code === 200) {
          Toast.success('注册成功')
          this.$router.push('/')
        } else {
          Toast.fail('注册失败')
          this.openLoading = false
        }
      }).catch((error) => {
        console.log(error.message)
        Toast.fail('注册失败')
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
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 5px auto;
  padding-bottom: 5px;
}
.register-button {
  padding-top: 5px;
}
.sent {
  width: 4.1rem;
  background-color: #bec5ba;
  border: 1px solid #bec5ba;
}
</style>
