const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * loader: 1、下载  2、使用（配置loader）
 * plugins: 1、下载  2、引入  3、使用
 * 
 *    打包html需要引入的包： npm i html-webpack-plugin -D
 */
module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {

      },
    ]
  },
  
  plugins: [
    /**
     * html-webpack-plugin
     * 功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（js/css）
     * 需求：需要有结构的html文件（加配置选项）
     */
    new HtmlWebpackPlugin({
      //复制./src/index.html'文件，并自动引入打包输出的所有资源
      template: './src/index.html'
    })
  ],

  mode: 'development'

}