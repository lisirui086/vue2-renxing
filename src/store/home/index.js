// 引入api接口
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
// actions: 处理actions，可以书写自己的业务逻辑 也可以处理异步
const actions = {
  // 解决报 commit is not a function 错误 
  async categoryList({commit}) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取轮播图的请求
  async getBannerList({commit}) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor的
  async getFloorList({commit}) {
    let result = await reqFloorList()
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
// mutations: 修改state的唯一手段
const mutations = {
  // 三级联动的
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList.splice(0, 16)
  },
  // 轮播图的
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  // Floor
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
// state: 仓库存储数据的地方
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
// getter: 理解为计算属性 用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

// 对外暴露store类的实例
export default ({
  state,
  mutations,
  actions,
  getters
})
