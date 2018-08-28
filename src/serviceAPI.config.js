const PICURL = 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/'
const BASEURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: PICURL + 'index',
  getGoodsInfo: PICURL + 'getGoodsInfo',
  registerUser: BASEURL + 'user/register',
  sentVerificationCode: BASEURL + 'user/sentVerificationCode',
  login: BASEURL + 'user/login',
  getDetailGoodsInfo: BASEURL + 'goods/getDetailGoodsInfo',
  getCategoryList: BASEURL + 'goods/getCategoryList',
  getCategorySubList: BASEURL + 'goods/getCategorySubList',
  getGoodsListByCategorySubID: BASEURL + 'goods/getGoodsListByCategorySubID'
}

export {BASEURL, URL}
