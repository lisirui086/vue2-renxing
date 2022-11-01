import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'
// 注册全局组件 三级联动组件
import TypeNav from '@/components/TypeNav/TypeNav'
// 注册全局组件 轮播图
import Carousel from '@/components/Carousel/Carousel'
// 注册全局主键 分页
import Pagination from '@/components/Pagination/Pagination'
// 引入mockServer.js --- mock数据
import '@/mock/mockServer.js'
// 引入swiper
import 'swiper/css/swiper.min.css' // 注意这里的引入
// 统一引入 统一接口api文件夹里面的全部请求函数 不使用vuex管理的方法
import * as API from '@/api'
// 按需引入element ui 
import { Button,MessageBox } from 'element-ui'
// 挂载element ui组件
Vue.use(Button)
// element ui挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// 测试

// 第一个参数 ：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
// 第一个参数 ：全局组件的名字，第二个参数：哪一个组件
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false


new Vue({
  render: (h) => h(App),
  router,
  store,
  // 1. 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
