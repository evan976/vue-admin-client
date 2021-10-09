import { setToken, removeToken } from '@/utils/auth'

export default {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },

  removeToken (state) {
    state.token = ''
    removeToken()
  }
}
