const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'built')
  },
  module: {
    rules: [
      /**
       * 语法检查：
       * 目的：让团队中的人的代码编写风格变得一致，也能检查到常见的语法错误
       * 常见的语法检查就是eslint，webpack中用到的就是eslint-loader，而这个
       * eslint-loader依赖于eslint库，因此我们需要下载这两个东西：
       *     npm i eslint -D
       *     npm i eslint-loader -D
       * 语法检查只针对js来做，因此检测以.js结尾的文件
       * 注意：只检查自己写的源代码，第三方的库是不用检查的。
       * 设置检查规则：
       *    package.json中的eslintConfig中设置；
       *    "eslintConfig": {
       *        "extends": "airbnb-base"   //继承airbnb-base库的规则检查
       *    }
       *      
       * 
       *    推荐使用airbnb规则 ----> eslint-config-airbnb-base  它依赖:eslint eslint-plugin-import
       * 
       * 综上所述：总共下载四个：
       *    npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D
       */
      {
        test: /\.js$/,
        exclude: /node_modules/, //不检查第三方库里面的代码
        loader: 'eslint-loader',
        options: {
          // 自动修复eslint错误
          fix: true
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