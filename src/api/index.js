import router from '@/router'
import {Toast} from 'vant'

const baseURL = 'https:aoaoaowu.com/'
const axios = require('axios').create({
  baseURL: baseURL,
  // timeout: 2000,
  withCredentials: true, // 允许跨域 cookie
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

axios.interceptors.response.use(data => {
  return data
},
error => {
  if (error.response.status === 401) {
    Toast('亲, 您未登录或登录信息已过期~')
    localStorage.removeItem('userId')
    router.push({path: 'login', query: {redirect: router.currentRoute.fullPath}})
  }
  return Promise.reject(error)
})

// get
export const _get = (req) => {
  return axios.get(req.url, {params: req.data})
}

// post
export const _post = (req) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data})
}

// patch
export const _put = (req) => {
  return axios({method: 'put', url: `/${req.url}`, data: req.data})
}

// delete
export const _delete = (req) => {
  return axios({method: 'delete', url: `/${req.url}`, data: req.data})
}

// post and no withCredentials
export const _postNoWithCredentials = (req) => {
  return axios({method: 'post', url: `/${req.url}`, data: req.data, withCredentials: false})
}
