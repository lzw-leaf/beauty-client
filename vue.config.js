module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      // '/api/': {
      //   target: 'http://192.168.0.101:8080/',
      //   pathRewrite: {'^/api': ''}
      // }
      '/api/': {
        target: 'http://beauty.anshuye.cn/',
        pathRewrite: {'^/api': '/beauty'}
      }
    }
  }
}
