import {_post} from './index'

export const getUserInfo = (data) => {
  let req = {
    data,
    url: 'user/getUserInfo'
  }
  return _post(req)
}
