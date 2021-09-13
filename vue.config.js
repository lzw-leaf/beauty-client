module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/api/': {target: 'http://beauty.anshuye.cn'}
    }
  },
  pwa: {
    name: '花棠',
    appleMobileWebAppCapable: 'yes'
  }
}
