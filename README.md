# vue_shangpinhui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### day01
```
1: vue-cli脚手架初始化项目。
node+webpack+淘宝镜像

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置静态资源（图片），需要注意，
放在public文件夹中的静态资源，webpack进行打包的时候会原封不动的打包到dist文件夹中。

src文件夹（程序员源代码文件夹）：
  assets文件夹：一般也是放置静态资源，多个组件共用的图片，webpack打包的时候会把该文件当成一个模块打包到js文件里面

  components文件夹：一般放置一般组件（非路由组件、全局组件）

  App.vue：唯一的根组件

  main.js: 程序入口文件，也是整个程序当中最先执行的文件

babel.config.js: 配置文件（babel相关）

package.json文件：认为项目身份证，记录项目名称，有什么依赖，项目怎么运行。

package-lock.json: 缓存性文件

README.md：说明性的文件


2. 项目的其他配置

2.1 项目运行起来的时候让浏览器自动打开
package.json 加上 --open
 "serve": "vue-cli-service serve --open",

2.2 ESLint校验功能关闭
vue.config.js lintOnSave: false

2.3 src文件夹简写方法，配置别名 @ 代表src文件夹
jsconfig.json 

"paths": {
      "@/*": [
        "src/*"
      ]
    },

3. 项目的路由分析
前端所有的路由 键值对
key ：URL（地址栏中的路径）
value：相应的路由组件
```

## vee-validate
```
只能说这个插件，没有深究，这部分是完全看老师写的然后提示中文没有引用。https://blog.csdn.net/fd2025/article/details/124298824
跟着这位博主做成功了。
```

### 购物车页面
```
存在bug，控制台提示cartlist不存在，因为没有给 || []，新增如果都没购物车内没商品提示购物
v-show
```