import { get, post } from './http'

// user
export const login = params => post('/login', params)
export const getUserInfo = () => get('/users')

// category
export const getCategoryList = () => get('/categories')

// tag
export const getTagList = () => get('/tags')

// option
export const getSiteOptions = () => get('/options')