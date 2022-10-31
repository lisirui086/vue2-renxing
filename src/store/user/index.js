// 登录与注册的仓库 通用
// 引入api
import { reqGetCode, reqRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api'
// 引入token.js
import { setToken, getToken, removeToken } from '@/utils/token'
// 基本配置
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的这个接口，把验证码返回，但正常情况，后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'getCode sussess'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqRegister(user)
    // res.code = 223 已注册
    if (result.code == 200) {
      return 'userRegister success'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 用户登录 [token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // 服务器发过来的token，用户唯一标识符uuid
    // 将来经常通过带token找服务器要用户信息进行展示
    if (result.code == 200) {
      // 用户已经登录成功且获取token
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'userLoign success'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'getUserInfo success'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 退出登录
  async loginOut({ commit }) {
    let result = await reqLoginOut()
    // action里面不能操作state
    if (result.code == 200) {
      commit('CLEARUSERINFO')
      return 'loginOut success'
    } else {
      return Promise.reject(new Error('falie'))
    }
  }
}
const mutations = {
  // 验证码
  GETCODE(state, code) {
    state.code = code
  },
  // token
  USERLOGIN(state, token) {
    state.token = token
  },
  // 获取用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 退出登录后清除用户信息
  CLEARUSERINFO(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const state = {
  code: '', // 验证码
  token: getToken(), // token
  userInfo: {}, // 用户信息
}
const getters = {}
// 对外暴露导出 去store/index引入
export default {
  actions,
  mutations,
  state,
  getters,
}
