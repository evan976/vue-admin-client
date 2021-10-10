import { setItem, removeItem } from '@/utils/auth'

export default {
  setToken (state, token) {
    state.token = token
    setItem('token', token)
  },

  removeToken (state) {
    state.token = ''
    removeItem('token')
  }
}
