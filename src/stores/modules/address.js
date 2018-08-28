import * as types from '../types'
import {location} from '@/api/location'

const state = {
  lat: '', // 当前位置纬度
  lng: '', // 当前位置经度
  address: {
    address: '定位中...',
    lat: '',
    lng: ''
  },
  deliveryAddress: {}
}

const getters = {
  address: state => state.address,
  deliveryAddress: state => state.deliveryAddress
}

const actions = {
  clearAddress ({commit}) {
    commit(types.CLEAR_ADDRESS)
  },
  location ({commit}) {
    location().then((response) => {
      if (response.data.status === 200) {
        let data = response.data.data
        commit(types.RECORD_ADDRESS, {address: data.address, ...data.location})
      } else {
        commit(types.FAIL_LOCATION)
      }
    })
  },
  recordAddress ({commit}, address) {
    commit(types.RECORD_ADDRESS, address)
  },
  recodeDeliveryAddress ({commit}, address) {
    commit(types.RECORD_DELIVERY_ADDRESS, address)
  },
  failLocation ({commit}) {
    commit(types.FAIL_LOCATION)
  }
}

const mutations = {
  [types.CLEAR_ADDRESS] (state) {
    let address = {address: '定位中...', lat: '', lng: ''}
    state.address = {...address}
  },
  [types.RECORD_ADDRESS] (state, address) {
    state.address = {...address}
  },
  [types.RECORD_DELIVERY_ADDRESS] (state, address) {
    state.deliveryAddress = {...address}
  },
  [types.FAIL_LOCATION] (state) {
    let address = {address: '定位失败...', lat: '', lng: ''}
    state.address = {...address}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
