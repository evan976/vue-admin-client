import { getToken } from '@/utils/auth'

export default {
  token: getToken() ? getToken() : ''
}