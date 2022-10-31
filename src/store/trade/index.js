// 引入api
import { reqFindUserAddressList, reqOrderInfo } from "@/api";
// 
const actions = {
  // 获取用户收货地址信息
  async getUserAddress({ commit }) {
    let result = await reqFindUserAddressList()
    if (result.code == 200) {
      commit('GETUSERADDRESS',result.data)
    }
  },
  // 获取商品清单
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    if (result.code == 200) {
      commit('GETORDERINFO',result.data)
    }
  }
}
const mutations = {
  // 用户收货信息
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  // 商品清单
  GETORDERINFO(state,orderInfo) {
    state.orderInfo = orderInfo
  }
}
const state = {
  address: [],
  orderInfo: {}
}
const getters = {}
// 向外暴露 去store/index.js
export default ({
  actions,
  mutations,
  state,
  getters
})