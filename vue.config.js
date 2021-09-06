module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      // '/api/': {
      //   target: 'http://192.168.0.101:8080/',
      //   pathRewrite: {'^/api': ''}
      // }
      '/api/': {
        target: 'http://47.96.86.239:8080/',
        pathRewrite: {'^/api': '/beatuy'}
      }
    }
  }
}
