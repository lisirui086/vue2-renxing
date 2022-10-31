// 配置路由信息

// 引入路由组件
import Home from '@/views/Home/Home'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Search from '@/views/Search/Search'
import Detail from '@/views/Detail/Detail'
import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess'
import ShopCart from '@/views/ShopCart/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'

export default [
  // 路由重定向
  { path: '/', redirect: '/home' },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: { isShow: true },
  },
  { path: '/login', component: Login, meta: { isShow: true } },
  { path: '/register', component: Register, meta: { isShow: false } },
  // /search/:keyword? 加上问号，代表该参数可传可不传
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { isShow: true },
  },
  {
    name: 'Detail',
    path: '/detail/:skuId',
    component: Detail,
    meta: { isShow: true },
  },
  {
    name: 'AddCartSuccess',
    path: '/addCartSuccess',
    component: AddCartSuccess,
    meta: { isShow: true }
  },
  {
    name: 'ShopCart',
    path: '/shopcart',
    component: ShopCart,
    meta: {isShow: true}
  },
  {
    name: 'Trade',
    path: '/trade',
    component: Trade,
    meta: {isShow: false}
  },
  {
    name: 'Pay',
    path: '/pay',
    component: Pay,
    meta: {isShow: false}
  }
]
