import * as types from './mutation-types'

export default {
  [types.SET_TOKEN](state, token) {
    state.token = token
  }
}