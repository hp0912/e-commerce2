<template>
  <div id="user">
    <!-- 登录注册 -->
    <div id="user-info">
      <label class="avatar">
        <img v-if="!userInfo.userName" src="https://img.aoaoaowu.com/images/default-avatar.png" :onerror="errorImage" />
        <img v-else :src="userInfo.avatar" :onerror="errorImage" @click="uploadAvatar" />
        <input v-if="userInfo.userName" id="file" type="file" @change="fileUpload($event)" style="display: none;">
      </label>
      <span v-if="!userInfo.userName" class="login" @click="login">登录/注册</span>
      <div v-else class="username">
        <span class="nickname">{{ userInfo.nickname }}</span>
        <van-icon name="setting" style="font-size: 1.2rem;" @click="setting"/>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="order-container">
      <div class="my-order">
        <span class="my-order-01">我的订单</span>
        <span class="my-order-02" @click="ordersAll">查看全部订单</span>
      </div>
      <div class="my-order-category">
        <div class="order-category" @click="ordersPendingPayment">
          <div class="order-category-icon">
            <van-icon name="pending-payment" />
            <div class="order-category-info">{{ userInfo.orderCount1 ? userInfo.orderCount1 : ''}}</div>
          </div>
          <div class="order-category-text">待付款</div>
        </div>
        <div class="order-category" @click="ordersPending">
          <div class="order-category-icon">
            <van-icon name="pending-orders" />
            <div class="order-category-info">{{ userInfo.orderCount2 ? userInfo.orderCount2 : ''}}</div>
          </div>
          <div class="order-category-text">待发货</div>
        </div>
        <div class="order-category" @click="ordersPendingDeliver">
          <div class="order-category-icon">
            <van-icon name="pending-deliver" />
            <div class="order-category-info">{{ userInfo.orderCount3 ? userInfo.orderCount3 : ''}}</div>
          </div>
          <div class="order-category-text">待收货</div>
        </div>
        <div class="order-category" @click="ordersPendingEvaluate">
          <div class="order-category-icon">
            <van-icon name="pending-evaluate" />
            <div class="order-category-info">{{ userInfo.orderCount4 ? userInfo.orderCount4 : ''}}</div>
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
import {Toast} from 'vant'
import {mapGetters} from 'vuex'
import {logout, uploadToken, changeAvatar} from '@/api/user.js'
import {getQtyOfOrder} from '@/api/order.js'
import COS from 'cos-js-sdk-v5'

export default {
  data () {
    return {
      errorImage: 'onerror=null;src="https://img.aoaoaowu.com/images/img-404.gif"',
      cos: new COS({
        getAuthorization (options, callback) {
          uploadToken().then((response) => {
            if (response.data.status === 200) {
              // eslint-disable-next-line
              callback({TmpSecretId: response.data.tempKeys.credentials.tmpSecretId, TmpSecretKey: response.data.tempKeys.credentials.tmpSecretKey, XCosSecurityToken: response.data.tempKeys.credentials.sessionToken, ExpiredTime: response.data.tempKeys.expiredTime})
            } else {
              // eslint-disable-next-line
              callback({TmpSecretId: '', TmpSecretKey: '', XCosSecurityToken: '', ExpiredTime: ''})
            }
          })
        }
      })
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
      let extension
      if (!file) {
        return
      } else {
        extension = file.name.substr(file.name.lastIndexOf('.'))
        if (!(extension === '.jpg' || extension === '.jpeg' || extension === '.png' || extension === '.webp')) {
          Toast('图片格式必须是jpg,jpeg,png,webp。')
          return
        }
      }
      if (file.size > 1024 * 1024 * 2) {
        Toast('上传失败，只能传2M以内图片')
      } else {
        const toast = Toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '上传准备中'
        })
        this.cos.sliceUploadFile({
          Bucket: 'aoaoaowu-1256901433',
          Region: 'ap-guangzhou',
          Key: 'ECUserAvatar/avatar' + this.userInfo.userName + (new Date().getTime()) + extension,
          Body: file,
          onHashProgress (progressData) {
            toast.message = '校验中'
            console.log('校验中', JSON.stringify(progressData))
          },
          onProgress (progressData) {
            toast.message = '上传中(' + (progressData.percent * 100) + '%)'
          }
        }, (err, data) => {
          toast.message = '上传成功'
          if (err) {
            toast.message = '上传失败'
            toast.clear()
          } else {
            toast.message = '信息更新中'
            changeAvatar({avatar: data.Key}).then((response) => {
              toast.clear()
              if (response.data.status === 200) {
                let user = {}
                Object.assign(user, this.userInfo, {avatar: response.data.data.url})
                this.$store.dispatch('updateUserInfo', user)
                Toast(response.data.message)
              } else {
                Toast(response.data.message)
              }
            }).catch(() => {
              toast.clear()
              Toast('更换头像失败')
            })
          }
        })
      }
    },
    ordersAll () {
      this.$router.push({name: 'OrdersAll'})
    },
    ordersPendingPayment () {
      this.$router.push({name: 'OrdersPendingPayment'})
    },
    ordersPending () {
      this.$router.push({name: 'OrdersPending'})
    },
    ordersPendingDeliver () {
      this.$router.push({name: 'OrdersPendingDeliver'})
    },
    ordersPendingEvaluate () {
      this.$router.push({name: 'OrdersPendingEvaluate'})
    },
    login () {
      localStorage.removeItem('userId')
      this.$router.push({name: 'Login'})
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
            Toast('已退出登录')
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
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      getQtyOfOrder({}).then(response => {
        if (response.data.status === 200) {
          let orderCount = response.data.data
          let user = {}
          Object.assign(user, vm.userInfo, {
            orderCount1: orderCount.count1,
            orderCount2: orderCount.count2,
            orderCount3: orderCount.count3,
            orderCount4: orderCount.count4
          })
          vm.$store.dispatch('updateUserInfo', user)
        } else {
          Toast(response.data.message)
        }
      }).catch((error) => {
        Toast(error.message)
      })
    })
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
.nickname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  position: relative;
}
.order-category-info {
  color: #fff;
  left: 100%;
  top: -.5em;
  font-size: .5em;
  padding: 0 .3em;
  text-align: center;
  min-width: 1.2em;
  line-height: 1.2;
  position: absolute;
  border-radius: .6em;
  box-sizing: border-box;
  background-color: #f44;
  transform: translateX(-50%);
  font-family: PingFang SC,Helvetica Neue,Arial,sans-serif;
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
