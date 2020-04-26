const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 代码分割的作用：
 */
module.exports = {

  //entry: './src/js/index.js',
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },

  /**
   * 这个配置的作用：
   * 1、单页面文件时，可以将node_modules中代码单独打包一个chunk（如jquery）最终输出。
   * 2、多页面文件时，自动分析多入口chunk中，有没有工共的文件（依赖），可以不重复加
   * 载node_modules里面的代码，比如你的index.js里面引用了jquery,test.js里面也引用了
   * jquery，那么最终只会打包一份jquery。
   */
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