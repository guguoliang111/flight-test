'use strict'
const { SYSTEM_NAME, WZW, YXY, XZH } = require('./src/constant')

const name = SYSTEM_NAME

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 10086,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: { // 服务器
        target: 'http://192.168.1.130:8032/soil',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      [process.env.VUE_APP_GEO_SERVER_API]: { // geoserve
        target: 'http://192.168.1.130:8032/geoserve',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_GEO_SERVER_API]: ''
        }
      },
      [WZW]: { // 王正文
        target: 'http://192.168.1.133:9090',
        changeOrigin: true,
        pathRewrite: {
          ['^' + WZW]: ''
        }
      },
      [XZH]: { // 许仲昊
        target: 'http://192.168.1.159:9099',
        changeOrigin: true,
        pathRewrite: {
          ['^' + XZH]: ''
        }
      },
      [YXY]: { // 杨雪洋
        target: 'http://192.168.1.185:9099',
        changeOrigin: true,
        pathRewrite: {
          ['^' + YXY]: ''
        }
      },
      '/shuiba': { // 服务器
        target: 'http://web.atlasinfo.com.cn:8032/geoserver',
        changeOrigin: true,
        pathRewrite: {
          '^/shuiba': ''
        }
      }
    }
  },
  configureWebpack: {
    name
  }
}
