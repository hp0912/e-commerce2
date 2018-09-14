import {_post} from './index'

export const registerUser = (data) => {
  let req = {
    data,
    url: 'user/register'
  }
  return _post(req)
}

export const sentVerificationCode = (data) => {
  let req = {
    data,
    url: 'user/sentVerificationCode'
  }
  return _post(req)
}

export const login = (data) => {
  let req = {
    data,
    url: 'user/login'
  }
  return _post(req)
}

export const logout = (data) => {
  let req = {
    data,
    url: 'user/logout'
  }
  return _post(req)
}

export const updateUserInfo = (data) => {
  let req = {
    data,
    url: 'user/updateUser'
  }
  return _post(req)
}

export const getUserInfo = (data) => {
  let req = {
    data,
    url: 'user/getUserInfo'
  }
  return _post(req)
}

export const uploadToken = (data) => {
  let req = {
    data,
    url: 'user/uploadtoken'
  }
  return _post(req)
}
