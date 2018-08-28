import * as types from '../types'

const state = {
  cartList: {},
  length: 0
}

const getters = {
  cartList: state => state.cartList,
  cartListNum: state => {
    if (state.length === 0) {
      return ''
    }
    return state.length
  }
}

const actions = {
  addCart ({commit}, {goodsId, name, price, image, count}) {
    commit('ADD_CART', {goodsId, name, price, image, count})
  },
  reduceCart ({commit}, {goodsId, price, count}) {
    commit('REDUCE_CART', {goodsId, price, count})
  },
  emptyCart ({commit}) {
    commit('EMPTY_CART')
  },
  updateCart ({commit}, {cartList}) {
    commit(types.UPDATE_CART, {cartList})
  }
}

const mutations = {
  [types.ADD_CART] (state, {goodsId, name, price, image, count}) {
    let cart = state.cartList
    if (!cart[goodsId]) { // 如果该商品，则进行初始化
      cart[goodsId] = {
        goodsId,
        name,
        price,
        image,
        count,
        checked: true,
        delchecked: false
      }
      state.length++
    } else {
      cart[goodsId].count++
    }
    state.cartList = {...cart}
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [types.REDUCE_CART] (state, {goodsId, count}) {
    let cart = state.cartList
    // 修改购物车总价格
    cart[goodsId].count -= count
    if (cart[goodsId].count === 0) {
      delete (cart[goodsId])
      state.length--
    }
    state.cartList = {...cart}
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  [types.UPDATE_CART] (state, {cartList}) {
    let length = 0
    Object.keys(cartList).forEach(() => {
      length++
    })
    state.cartList = {...cartList}
    state.length = length
  },
  [types.EMPTY_CART] (state) {
    state.cartList = {}
    state.length = 0
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
