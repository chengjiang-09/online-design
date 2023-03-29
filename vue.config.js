const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir)

module.exports = defineConfig(() => {
  const port = process.env.VUE_APP_PORT

  return {
    transpileDependencies: true,
    productionSourceMap: false,
    filenameHashing: true,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
      port: port,
      host: '127.0.0.1',
      https: false,
      open: true,
      proxy: {
        '/': {
          target: 'http://127.0.0.1:8001',
          changeOrigin: true,
          ws: false,
          secure: false,
        },
      },
    },
    chainWebpack: (config) => {
      config.resolve.alias.set('@', resolve('src'))

      config.module
        .rule('less')
        .oneOf('vue')
        .use('px2rem-loader')
        .loader('px2rem-loader')
        .before('postcss-loader')
        .options({
          remUnit: 192,
        })
        .end()

      const oneOfsMap = config.module.rule('less').oneOfs.store
      oneOfsMap.forEach((item) => {
        item
          .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({
            patterns: [path.resolve(__dirname, './src/styles/common.less')],
          })
          .end()
      })
    },
  }
})
