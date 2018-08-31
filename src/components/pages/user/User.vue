<template>
  <div id="user">
    <!-- 登录注册 -->
    <div id="user-info">
      <label class="avatar" for="file">
        <img :src="avatar" :onerror="errorImage" />
        <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
      </label>
      <router-link v-if="!username" class="login" to="/login" tag="span">登录/注册</router-link>
      <span v-else class="username">{{username}}</span>
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
      <div class="about-houhou-01">
        <div class="about-houhou-icon">
          <van-icon name="coupon" />
        </div>
        <div class="about-houhou-text">
          <span>优惠券</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01">
        <div class="about-houhou-icon">
          <van-icon name="phone" />
        </div>
        <div class="about-houhou-text">
          <span>客服电话</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01">
        <div class="about-houhou-icon">
          <van-icon name="gift-card-pay" />
        </div>
        <div class="about-houhou-text">
          <span>福利红包</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="about-houhou-01">
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
import axios from 'axios'
import {URL} from '@/serviceAPI.config.js'
import {Toast} from 'vant'

export default {
  data () {
    return {
      username: null,
      avatar: require('@/assets/images/default-avatar.png'),
      errorImage: 'onerror=null;src="' + require('@/assets/images/img-404.gif') + '"',
      loading: false,
      alertText: '',
      showTip: false,
      myFunList: [],
      myAssetsList: [],
      introList: []
    }
  },
  methods: {
    /* fileUpload(event) {
      this.loading = true;
      let file = event.target.files[0];
      if (file.size > 1024 * 1024 * 3) {    //只能传2M以内照片
        this.alertText = '上传失败，只能传2M以内图片'
        this.showTip = true;
      } else {
        uploadToken().then((response) => {
          if (response.data.status === 200) {
            let data = {token: response.data.uptoken, file}
            upload(data).then((upResponse) => {
              let pic_url = config.domain + upResponse.data.key
              this.avatar = pic_url;
              this.loading = false;
              changeAvatar({pic_url}).then((updateResponse) => {
              })     //更新到数据库
            })
          } else {
            this.alertText = response.data.message
            this.showTip = true;
          }
        })
      }
    },
    routerChange(url) {
      if (this.username) {
        this.$router.push(url);
      } else {
        this.$router.push('/login');
      }
    } */
    editAddress () {
      this.$router.push({name: 'Address', params: {fromUser: true}})
    },
    resetPassword () {
      this.$router.push({name: 'Register', params: {reset: true}})
    },
    logout () {
      if (!localStorage.getItem('userId')) {
        return
      }
      this.$dialog.confirm({
        title: '确认登出',
        message: '确定要退出登录吗?'
      }).then(() => {
        axios({
          url: URL.logout,
          method: 'post',
          withCredentials: true
        }).then(response => {
          if (response.data.code === 200) {
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
    /* this.username = getInfo();
    if (this.username) {
      userInfo().then((response) => {
        this.avatar = response.data.data.avatar;
      })
    } */
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
}
.avatar img {
  width: 100%;
  height: 100%;
}
.login {
  font-size: 0.75rem;
}
.username {
  font-size: 0.75rem;
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
