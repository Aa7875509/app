var utils = require('./utils')
var webpack = require('webpack')
var path = require('path')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {

  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // copy custom manifest
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/manifest.json'),
        to: config.build.assetsPublicPath,
        ignore: ['.*']
      }
    ]),
    new FriendlyErrorsPlugin()
  ]
})





