import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'get',
    data
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'delete'
  })
}

export function getInfo() {
  return request({
    url: '/api/user',
    method: 'get'
  })
}

export function saveUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}
