const { defineConfig } = require('@vue/cli-service') // 引入必要的模块
const path = require('path') // 引入处理文件路径的模块
const resolve = (dir) => path.join(__dirname, '.', dir) // 定义处理路径的函数，以便后续使用

module.exports = defineConfig(() => {
  // 导出模块
  const port = process.env.VUE_APP_PORT // 定义端口号，可从环境变量中获取

  return {
    transpileDependencies: true, // 是否对依赖进行babel转码
    productionSourceMap: false, // 是否生成sourceMap
    filenameHashing: true, // 开启文件名哈希
    publicPath: './', // 部署应用包时的基本 URL，用于JS/CSS文件的引用路径
    outputDir: 'dist', // 编译输出路径
    assetsDir: 'assets', // 处理静态资源输出的目录
    devServer: {
      // 配置开发服务器
      port: port, // 配置开发服务器端口号
      host: '127.0.0.1', // 配置开发服务器IP地址
      https: false, // 是否启用HTTPS
      open: true, // 是否自动打开浏览器
      hot: true, // 是否启用热重载
      historyApiFallback: true, // 是否启用HTML5 HistoryAPI
      proxy: {
        // 代理服务器配置
        '/': {
          target: 'http://127.0.0.1:8001', // 指定代理服务器地址
          changeOrigin: true, // 是否改变代理请求的源地址
          ws: false, // 是否支持WebSocket
          secure: false, // 是否验证SSL证书
        },
      },
    },
    chainWebpack: (config) => {
      // 配置webpack链式操作
      config.resolve.alias.set('@', resolve('src')) // 配置webpack别名

      config.module // 针对 .less 文件配置 loader，实现自适应REM布局
        .rule('less')
        .oneOf('vue')
        .use('px2rem-loader')
        .loader('px2rem-loader')
        .before('postcss-loader')
        .options({
          remUnit: 192, // 设计稿750px，75=750/10
        })
        .end()

      const oneOfsMap = config.module.rule('less').oneOfs.store
      oneOfsMap.forEach((item) => {
        // 针对 .less 文件配置全局样式变量
        item
          .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({
            patterns: [path.resolve(__dirname, './src/styles/common.less')], // 引入的全局样式变量文件路径
          })
          .end()
      })

      config // 配置应用入口，开启热重载插件
        .entry('app')
        .clear()
        .add('./src/main.js')
        .end()
        .plugin('hmr')
        .use(require('webpack').HotModuleReplacementPlugin)
        .end()
    },
  }
})
