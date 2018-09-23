import Vue from 'vue'
import Router from 'vue-router'
import {Toast} from 'vant'

const Register = r => require.ensure([], () => r(require('@/components/pages/Register')), 'Register')
const Login = r => require.ensure([], () => r(require('@/components/pages/Login')), 'Login')
const Index = r => require.ensure([], () => r(require('@/components/pages/Index')), 'Index')
const Location = r => require.ensure([], () => r(require('@/components/pages/Location')), 'Location')
const Search = r => require.ensure([], () => r(require('@/components/pages/Search')), 'Search')
const Goods = r => require.ensure([], () => r(require('@/components/pages/Goods')), 'Goods')
const CategoryList = r => require.ensure([], () => r(require('@/components/pages/CategoryList')), 'CategoryList')
const Cart = r => require.ensure([], () => r(require('@/components/pages/Cart')), 'Cart')
const ConfirmOrder = r => require.ensure([], () => r(require('@/components/pages/confirmOrder/ConfirmOrder')), 'ConfirmOrder')
const AddAddress = r => require.ensure([], () => r(require('@/components/pages/confirmOrder/AddAddress')), 'AddAddress')
const Address = r => require.ensure([], () => r(require('@/components/pages/confirmOrder/Address')), 'Address')
const Pay = r => require.ensure([], () => r(require('@/components/pages/Pay')), 'Pay')
const OrderDetail = r => require.ensure([], () => r(require('@/components/pages/order/OrderDetail')), 'OrderDetail')
const User = r => require.ensure([], () => r(require('@/components/pages/user/User')), 'User')
const AboutUs = r => require.ensure([], () => r(require('@/components/pages/user/AboutUs')), 'AboutUs')
const Welfare = r => require.ensure([], () => r(require('@/components/pages/user/Welfare')), 'Welfare')
const CustomerService = r => require.ensure([], () => r(require('@/components/pages/user/CustomerService')), 'CustomerService')
const Popup = r => require.ensure([], () => r(require('@/components/pages/user/Popup')), 'Popup')
const UserSettings = r => require.ensure([], () => r(require('@/components/pages/user/UserSettings')), 'UserSettings')

const OrdersPending = r => require.ensure([], () => r(require('@/components/pages/user/OrdersPending')), 'OrdersPending')
const OrdersPendingPayment = r => require.ensure([], () => r(require('@/components/pages/user/OrdersPendingPayment')), 'OrdersPendingPayment')
const OrdersPendingDeliver = r => require.ensure([], () => r(require('@/components/pages/user/OrdersPendingDeliver')), 'OrdersPendingDeliver')
const OrdersPendingEvaluate = r => require.ensure([], () => r(require('@/components/pages/user/OrdersPendingEvaluate')), 'OrdersPendingEvaluate')
const OrdersAll = r => require.ensure([], () => r(require('@/components/pages/user/OrdersAll')), 'OrdersAll')

const Error = r => require.ensure([], () => r(require('@/components/pages/Error')), 'Error')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {keepAlive: true}
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {keepAlive: true}
    },
    {
      path: '/categoryList',
      name: 'CategoryList',
      component: CategoryList,
      meta: {keepAlive: true}
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder,
      meta: {requireAuth: true}
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {requireAuth: true}
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {requireAuth: true}
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress,
      meta: {requireAuth: true}
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {requireAuth: true}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '/welfare',
      name: 'Welfare',
      component: Welfare
    },
    {
      path: '/customerService',
      name: 'CustomerService',
      component: CustomerService
    },
    {
      path: '/popup',
      name: 'Popup',
      component: Popup,
      meta: {requireAuth: true}
    },
    {
      path: '/userSettings',
      name: 'UserSettings',
      component: UserSettings,
      meta: {requireAuth: true}
    },
    {
      path: '/ordersPendingPayment',
      name: 'OrdersPendingPayment',
      component: OrdersPendingPayment,
      meta: {requireAuth: true}
    },
    {
      path: '/ordersPending',
      name: 'OrdersPending',
      component: OrdersPending,
      meta: {requireAuth: true}
    },
    {
      path: '/ordersPendingDeliver',
      name: 'OrdersPendingDeliver',
      component: OrdersPendingDeliver,
      meta: {requireAuth: true}
    },
    {
      path: '/ordersPendingEvaluate',
      name: 'OrdersPendingEvaluate',
      component: OrdersPendingEvaluate,
      meta: {requireAuth: true}
    },
    {
      path: '/ordersAll',
      name: 'OrdersAll',
      component: OrdersAll,
      meta: {requireAuth: true}
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.userId) {
      next()
    } else {
      Toast('亲, 您还没登录呢~')
      next({path: '/login', query: {redirect: to.fullPath}, replace: false})
    }
  } else {
    next()
  }
})

export default router
