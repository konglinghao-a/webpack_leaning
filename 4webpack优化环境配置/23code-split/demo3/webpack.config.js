const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 希望将test文件也单独打包（不想用多入口的方式），那么就可以通过js代码，让某个
 * 文件单独打包成一个chunk
 */
module.exports = {

  entry: './src/js/index.js',
  // entry: {
  //   main: './src/js/index.js',
  //   test: './src/js/test.js'
  // },
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