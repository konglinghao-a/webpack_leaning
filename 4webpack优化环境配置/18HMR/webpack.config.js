/**
 * 这个时候会有一个性能问题：如果只修改了css文件，即使js文件没有变化它还是会
 * 重新加载一次。同样的，如果有js模块，只要模块发生了变化那么其他的就都会重新
 * 加载了。因此我们想实现，一个模块发生变化只重新加载那个变化的模块，这就需要
 * 我们的HMR功能。
 *    
 * HMR: hot module replacement  模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大
 * 提升构建速度。直接在devServer里面加上hot: true即可.
 * 
 * 样式文件：可以使用HMR功能：因为style-loader内部实现了,这就是为什么开发环境的
 * 时候我们使用style-loader，而生产环境的时候我们把它单独抽成一个文件，因为开发
 * 环境中我们调试代码的时候想要更快的速度。
 * 
 * js文件：默认是没有HMR功能 --> 需要修改js代码，添加支持HMR功能的代码；
 * 注意：HMR功能对js的处理，只能处理非入口js文件的其他js文件。因为入口文件引入了
 * 其他文件，它发生改变的话必定会重新引入其他所有文件。
 * 
 * html文件：默认是没有HMR功能，同时会导致问题：html文件不能热更新（即本地写的
 * 代码它没有重新刷新浏览器）；解决：在entry里面加入'./src/index.html'（此时也
 * 还是没有HMR功能的）。这里就要思考，我们有必要HMR掉HTML文件嘛？因为html文件
 * 只有一个，一旦它发生变化了，没办法优化。因此html不用做HMR功能。
 * 
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //处理less资源
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      //处理css资源
      /**
       * 样式时并不会输出的，它都在js文件里面，已经跟js融为一体了
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false, //关闭es6module
          outputPath: 'imgs' //让图片资源都打包到imgs文件夹下面
        }
      },
      //处理html中img资源
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      //处理其他资源
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media' //其他资源到media文件夹里面去
        },
      }

    ]
  },
  plugins: [
    //plugins配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 5000,
    open: true,
    //开启HMR功能，当修改了webpack配置，新配置要想生效，必须重启webpack服务
    hot: true
  }
}