module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/api/': {target: 'http://beauty.anshuye.cn'}
    }
  }
}
