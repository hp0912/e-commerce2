import Vue from 'vue'
import Router from 'vue-router'

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
const Error = r => require.ensure([], () => r(require('@/components/pages/Error')), 'Error')

Vue.use(Router)

export default new Router({
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
      component: ConfirmOrder
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
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
