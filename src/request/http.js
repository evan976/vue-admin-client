import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { showLoading, hideLoading } from '../utils/loading'


if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000/api/private/v1'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.evanone.site'
}

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  config => {
    showLoading()
    const token = store.state.token
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  res => {
    hideLoading()
    if (res.status === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  err => {
    if (err.response.status === 1) {
      Vue.prototype.$notify({
        title: '请求失败',
        message: err.response.data.message,
        type: 'error'
      })
    }
    return err
  }
)

export const get = (url, params = {}) => {
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

export const put = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(params))
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}

export const remove = url => {
  return new Promise((resolve, reject) => {
    axios.delete(url)
      .then(res => resolve(res.data))
      .catch(err => reject(err.data))
  })
}