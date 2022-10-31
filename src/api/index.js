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
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 注册通过手机号发送验证码
// /api/user/passport/sendCode/{phone} （2022/10/30前改的） get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method: 'get'})
// 注册用户 /api/user/passport/register POST 这里的data是数据对象例如手机号，密码验证码这些
export const reqRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data })
// 登录 /api/user/passport/login post
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', method: 'post', data })
//  获取用户信息 【需要带着用户的token向服务器要用户信息
// /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录 /api/user/passport/logout get
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqFindUserAddressList = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取订单交易页信息 /api/order/auth/trade get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} POST
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
// 通过订单编号获取支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
