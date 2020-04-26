const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
/**
 * 缓存：
 *    babel缓存
 *      cacheDirectory: true
 *      作用：让第二次打包构建速度更快
 *    文件资源缓存
 *      hash: 每次webpack构建打包会生成唯一的一个hash值
 *        问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效。
 *        可能我只改动一个文件，所有缓存都失效了，所以webpack引入另外的chunkhash
 *      chunkhash: 根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样。
 *        问题：js和css的hash值还是一样的，
 *        因为css是再js中被引入的，所以同属于一个chunk
 *      contenthash: 根据文件的内容生成hash值，不同文件hash值不一样。
 *        作用：让代码上线运行缓存更好使用
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


          //js的兼容性处理
          /**
           * 我们想要对babel进行缓存的原因：我们不想让一个文件的变化而引发全部的
           * 文件都再处理一遍，我们喜欢处理的只是那个变了的文件（和HMR有点像，但是
           * 我们又不能用HMR，因为HMR是在devServer里面写，它不在生产环境里写）。使用
           * 了babel缓存，它会将你的所有js文件翻译后都放到缓存里面，如果你的js文件没有
           * 发生变化，那么就会直接用你缓存里面的东西了，而不会再重新构建一次。
           */
          {
            test: /\.js/,
            exclude: /node_modules/,
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
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production', //js自动压缩
  devtool: 'source-map'
}