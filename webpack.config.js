var webpack = require('webpack')

module.exports = {
  entry: './logger.js',
  output: {
    path: 'dist/',  
    filename: 'logger.min.js'    
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        loader: "babel",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by shuidihuzhu logger'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}