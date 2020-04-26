const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtraPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //'style-loader',
          /**
           * 我们这里需要的操作是，把css整合到js文件里面的时候，打包的时候
           * 再把css抽离出来，而不是创建style标签插入到html中，所以我们这个时候
           * 是不需要style-loader的，需要用MiniCssExtraPlugin.loader来取代这个
           * loader, 作用：提取js中的css文件成单独文件
           */
          MiniCssExtraPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  /**
   * 我们想要在打包的时候把css文件提取出来，不要都挤在js文件里面，
   * 这样的话，打包以后的资源都是由link标签引入而不是通过style标签
   * 引入，这样的话就不会出现闪屏现象（为什么？）。js文件体积更小，
   * 解析速度会更快。
   * 这个时候就要下载：npm i mini-css-extract-plugin -D
   * 
   */
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtraPlugin({
      //对输出的文件进行重命名
      filename: 'css/built.css'
    })
  ],
  mode: 'development'

}