import {_get} from './index'

// 定位搜索建议
export const suggestion = (data) => {
  let req = {
    data: data
  }
  req.url = 'location/getSuggestion'
  return _get(req)
}

// 定位当前位置
export const location = (data) => {
  let req = {
    data
  }
  req.url = 'location/getLocation'
  return _get(req)
}
