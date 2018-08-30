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
      next({path: '/login', query: {redirect: to.fullPath}})
    }
  } else {
    next()
  }
})

export default router
