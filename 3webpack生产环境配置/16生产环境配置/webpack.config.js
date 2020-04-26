const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


//复用loader
const commenCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    //还需要再package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //处理css文件
      {
        test: /\.css/,
        use: [...commenCssLoader]
      },
      //处理less文件
      {
        test: /\.less/,
        use: [
          ...commenCssLoader,
          //执行完less-loader以后它就是css文件了，这时候做兼容性处理
          'less-loader'
        ]
      },
      /**
       * 正常来讲，一个文件只能被一个loader处理，
       * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序。
       * 比如下面的，都针对js代码，先执行eslint，在执行babel。因为如果eslint
       * 报错了的话下面babel转码就没有意义了。
       * 
       */


      //处理js的语法检查
      {
        //在package.json中eslintConfig配置来告诉你用什么规则---> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        //优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      //js的兼容性处理
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            //这里的语法为什么一层数组套一层数组？
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3
                },
                targets: { //指示兼容到何种浏览器
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false

        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      //其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production' //js自动压缩
}