import { get, post, put, remove } from './http'

// user
export const login = user => post('/login', user)
export const getUserInfo = () => get('/users')
export const updateUserInfo = user => put('/users', user)

// category
export const getCategoryList = () => get('/categories')
export const createCategory = category => post('/categories', category)
export const updateCategory = category => put('/categories', category)
export const removeCategory = id => remove('/categories', id)

// tag
export const getTagList = () => get('/tags')
export const getTag = id => get(`/tags/${id}`)
export const createTag = tag => post('/tags', tag)
export const updateTag = (id, tag) => put(`/tags/${id}`, tag)
export const removeTag = id => remove(`/tags/${id}`)

// article
export const getArticleList = () => get('/articles')

// option
export const getSiteOptions = () => get('/options')
export const updateSiteOptions = options => put('/options', options)

// file
export const getImageList = () => get('/images/list')
export const uploadImage = () => post('/images/upload')
export const removeImage = key => remove(`/images/delete/${key}`)