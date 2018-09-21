import {_get, _post, _put} from './index'

// 从购物车减少商品数量
export const reduceShoppingCart = (data) => {
  let req = {
    data,
    url: 'v1/cart'
  }
  return _put(req)
}

export const getIndexGoodsInfo = (data) => {
  let req = {
    data,
    url: 'goods/getIndexGoodsInfo'
  }
  return _post(req)
}

export const getDetailGoodsInfo = (data) => {
  let req = {
    data,
    url: 'goods/getDetailGoodsInfo'
  }
  return _post(req)
}

// 获取商品评价
export const getGoodsComments = (data) => {
  let req = {
    data,
    url: 'goods/getGoodsComments'
  }
  return _post(req)
}

export const getCategoryList = (data) => {
  let req = {
    data,
    url: 'goods/getCategoryList'
  }
  return _get(req)
}

export const getCategorySubList = (data) => {
  let req = {
    data,
    url: 'goods/getCategorySubList'
  }
  return _post(req)
}

export const getGoodsListByCategorySubID = (data) => {
  let req = {
    data,
    url: 'goods/getGoodsListByCategorySubID'
  }
  return _post(req)
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
