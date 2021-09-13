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
      favicon32: 'img/logo.svg',
      favicon16: 'img/logo.svg',
      appleTouchIcon: 'img/logo.svg',
      maskIcon: 'img/logo.svg',
      msTileImage: 'img/logo.svg'
    }
  }
}
