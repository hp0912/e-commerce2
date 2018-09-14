<template>
  <div id="user">
    <!-- 登录注册 -->
    <div id="user-info">
      <label class="avatar">
        <img v-if="!userInfo.userName" src="https://img.aoaoaowu.com/images/default-avatar.png" :onerror="errorImage" />
        <img v-else :src="userInfo.avatar" :onerror="errorImage" @click="uploadAvatar" />
        <input v-if="userInfo.userName" id="file" type="file" @change="fileUpload($event)" style="display: none;">
      </label>
      <router-link v-if="!userInfo.userName" class="login" to="/login" tag="span">登录/注册</router-link>
      <div v-else class="username">
        <span>{{ userInfo.nickname }}</span>
        <van-icon name="setting" style="font-size: 1.2rem;" @click="setting"/>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-container">
      <div class="my-order">
        <span class="my-order-01">我的订单</span>
        <span class="my-order-02">查看全部订单</span>
      </div>
      <div class="my-order-category">
        <div class="order-category">
          <div class="order-category-icon">
            <van-icon name="pending-payment" />
          </div>
          <div class="order-category-text">待付款</div>
        </div>
        <div class="order-category">
          <div class="order-category-icon">
            <van-icon name="pending-orders" />
          </div>
          <div class="order-category-text">待发货</div>
        </div>
        <div class="order-category">
          <div class="order-category-icon">
            <van-icon name="pending-deliver" />
          </div>
          <div class="order-category-text">待收货</div>
        </div>
        <div class="order-category">
          <div class="order-category-icon">
            <van-icon name="pending-evaluate" />
          </div>
          <div class="order-category-text">待评价</div>
        </div>
      </div>
    </div>
    <!-- 平台信息 -->
    <div class="about-houhou">
      <div class="about-houhou-01" @click="popup">
        <div class="about-houhou-icon">
          <van-icon name="coupon" />
        </div>
        <div class="about-houhou-text">
          <span>优惠券</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01" @click="customerService">
        <div class="about-houhou-icon">
          <van-icon name="phone" />
        </div>
        <div class="about-houhou-text">
          <span>客服电话</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01" @click="welfare">
        <div class="about-houhou-icon">
          <van-icon name="gift-card-pay" />
        </div>
        <div class="about-houhou-text">
          <span>福利红包</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01" @click="aboutUs">
        <div class="about-houhou-icon">
          <van-icon name="description" />
        </div>
        <div class="about-houhou-text" style="border-bottom: none;">
          <span>关于我们</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="about-houhou" style="margin-bottom: 0;">
      <div class="about-houhou-01" @click="editAddress">
        <div class="about-houhou-icon">
          <van-icon name="location" />
        </div>
        <div class="about-houhou-text">
          <span>地址管理</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01" @click="resetPassword">
        <div class="about-houhou-icon">
          <van-icon name="edit-data" />
        </div>
        <div class="about-houhou-text">
          <span>修改密码</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01" @click="logout">
        <div class="about-houhou-icon">
          <van-icon name="close" />
        </div>
        <div class="about-houhou-text">
          <span>退出登录</span>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
// import {userInfo, changeAvatar} from '@/api/user'
// import {getInfo} from '@/utils/auth'
// import {uploadToken, upload} from '@/api/upload'
// import config from '@/config'
import {logout} from '@/api/user'
import {Toast} from 'vant'
import {mapGetters} from 'vuex'
import {uploadToken} from '@/api/user.js'

export default {
  data () {
    return {
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    uploadAvatar () {
      document.getElementById('file').click()
    },
    fileUpload (event) {
      let file = event.target.files[0]
      if (!file) {
        return
      }
      if (file.size > 1024 * 1024 * 2) {
        Toast('上传失败，只能传2M以内图片')
      } else {
        uploadToken().then((response) => {
        //   if (response.data.status === 200) {
        //     let data = {token: response.data.uptoken, file}
        //     upload(data).then((upResponse) => {
        //       let pic_url = config.domain + upResponse.data.key
        //       this.avatar = pic_url;
        //       this.loading = false;
        //       changeAvatar({pic_url}).then((updateResponse) => {
        //       })     //更新到数据库
        //     })
        //   } else {
        //     this.alertText = response.data.message
        //     this.showTip = true;
        //   }
        })
      }
    },
    setting () {
      this.$router.push({name: 'UserSettings'})
    },
    popup () {
      this.$router.push({name: 'Popup'})
    },
    customerService () {
      this.$router.push({name: 'CustomerService'})
    },
    welfare () {
      this.$router.push({name: 'Welfare'})
    },
    aboutUs () {
      this.$router.push({name: 'AboutUs'})
    },
    editAddress () {
      this.$router.push({name: 'Address', params: {fromUser: true}})
    },
    resetPassword () {
      this.$router.push({name: 'Register', params: {reset: true}})
    },
    logout () {
      if (!localStorage.getItem('userId')) {
        Toast('亲, 您还未曾登录~')
        return
      }
      this.$dialog.confirm({
        title: '确认登出',
        message: '确定要退出登录吗?'
      }).then(() => {
        logout({}).then(response => {
          if (response.data.code === 200) {
            this.$store.dispatch('updateUserInfo', {})
            localStorage.removeItem('userId')
            Toast('已登出')
          } else {
            Toast('服务器内部错误, 请联系管理员')
          }
        }).catch(() => {
          Toast('服务器内部错误, 请联系管理员')
        })
      }).catch(() => {
        console.log('取消登出')
      })
    }
  },
  mounted () {
    if (!this.userInfo.userName) {
      this.$store.dispatch('getUserInfo')
    }
  }
}
</script>

<style scoped>
#user {
  height: 100%;
  background: rgb(244, 244, 244);
}
#user-info {
  color: #000;
  display: flex;
  align-items: center;
  background: #fff;
  height: 5.2rem;
  background-color: #ededed
}
.avatar {
  width: 3rem;
  height: 3rem;
  text-align: center;
  margin: 0 0.8rem;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #333;
  font-size: 0;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.login {
  font-size: 0.75rem;
}
.username {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding-right: 0.5rem;
}
.order-container {
  margin-top: 0.6rem;
  background: #fff;
}
.my-order {
  margin-left: 3px;
  margin-right: 3px;
  padding: 0.5rem 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d5d5d5;
}
.my-order-01, .my-order-02 {
  font-size: 0.75rem;
}
.my-order-01 {
  color: #4b4b4b;
}
.my-order-02 {
  color: grey;
}
.my-order-category {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  color: grey;
}
.order-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.order-category-icon {
  font-size: 1.4rem;
}
.order-category-text {
  font-size: 0.7rem;
}
.about-houhou {
  background: #fff;
  margin: 0.6rem 0;
}
.about-houhou-01 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0 0.2rem;
}
.about-houhou-icon {
  padding: 0.6rem 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #585858;
}
.about-houhou-text {
  padding: 0.5rem 0;
  flex: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  font-size: 0.8rem;
  color: #585858;
  border-bottom: 1px solid rgb(244, 244, 244);
}
</style>
