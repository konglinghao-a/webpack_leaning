const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * externals作用：防止将有一些包打包到我们最终输出的bundle中，比如说
 * 我们用了jquery依赖，但是我们希望它是由CDN链接引入进来，这个时候我们
 * 就用externals把jquery禁止掉。
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
    })
  ],
  mode: 'production',

  externals: {
    //忽略的库名 ---> npm包名
    //我们忽略掉库名的时候一定要在html中引入CDN链接。
    jquery: 'jQuery'
  }

}