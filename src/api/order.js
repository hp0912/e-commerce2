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

// ajax轮询扫码支付状态
export const queryPayStatus = (data) => {
  let req = {
    data,
    url: 'pay/queryPayStatus'
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

// 待支付
export const pendingPayment = (data) => {
  let req = {
    data,
    url: 'order/pendingPayment'
  }
  return _post(req)
}

// 取消订单
export const cancelOrder = (data) => {
  let req = {
    data,
    url: 'order/cancelOrder'
  }
  return _post(req)
}

// 待收货 等待物流
export const pendingDeliver = (data) => {
  let req = {
    data,
    url: 'order/pendingDeliver'
  }
  return _post(req)
}

// 确认收货
export const confirmReceipt = (data) => {
  let req = {
    data,
    url: 'order/confirmReceipt'
  }
  return _post(req)
}

// 待评价
export const pendingEvaluate = (data) => {
  let req = {
    data,
    url: 'order/pendingEvaluate'
  }
  return _post(req)
}

// 已完成的订单
export const completedOrder = (data) => {
  let req = {
    data,
    url: 'order/completedOrder'
  }
  return _post(req)
}

// 已过期的订单
export const expiredOrder = (data) => {
  let req = {
    data,
    url: 'order/expiredOrder'
  }
  return _post(req)
}

// 订单评论
export const submitComment = (data) => {
  let req = {
    data,
    url: 'order/submitComment'
  }
  return _post(req)
}

// 获取订单数量
export const getQtyOfOrder = (data) => {
  let req = {
    data,
    url: 'order/getQtyOfOrder'
  }
  return _post(req)
}
