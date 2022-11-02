// Vue插件一定是一个对象
let myPlugins = {}

myPlugins.install = function (Vue, options) {
  // Vue.prototype.$bus: 任何组件都可以使用
  // Vue.directive 全局自定义事件
  // Vue.component 全局组件
  // Vue.filter...这是过滤器
  Vue.directive(options.name, (element,params) => {
    element.innerHTML = params.value.toUpperCase()
   }
  )
}

// 向外暴露
export default myPlugins