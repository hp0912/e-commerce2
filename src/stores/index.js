import Vue from 'vue'
import Vuex from 'vuex'
import address from './modules/address'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    address,
    cart
  }
})
