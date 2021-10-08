import * as types from './mutation-types'

export default {
  tokenAsync({ commit }, { token }) {
    commit(types.SET_TOKEN, token)
  }
}