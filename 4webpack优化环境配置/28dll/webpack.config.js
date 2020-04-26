const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

/**
 * dll动态链接库  作用：dll会对某些库单独地进行打包，将多个库打包成一个chunk。
 * 通常情况下我们会将node_modules的代码打包成一个文件，但是它里面的依赖非常多
 * 如果全部打包到一个文件中会导致文件体积非常大。用了dll技术能将一些库的文件
 * 拆开来打包成不同的文件，这样更有利于性能优化。也就是说，jquery已经打包过了，
 * 重新打包的时候就可以不用考虑这个库了。
 * 
 * 
 */
module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //告诉webpack哪些库不参与打包，同时使用时的名称也得改变。
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    /**
     * 将某个文件打包输出出去，并在html中自动引入该资源, 意思就是说，
     * 原来你单独打包了jquery，但是这个包是没有引入的你用不了。有了下面
     * 这一句那么就会在build文件中引入jquery.js并且把它放到script标签里面
     * 放到html文件中。这是插件自动引入，你手动引入也可以的。
     * 
     */
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],

  mode: 'development'

}