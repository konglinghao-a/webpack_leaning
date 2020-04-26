const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin  = require('optimize-css-assets-webpack-plugin');

//设置nodejs的环境变量, 是postcss给css设置兼容的时候按照开发环境来兼容
process.env.NODE_ENV = 'development';

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
          MiniCssExtraPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtraPlugin({
      filename: 'css/built.css'
    }),
    //这个插件的作用就是用来压缩css文件，css文件会被压缩成一行
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'

}