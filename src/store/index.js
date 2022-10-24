// 引入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home'
import search from './search'

Vue.use(Vuex)

// 对外暴露store类的实例
export default new Vuex.Store({
  modules: {
    home,
    search
  }
})
