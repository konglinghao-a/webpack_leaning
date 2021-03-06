const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
/**
 * 多进程打包：让打包的速度更快, 需要下载的包：
 *    npm i thread-loader -D
 * 多进程打包一般给babel-loader用
 */

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
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
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
      {
        oneOf: [
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
          {
            test: /\.js/,
            exclude: /node_modules/,
            use: [
              /**
               * 开启多进程打包
               * 进程开启是有时间的，启动时间大约为600ms，进程通信也有开销。
               * 所以一旦你没有用好，那么时间可能会更慢。只有工作时间消耗
               * 比较长才需要多进程打包。babel-loader是工作时间最长的loader
               * 所以一般在这里用多进程打包
               */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2 //进程2个
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
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
                  ],
                  /**
                   * 开启babel缓存
                   * 第二次构建时才会读取之前的缓存，这样构建速度会更快
                   */
                  cacheDirectory: true
                }
              }
            ],

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
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),

    /**
     * 1、帮助serviceworker快速启动
     * 2、删除旧的serviceworker
     * 
     * 功能：生成一个serviceworkder配置文件，我们后面就要用这个配置文件去注册
     * serviceworker（一般是去入口js文件中做配置）
     */
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode: 'production', //js自动压缩
  devtool: 'source-map'
}