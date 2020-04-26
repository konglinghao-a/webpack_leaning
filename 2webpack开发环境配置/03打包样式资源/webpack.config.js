/**
 * webpack.config.js 就是webpack的配置文件
 *    作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）
 *    
 *    所有构建工具都是基于nodejs平台运行的——模块化默认使用commenjs;
 *    而项目的模块化用ES6的语法
 */


 /**
  * 所以整个流程是这样的：
  *   首先会通过entry把index.js加载进来，entry会分析里面的内部依赖图（发现里面引入
  * 了一个index.css资源），这些资源会经过loader，loader会对每一个资源进行处理，命中
  * 的资源会经过loader进行处理。
  */

//resolve用来拼接绝对路径的方法
const { resolve } = require('path');
module.exports = {
  //在对象里面写webpack配置
  /**
   * 写五个核心配置
   */

  //入口七点
  entry: './src/index.js',

  //输出
  output: {
    filename: 'built.js',
    //输出路径，我们用绝对路径，所以会用到nodejs里面的模块path
    //__dirname就是当前目录的绝对路径
    path: resolve(__dirname, 'build')
  },

  //loader的配置
  module: {
    rules: [
      //详细的loader配置
      {
        //匹配哪些文件，一般用正则表达式来写
        /**
         * loader会遍历所有文件，一旦发现.css结尾的文件就会进行处理（通过use处理）
         */
        test: /\.css$/,
        /**
         * use就是使用哪些loader
         */
        use: [
          //use数组中的loader执行顺序：从右到左，从下到上依次执行
          /**
           * 创建一个style标签，将把上一步（下面这行）添加到js中的样式资源插入，
           * 添加到head中生效。
           */
          'style-loader',
          /**
           * 将css文件变成commonjs的一个模块加载到js中，里面的内容是样式字符串
           */
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          /**
           * 将less文件编译成css文件，它需要下载两个包：
           * 1、less
           * 2、less-loader
           */
          'less-loader'
        ]
      }
    ]
  },

  //plugins的配置，就是让webpack更加强大
  plugins: [

  ],

  //模式
  mode: 'development' //开发模式
  //mode: 'production'  //生产模式会把代码压缩，就看不清写了啥了。
}