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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //打包其他资源（除了html/js/css资源以外的资源）
      {
        //排除css/js/html资源
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  /**
   * 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器等功能）
   * 特点：只会在内存中编译打包，不会有任何输出到本地代码（如果你把build删掉了它还是会
   * 在localhost:8000里面输出，但是这时候build里面是没有文件的。如果想要严格地在build里
   * 面打包出文件，就用webapck指令）
   * 启动devServer指令为：npx webpack-dev-server (因为是本地下载所以用npx来找到这个包)
   * 所以要下载包：npm i webpack-dev-server -D
   * 访问的时候我们可以通过localhost:3000来访问，这就是我们通过dev-server来搭建的一个本地
   * 的服务器
   */
  devServer: {
    //项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    //启动gzip压缩, 让我们的代码更小，运行速度更快
    compress: true,
    //端口号
    port: 8000,
    //自动打开浏览器
    open: true
  }

}