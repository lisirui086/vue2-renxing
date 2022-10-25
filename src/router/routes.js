// 配置路由信息

// 引入路由组件
import Home from '@/views/Home/Home'
import Login from '@/views/Login/Login'
import Register from '@/views/Register/Register'
import Search from '@/views/Search/Search'
import Detail from '@/views/Detail/Detail'

export default [
  // 路由重定向
  { path: '/', redirect: '/home' },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: { isShow: true },
  },
  { path: '/login', component: Login, meta: { isShow: false } },
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
]
