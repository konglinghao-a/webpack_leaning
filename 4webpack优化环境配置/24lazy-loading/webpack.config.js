const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 这个懒加载不是之前图片的那个懒加载，是指js的懒加载，js懒加载就是
 * 触发了一定的条件之后才会懒加载。
 */
module.exports = {

  entry: './src/js/index.js',
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
  ],
  mode: 'production', //js自动压缩
}