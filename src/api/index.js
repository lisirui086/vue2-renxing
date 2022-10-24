// 当前这个模块，API统一管理
// 这是真实数据的接口
import requests from './request'
// 这是mock数据的接口
import mockRequests from './mockAjax'
// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// views/Home/ListContainer 的轮播图
export const reqGetBannerList = () => mockRequests.get('/banner')
// views/Home/floor 
export const reqFloorList = ()=> mockRequests({url:'/floor',method:'get'});
// views/search/search
export const reqGetSearchInfo = (params) => requests({url:'/list', method:'POST', data:params})
