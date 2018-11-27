const plugins = []
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  const ZipPlugin = require('zip-webpack-plugin')
  plugins.push(new ZipPlugin({ filename: 'dist.zip', path: '../' }))
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './webpack-report.html',
      openAnalyzer: true
    })
  )
}

module.exports = {
  devServer: {
    https: true,
    disableHostCheck: true
  },

  configureWebpack: {
    plugins
  },

  baseUrl: '.',
  productionSourceMap: true,

  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    panel: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'panel.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    component: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'component.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    mobile: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'mobile.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    config: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'config.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    pay: {
      entry: 'src/pay/pay.ts',
      template: 'public/pay.html',
      filename: 'pay.html',
      title: 'Pay Page',
      chunks: ['chunk-vendors', 'chunk-common', 'pay']
    }
  }
}
