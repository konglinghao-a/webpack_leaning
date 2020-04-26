const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js', 
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development', 
  resolve: { 
    alias: {
      $css: resolve(__dirname, 'src/css')
    }, 
    extensions: ['.js', '.json', '.css', '.jsx'], 
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  devServer: {
    //运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    /**
     * 监视contentBase目录下的所有文件，一旦文件变化就会reload(重新打包等操作)
     * watchContentBase: true,
     */
    /**
     * 
     * watchOptions: {
     *    //忽略文件
     *    ignored: /node_modules/
     * }
     */
    //启动gzip压缩
    compress: true,
    //端口号
    port: 5000,
    //域名
    host: 'localhost',
    //自动打开浏览器
    open: true,
    //开启HMR功能
    hot: true
    /**
     * 不要显示启动服务器的日志信息（太多了就会太凌乱）
     * clientLogLevel: 'none',
     */
    /**
     * 除了一些基本的启动信息之外，其他内容不要显示
     * quiet: true
     */
    /**
     * 如果出现错误，不要全屏提示
     * overlay: false
     */
    /**
     * 服务器代理：解决开发环境下的跨域问题
     * 因为服务器和服务器之间是没有跨域问题的，所以我们用代理服务器来帮浏览器转发请求
     * proxy: {
     *    //一旦devserver(5000)服务器, 接收到/api开头的请求，就会把请求转发到另外一个
     *    //服务器：http://localhost:3000
     *    '/api': {
     *        target: 'http://localhost:3000',
     *        //发送请求时，请求路径重写：将/api/xxx 写成 /xxx （去掉/api）
     *        pathRewrite: {
     *            '^/api': ''
     *        }
     *    }
     * }
     * 
     */
  }
}
