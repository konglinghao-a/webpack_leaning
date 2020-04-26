const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * 若使用了es6的代码，打包以后的代码还是es6的，在不同浏览器中对它的兼容性是不同的（ie）
       * 因此我们用到了兼容性工具：babel，在webpack中使用就是babel-loader
       * 我们需要下载的包：
       *    npm i @babel/core -D ----->babel的核心库
       *    npm i babel-loader -D
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          /**
           * 预设：指示babel做怎样的兼容性处理。
           * 1、基本js兼容性处理: '@babel/preset-env' ----> 做一个预设环境的兼容性处理，
           *    npm i  @babel/preset-env -D
           * 这里会产生一个问题：只能转换基本语法，像Promise这些语法转不了；
           *    
           * 
           * 2、全部兼容性处理：'@babel/polyfill', 它不是babel的插件，只需要在index.js
           * 文件中直接引入就行了。
           *    npm i @babel/polyfill -D
           * 问题：我只需要解决部分的兼容性问题，但是将所有兼容性代码全部引入，体积太大,
           * 一般不考虑。
           * 
           * 3、需要做兼容性处理的：按需加载 ----> core-js
           *    npm i core-js -D
           * 
           */
          //presets: ['@babel/preset-env']--->按需加载之后又得在后面加中括号
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加载
                useBuiltIns: 'usage',
                //指定按需加载的内容, 指定core-js的版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到哪个版本的浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'

}