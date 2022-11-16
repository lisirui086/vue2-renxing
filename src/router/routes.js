// 配置路由信息

// 引入路由组件
import Home from '@/views/Home/Home'
// 替换成了路由懒加载
/* import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Search from '@/views/Search/Search'  */
import Detail from '@/views/Detail/Detail'
import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess'
import ShopCart from '@/views/ShopCart/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'

export default [
  // 路由重定向
  { path: '/', redirect: '/home' },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: { isShow: true },
  },
  { path: '/login', component: () => import('@/views/Login'), meta: { isShow: false } },
  { path: '/register', component: () => import('@/views/Register'), meta: { isShow: false } },
  // /search/:keyword? 加上问号，代表该参数可传可不传
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search/Search.vue'),
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
    meta: { isShow: true }
  },
  {
    name: 'Trade',
    path: '/trade',
    component: Trade,
    meta: { isShow: false },
    // 路由独享的守卫 不能让用户在地址栏输入路径直接进这，必须从购物车点结算后才可以
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        // 其他路由组件而来的停留在当前
        next(false)
      }
    }
  },
  {
    name: 'Pay',
    path: '/pay',
    component: Pay,
    meta: { isShow: false },
    // 必须从Trade才能进入 这里我用路由配置信息的name
    beforeEnter: (to, from, next) => {
      if (from.name == 'Trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 结算成功也可以用路由独享的守卫，但是我们选择组件内路由守卫为了多练习一下
  {
    name: 'PaySuccess',
    path: '/paysucces',
    component: PaySuccess,
    meta: {isShow:false}
  },
  {
    name: 'Center',
    path: '/center',
    component: Center,
    meta: { isShow: false },
    children: [
  // 默认子路由 如果children数组中，某个路由规则的path值为空字符串，则这条路由规则叫默认子路由
      // { path: '', component: MyOrder },
      { path: '/center', redirect: '/center/myorder' },
      { path: 'myorder', component: MyOrder },
      { path: 'grouporder', component: GroupOrder }
    ]
  },
  // 组件高级通信 这里都是用懒加载
  {
    path: '/communication',
    component: () => import('@/views/Communication'),
    children: [
      { path: 'attrslisteners',component:() => import('@/views/Communication/AttrsListeners') },
      { path: 'childrenparent', component: () => import('@/views/Communication/ChildrenParent') },
      { path: 'eventtest', component: () => import('@/views/Communication/EventTest') },
      { path: 'modeltest', component: () => import('@/views/Communication/ModelTest') },
      { path: 'scopeslot', component: () => import('@/views/Communication/ScopeSlot') },
      { path: 'synctest', component: () => import('@/views/Communication/SyncTest') },
    ]
  }
]
