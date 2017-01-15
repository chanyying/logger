var webpack = require('webpack')

module.exports = {
  entry: './src/logger.js',
  output: {
    path: 'dist/',  
    filename: '[name].min.js'    
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by shuidihuzhu logger')
  ]
}