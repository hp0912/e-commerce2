import {_get, _post} from './index'

// 提交订单
export const submitOrder = (data) => {
  let req = {
    data,
    url: 'order/generateOrder'
  }
  return _post(req)
}

// 准备支付
export const initPay = (data) => {
  let req = {
    data,
    url: 'pay/pay'
  }
  return _post(req)
}

// 获取订单信息
export const getOrderInfo = (data) => {
  let req = {
    url: `order/getOrderInfo/${data.orderId}`
  }
  return _get(req)
}

// 获取我的订单
export const orders = (data) => {
  let req = {
    data,
    url: 'v1/orders'
  }
  return _get(req)
}

// 订单评论
export const makeComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  }
  return _post(req)
}
