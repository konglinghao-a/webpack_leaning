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
    /**
     * 需要优化的原因：不想让每个类型的文件都全部过一次loader;
     * 加上oneOf: 以下的loader只会匹配一个
     * 注意：不能有两个配置处理同一种类型的文件，这个时候我们把重复处理同一个类型
     * 的loader提取到大括号外面去就行了。
     */
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
          {
            test: /\.js/,
            exclude: /node_modules/,
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
                      chromes: '60',
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
              outputPath: 'imgs'
            },
            esModule: false
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
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production' //js自动压缩
}