// 引入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import cartList from './cartList'
import user from './user'
import trade from './trade'

Vue.use(Vuex)

// 对外暴露store类的实例
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    cartList,
    user,
    trade
  }
})
