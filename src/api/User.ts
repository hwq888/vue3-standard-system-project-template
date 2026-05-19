import { sysSsoApi } from '@/globalSettings'
import http from '@/assets/js/http'
export default {
  // 登录
  login: function (params: object) {
    return http.post(`${sysSsoApi}/login`, params)
  },
  // 获取用户登录的信息
  getInfo: function () {
    return JSON.parse(localStorage.getItem('userInfo') || '')
  },
  // 删除用户登录的信息
  delInfo: function () {
    localStorage.removeItem('userInfo')
    const date = new Date() // 获取当前时间
    date.setTime(date.getTime() - 10000) // 将date设置为过去的时间
    document.cookie = 'UserLoginToken' + '=v; expires =' + date.toString() // 设置cookie
  },
  // 保存用户登录的信息
  saveInfo: function (data: string) {
    localStorage.setItem('userInfo', data)
  },
  // 修改用户密码
  resetPassWord: function (params: object) {
    return http.post(`${sysSsoApi}/modifyPassword`, params)
  },
  // 根据token获取用户登录信息
  currentUser: function (params: object) {
    return http.post(`${sysSsoApi}/api/oauth/currentUser`, params)
  },
  // 获取用户信息
  getUserProfile: function (params: object) {
    return http.get(`${sysSsoApi}/getUserProfile`, params)
  },
  // 获取用户权限菜单
  getUserMenuList: function (params: object) {
    return http.get(`${sysSsoApi}/qryRightsAfterUserLogin`, params)
  }
}
