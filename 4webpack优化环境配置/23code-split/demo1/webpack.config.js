const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 代码分割的作用：
 */
module.exports = {
  /**
   * 多入口（对应多页面应用），之前的写法是单入口（对应单页面应用）
   * 多入口：有几个入口，最终输出就有几个bundle（这是多页面应用代码分割的第一种方式）
   * 缺点：可能我要分割的代码要发生变化。那么每次都要entry入口里面改了，这样不是很好/
   */
  entry: {
    main: './src/js/index.js',
    test: './src/js/test.js' //这个时候index.js中就不需要引入test.js了
  },
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
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