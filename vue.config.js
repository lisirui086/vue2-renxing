const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 忽略map文件 map加密可以告诉我们哪一行代码出错
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  // 开启代理
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '任真美好线上商城'
      return args
    })
  },
})
