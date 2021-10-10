import { getItem } from '@/utils/auth'

export default {
  token: getItem('token') ? getItem('token') : ''
}