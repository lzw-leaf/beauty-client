module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/api/': 'http://beauty.anshuye.cn'
    }
  }
}
