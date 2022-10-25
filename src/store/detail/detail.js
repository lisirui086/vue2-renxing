// 引入接口
import { reqGoodsInfo } from "@/api";
// actions 处理actions，可以书写自己的业务逻辑 也可以处理异步
const actions = {
  // 获取产品信息
  async getGoodsInfo({commit},sukId) {
    let result = await reqGoodsInfo(sukId)
    if (result.code == 200) {
      commit('GETGOODSINFO',result.data)
    }
  }
}
// mutaitions 修改state的唯一手段
const mutaitions = {
  GETGOODSINFO(state,goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
// state 仓库存储数据的地方
const state = {
  // 产品详情数据是对象类型的
  goodsInfo: {}
}
// getters 理解为计算属性 用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}
// 对外暴露
export default ({
  actions,
  mutaitions,
  state,
  getters
})
