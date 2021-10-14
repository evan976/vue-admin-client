import { get, post, put, remove } from './http'

// user
export const login = user => post('/login', user)
export const register = user => post('/register', user)
export const getUserInfo = () => get('/users')
export const updateUserInfo = user => put('/users', user)

// category
export const getCategoryList = params => get('/categories', params)
export const getCategory = id => get(`/categories/${id}`)
export const createCategory = category => post('/categories', category)
export const updateCategory = (id, category) => put(`/categories/${id}`, category)
export const removeCategory = id => remove(`/categories/${id}`)

// tag
export const getTagList = () => get('/tags')
export const getTag = id => get(`/tags/${id}`)
export const createTag = tag => post('/tags', tag)
export const updateTag = (id, tag) => put(`/tags/${id}`, tag)
export const removeTag = id => remove(`/tags/${id}`)

// article
export const getArticleList = params => get('/articles', params)
export const getArticle = id => get(`/articles/${id}`)
export const createArticle = article => post('/articles', article)
export const updateArticle = (id, article) => put(`/articles/${id}`, article)
export const removeArticle = id => remove(`/articles/${id}`)

// option
export const getSiteOptions = () => get('/options')
export const updateSiteOptions = options => put('/options', options)

// file
export const getImageList = () => get('/qiniu')
export const uploadImage = () => post('/qiniu/upload')
export const removeImage = key => remove(`/qiniu/${key}`)