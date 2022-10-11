const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // pubulicPath 这是让项目打包后能找到所依赖的js文件
  publicPath:'/',
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:9527'
      }
    }
  },
  chainWebpack:config=>{
    config.module
    .rule('md')
    .test(/\.md$/)
    .use('vue-loader')
    .loader('vue-loader')
    .end()
    .use('vue-markdown-loader')
    .loader('vue-markdown-loader/lib/markdown-compiler')
    .options({
      raw: true
    })
  }
})
