/**
 * 开发环境配置：能让代码运行即可
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //处理less资源
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      //处理css资源
      /**
       * 样式时并不会输出的，它都在js文件里面，已经跟js融为一体了
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false, //关闭es6module
          outputPath: 'imgs' //让图片资源都打包到imgs文件夹下面
        }
      },
      //处理html中img资源
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      //处理其他资源
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media' //其他资源到media文件夹里面去
        },
      }

    ]
  },
  plugins: [
    //plugins配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 5000,
    open: true
  },
  mode: 'development'
}