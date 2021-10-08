import axios from 'axios'
import qs from 'qs'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000/api/private/v1'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api/evanone.site'
}

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// TODO: 请求拦截
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// TODO: 响应拦截
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return error
  }
)

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
    .then(res => resolve(res.data))
    .catch(err => reject(err.data))
  })
}

export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}