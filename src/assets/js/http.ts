import axios from 'axios'
import { ElMessage } from 'element-plus'
import utils from './utils'
import router from '../../router'

// 设置请求头token
const ajaxToken = function () {
  // const lang = localStorage.lang || 'zh'
  const token = utils.getCookie('UserLoginToken')
  // axios.defaults.headers.common['lang'] = lang
  if (token) {
    axios.defaults.headers.common.Token = token
  }
}

// 超时时间
axios.defaults.timeout = 60000
// http请求拦截器
// axios.interceptors.request.use(config => {
//   ajaxToken()
//   return config
// }, error => {
//   return Promise.reject(error)
// })
// http响应拦截器
axios.interceptors.response.use(
  (data) => {
    // 响应成功关闭loading
    // return data
    const code = data.data.code
    switch (code) {
      case 401:
        ElMessage.error('没有对应权限，请联系管理员')
        break
      case 403:
        // ElMessage.error('token失效，请重新登录')
        router.push('/login')
        break
      case 404:
        ElMessage.error('该请求没有找到指定资源!')
        break
      case 300:
        ElMessage.error('当前网络不给力或该请求无法进行跨域访问!')
        break
      default:
        return data
    }
    return data
  },
  (error) => {
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      // 请求超时处理
      ElMessage.error('服务器繁忙，请稍后再试！')
    } else {
      return Promise.reject(error)
    }
  }
)

const baseUrl = ''
export default {
  get: function (url: string, params: object) {
    ajaxToken()
    return axios.get(baseUrl + url, { params: params }).then((res) => res.data)
  },
  post: function (url: string, params: object, config: object = {}) {
    ajaxToken()
    return axios.post(baseUrl + url, params, config).then((res) => res.data)
  },
  postForm: function (url: string, params: object) {
    ajaxToken()
    return axios({
      url: baseUrl + url,
      method: 'post',
      data: params,
      transformRequest: [
        function (data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => res.data)
  },
  put: function (url: string, params: object) {
    ajaxToken()
    return axios.put(baseUrl + url, params).then((res) => res.data)
  },
  putForm: function (url: string, params: object) {
    ajaxToken()
    return axios({
      url: baseUrl + url,
      method: 'put',
      data: params,
      transformRequest: [
        function (data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => res.data)
  },
  delete: function (url: string, params: object) {
    ajaxToken()
    return axios.delete(baseUrl + url, params).then((res) => res.data)
  },
  deleteForm: function (url: string, params: object) {
    ajaxToken()
    return axios({
      url: url,
      method: 'delete',
      data: params,
      transformRequest: [
        function (data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => res.data)
  }
}
