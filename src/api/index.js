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
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'POST', data: params })
// views/Detail/detail 获取产品详细信息的接口 URL: /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// views/Detail/detail 7. 添加到购物车(对已有物品进行数量改动)
// URL: /api/cart / addToCart / { skuId } / { skuNum } post请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表
export const reqCartList = () => requests({url: '/cart/cartList',method: 'get'})
//  删除购物车商品 /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 勾选和取消切换功能
// /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqUpdateCheckedByid = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method: 'get'})
