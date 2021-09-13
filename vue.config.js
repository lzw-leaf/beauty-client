module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/api/': {target: 'http://beauty.anshuye.cn'}
    }
  },
  pwa: {
    name: '花棠',
    themeColor: 'transparent',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'img/logo.png',
      favicon16: 'img/logo.png',
      appleTouchIcon: 'img/logo.png',
      maskIcon: 'img/logo.png',
      msTileImage: 'img/logo.png'
    }
  }
}
