module.exports = {
  lintOnSave: false, // 文件保存时候，就进行eslint规范检测
  devServer: {							// 实时保存、编译的配置段
    open:true,							// 自动开启浏览器
    host: 'localhost',				// 服务主机名地址
    port: 8080,						// 服务运行端口
    proxy: {
      '/pg-service': {
          // target: 'http://imgdt.itfsm03.com/pg-service',
          target: 'http://dmbb.itfsm03.com/pg-service',
          // target: 'http://dmbb.itfsm03.com:8080/pg-service',
          // target: 'http://gwx.itfsm.com/pg-service',
          // target: 'http://localhost:9999/pg-service',
          // target: 'http://47.114.189.79/pg-service',
          // target: 'http://47.114.179.237/pg-service',
          changeOrigin: true,
          pathRewrite: {
              '^/pg-service': ''
          }
      },
    }
  }
}
