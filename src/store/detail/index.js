// 引入接口
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 引入utils/uuid_token.js 封装临时游客的id
import { getUUID } from "@/utils/uuid_token.js";
// actions 处理actions，可以书写自己的业务逻辑 也可以处理异步
const actions = {
  // 获取产品信息
  async getGoodsInfo({commit},skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) { 
      commit('GETGOODSINFO',result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的解构
    // 加入购物车以后（发请求）。前台将参数带给服务器
    // 服务器写入成功，并没有返回其他数据，只有code200即可
    // 因为服务器没有返回其余的数据，因此我们不需要三连环存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {
      // 返回成功的结果
      return 'ok'
    } else {
      // 返回失败的结果
      return Promise.reject(new Error('faile'))
    }
  }
}
// mutations 修改state的唯一手段
const mutations = {
  GETGOODSINFO(state,goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
// state 仓库存储数据的地方
const state = {
  // 产品详情数据是对象类型的
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
// getters 理解为计算属性 用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  categoryView(state) {
    // goodsInfo 初始值是个空对象 空对象会让categoryName报错
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // skuSaleAttrValueList 产品款式
  skuSaleAttrValueList() {
    return state.goodsInfo.skuInfo.skuSaleAttrValueList || []
  }
}
// 对外暴露
export default ({
  state,
  mutations,
  actions,
  getters
})
