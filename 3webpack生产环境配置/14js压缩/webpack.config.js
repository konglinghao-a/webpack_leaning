const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
    
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  /**
   * 生产环境下自动压缩js代码。
   * 生产环境下会自动启用很多插件，其中的uglifyJsPlugin就是用来压缩js代码的。
   */
  mode: 'production'

}