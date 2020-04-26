const {resolve} = require('path')
const webpack = require('webpack')
/**
 * 使用dll技术对某些库(第三方库：jquery, react, vue )进行单独打包
 *  当你运行webpack时，默认查找webpack.config.js配置文件
 *  需求：需要运行webpack.dll.js文件
 *     ---> webpack --config webpack.dll.js (不要运行webpack.config.js了，运行webpack.dll.js)
 * 这样将来jquery就不用再打包了，直接引入就行了。
 */
module.exports = {
  entry: {
    //最终打包生成的[name] --->是jquery
    //['jquery'] ---> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', //打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --->提供和jquery映射，这样我们将来知道jquery是不需要打包的
    new webpack.DllPlugin({
      name: '[name]_[hash]', //映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') //输出文件路径
    })
  ],
  mode: 'production'
}