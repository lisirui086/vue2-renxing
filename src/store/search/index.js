// 引入接口
import { reqGetSearchInfo } from "@/api";
// actions: 处理actions，可以书写自己的业务逻辑 也可以处理异步
const actions = {
    // 获取search模块
    async getSearchList({commit},params={}) {
      // 当前这个reqGetSearchInfo这个函数获取服务器数据的时候至少传递一个参数（空对象）
    let result = await reqGetSearchInfo(params)
      if (result.code == 200) {
        commit('GETSEARCHINFO',result.data)
      }
  }
}

// mutations: 修改state的唯一手段
const mutations = {
  GETSEARCHINFO(state,searchList) {
    state.searchList = searchList
  }
}
// state: 仓库存储数据的地方
const state = {
  searchList: {}
}
// getter: 理解为计算属性 用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
}

// 对外暴露store类的实例
export default ({
  state,
  mutations,
  actions,
  getters
})
