// 引入api
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api'
// actions
const actions = {
  // 获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data[0].cartInfoList)
    }
  },
  // 删除某一个商品
  async deleteCartBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'deleteCartBySkuId success'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除所有勾选的商品
  deleteAllCheckedCart({ dispatch, state }) {
    // context:小仓库，commit 提交mutations修改state
    // getters 计算属性 dispatch 派发action state当前仓库数据
    // 获取购物车中全部的产品（是一个数组）
    let promiseAll = []
    state.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : ''
      // 将每次返回的promise添加到数组内
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  },
  // 勾选和取消勾选的功能
  async updateCheckedByid({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code == 200) {
      return 'updateCheckedByid success'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 全部勾选或全部取消勾选
  updateAllChecked({ dispatch, state }, AllChecked) {
    let promiseAll = []
    state.cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedByid',{ skuId:item.skuId, isChecked:AllChecked })
      // 将每次返回的promise添加到数组内
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)    // 注意Promise.all的P是大写
  },
}
// mutations
const mutations = {
  GETCARTLIST(state, cartInfoList) {
    state.cartInfoList = cartInfoList
  },
}
// state
const state = {
  cartInfoList: [],
}
// getters
const getters = {}
// 向外暴露
export default {
  actions,
  mutations,
  state,
  getters,
}
