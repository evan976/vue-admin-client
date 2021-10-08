import { get, post } from './http'

// article
export const addArticle = params => post('/article', params)
export const getArticleList = () => get('/article')