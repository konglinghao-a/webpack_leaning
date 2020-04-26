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
  },
  /**
   * source-map: 一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，
   * 它会通过这个映射关系追踪到源代码错误）;
   *    只有 devtool: 'source-map' 这么一句是最基本的配置；
   *    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
   * 
   * source-map：外部
   *    可以显示错误代码准确信息和源代码的错误位置
   * 
   * inline-source-map: 内联
   *    可以显示错误代码准确信息和源代码的错误位置
   *    内联 和 外部的区别：
   *    1、外部会在外面生成map映射的文件，内联不生成文件直接嵌在js文件里面
   *    2、内联构建速度更快
   *    与 eval-source-map内联的区别：
   *    1、只生成一个内联的source-map，而eval会在每个js文件下面生成source-map
   *   
   * hidden-source-map：外部  只隐藏源代码
   *    可以显示错误代码的错误原因，但是没有错误位置，不能追踪到源代码的错误，
   *    只能提示到构建后代码的错误位置。
   * 
   * eval-source-map：内联
   *    每个js文件后面都会生成关于source-map的语句，都在eval函数中。
   *    可以显示错误代码准确信息和源代码的错误位置
   * 
   * nosources-source-map：外部   源代码和构建后代码都会隐藏
   *    可以找到错误代码的准确信息，但是没有任何源代码的信息。它和hidden一样都是为了
   *    隐藏源代码，放置恶意人拿到你的源代码。
   * 
   * cheap-source-map：外部
   *    可以显示错误代码准确信息和源代码的错误位置，和source-map的区别在于，如果错误代码
   *    和别的代码都写在了一行里面，它会显示一整行的错误（给一整行都打上红线），而source-map
   *    只会在具体的错误的一行打上红线。
   * 
   * cheap-module-source-map：外部
   *    可以显示错误代码准确信息和源代码的错误位置
   *    module会将loader和source map加入
   * 
   * 开发环境：速度快，调试更友好
   *    速度快（eval > inline > cheap > ....）
   *        eval-cheap-source-map (双剑合璧，更快了。。)
   *        eval-source-map (第二快)
   *    调试更友好
   *        source-map
   *        cheap-module-source-map（cheap的速度比上面那一句更快）
   *        cheap-source-map
   * 综合上面的推断：eval-source-map是很折中的选择
   * 
   * 生产环境：源代码要不要隐藏？调试要不要更友好？
   *    内联会让代码体积变大，所以生产环境不用内联
   *    hidden-source-map
   *    nosources-source-map
   * 综合上面的推断：source-map / cheap-module-source-map 调试更友好，真的想
   * 隐藏的话就用上面那两句来隐藏。所以生产环境下一般用source-map就好了。
   * 
   */
  devtool: 'eval-source-map'

}