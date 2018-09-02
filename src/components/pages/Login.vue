<template>
  <div>
    <van-nav-bar
      title="用户登录"
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
    <div id="c1" style="margin: 0 auto;"></div>
    <div class="register-button">
      <van-button type="primary" size="large" @click="LoginAction" :loading="openLoading">登录</van-button>
    </div>
    <div class="reg-container">
      <span @click="resetPassword" style="color: #41e1db;">
        忘记密码? 立即找回>>
      </span>
      <router-link to="/register">
        没有帐号? 前往注册>>
      </router-link>
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
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      token: '',
      capt: null,
      openLoading: false
    }
  },
  created () {
    if (localStorage.userId) {
      this.$dialog.alert({
        message: '您已经登录'
      }).then(() => {
        this.$router.push('/')
      })
    }
  },
  mounted () {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

    this.capt = window._dx.Captcha(document.getElementById('c1'), {
      appId: 'a324bc0091f1e54023f51aa4f204d9b4',
      width: htmlWidth * 0.96,
      success: (token) => {
        this.token = token
      }
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    LoginAction () {
      this.checkForm() && this.axiosLoginUser()
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
      if (this.token === '') {
        Toast('请完成滑块验证')
        isOk = false
      }
      return isOk
    },
    axiosLoginUser () {
      this.openLoading = true
      axios({
        url: URL.login,
        method: 'post',
        withCredentials: true,
        data: {
          userName: this.username,
          password: this.password,
          token: this.token
        }
      }).then(response => {
        if (response.data.code === 200 && response.data.result) {
          new Promise((resolve, reject) => {
            localStorage.setItem('userId', this.username)
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            Toast.success(response.data.message)
            if (this.$route.query.redirect) {
              this.$router.replace(decodeURIComponent(this.$route.query.redirect))
            } else {
              this.$router.replace('/')
            }
          }).catch(err => {
            this.capt.reload()
            this.token = ''
            Toast('登录状态保存失败')
            console.log(err.message)
          })
        } else {
          this.capt.reload()
          this.token = ''
          Toast(response.data.message)
          this.openLoading = false
        }
      }).catch((error) => {
        console.log(error.message)
        this.capt.reload()
        this.token = ''
        Toast('内部服务器错误')
        this.openLoading = false
      })
    },
    resetPassword () {
      this.$router.push({name: 'Register', params: {reset: true}})
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
.reg-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
  text-align: right;
  font-size: 0.55rem;
}
.reg-container a {
  color: #41e1db;
}
</style>
