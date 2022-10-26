// 引入api
import { reqCartList } from '@/api'
// actions
const actions = {
  async getCartList({commit}) {
    let result = await reqCartList()
    console.log(result.data)
  }
}
// mutations
const mutations = {}
// state 
const state = {}
// getters
const getters = {}
// 向外暴露
export default ({
  actions,
  mutations,
  state,
  getters
})