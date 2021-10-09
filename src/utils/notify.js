import Vue from 'vue'

export const requestResultNotify = (code, message) => {
  return Vue.prototype.$notify({
    type: code === 1 ? 'success' : 'error',
    title: code === 1 ? '数据请求成功' : '数据请求失败',
    message
  })
}

export const handleResultNotify = (code, message) => {
  return Vue.prototype.$notify({
    type: code === 1 ? 'success' : 'error',
    title: code === 1 ? '操作成功' : '操作失败',
    message
  })
}