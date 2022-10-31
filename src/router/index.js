import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由配置信息
import routes from './routes.js'
// 引入 stroe 仓库
import store from '@/store'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
  //当前函数this：即为VueRouter类的实例
  //相当于push方法里面this，是windows【完犊子了】
  //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

  //面试:函数apply与call区别?
  //相同的地方:都可以篡改函数里面this
  //不同的地方:apply传递参数 数组  call传递参数 逗号分割

  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //代表真:代表着两个形参接受参数【箭头函数】
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

Vue.use(VueRouter)
// 对外暴露VueRouter类的实例
const router = new VueRouter({
  // 配置路由规则
  routes,
  // 滚动行为 想要页面滚到顶部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})
// 配置路由守卫
// 全局前置守卫 在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  // to 可以获取到你想跳转到哪个路由信息
  // from 可以获取到你从哪个路由而来
  // next 放行函数 next() 放行 next(path)放行到指定路由 next(False)
  // 用户登录了才有token ,没登陆一定没有token
  let token = store.state.user.token
  let nickName = store.state.user.userInfo.nickName
  // 判断用户是否登录
  if (token) {
    // 用户已经登录了还想去login页面 不放行,重新跳转到首页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 登录了，去的不是login 如果有用户名
      if (nickName) {
        next()
      } else {
        // 没有用户信息，派发cation让仓库存储用户信息再跳转
        // 获取用户信息成功 再放行
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了获取不到用户信息 重新登录 清除token  派发action
          await store.dispatch('loginOut')
          next('/login')
        }
      }
    }
  } else {
    // 没有登录 暂时没有优化 后期完善
    next()
    console.log('没登陆');
  }
})

export default router
