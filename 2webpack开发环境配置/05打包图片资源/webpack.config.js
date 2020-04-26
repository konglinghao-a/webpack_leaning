const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        /**
         * 使用loader来处理图片
         * 这种方式会有一个问题：默认处理不了html中img文件
         */
        test: /\.(jpg|png|gif)$/,
        /**
         * 要使用多个loader处理的时候用use，use后面加的是数组
         * 若只是用一个loader，直接使用loader就行，后面还会有配置要加
         * 需要下载两个包：
         *    npm i url-loader -D
         *    npm i file-loader -D
         */
        loader: 'url-loader',
        options: {
          /**
           * 当发现图片大小小于8kb，就会被base64处理，会转换为字符串，送到浏览器然后解析
           * 优点：减少请求数量
           * 缺点：转换成字符串以后体积会更大（文件请求速度更慢）
           */
          limit: 8 * 1024,
          esModule: false,
          /**
           * 给图片重命名
           * [hash:10]取图片的hash的前10位
           * [ext]取文件原来的扩展名
           */
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        /**
         * 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
         * 这里会有一个问题：默认情况下url-loader会使用es6的模块化来处理图片模块，
         * 而html-loader的引入是commonjs的模块化来引入，用es6的引入来解析commonjs的引入
         * 它解析不了，所以在上面需要处理.
         * 解决：关闭url-loader的es6模块化，使用commonjs解析
         */
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  mode:'development'
}