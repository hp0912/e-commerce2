import {_get, _post, _put} from './index'

// 从购物车减少商品数量
export const reduceShoppingCart = (data) => {
  let req = {
    data,
    url: 'v1/cart'
  }
  return _put(req)
}

// 输入关键词搜索商品
export const searchGoods = (data) => {
  let req = {
    data,
    url: 'goods/searchGoods'
  }
  return _post(req)
}

// 获取商品评论
export const GoodsComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  }
  return _get(req)
}
