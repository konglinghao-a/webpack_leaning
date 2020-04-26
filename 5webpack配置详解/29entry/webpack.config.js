const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * entry: 入口起点 取值有下面几种类型：
 *    1、string ---> './src/index.js'
 *        单入口：
 *        打包形成一个chunk。输出一个bundle文件(built.js)
 *        chunk的名称默认是main
 *    2、array ---> ['./src/index.js', './src/add.js']
 *        多入口:
 *        所有入口文件最终只会一个chunk，输出只有一个bundle文件。
 *        它会默认打包到第一个js文件中。作用只有一个：只有在HMR
 *        功能中让html热更新生效（所以一般不用这种形式）
 *    3、object 
 *        多入口：
 *        有几个入口文件就形成几个chunk，输出几个bundle文件，此时
 *        chunk的名称就是key的值。
 *  
 *    ---> 特殊用法
 *    entry: {
 *      //所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
 *      index: ['./src/index.js', './src/count.js'],
 *      //形成一个chunk，输出一个bundle文件
 *      add: './src/add.js'
 *    } 
 */

module.exports = {
  //entry: './src/index.js',
  //entry: ['./src/index.js', './src/add.js'],
  entry: {
    index: './src/index.js',
    add: './src/add.js'
  },
  output: {
    //filename: 'built.js',
    filename: '[name].js', //这样的话打包后的名字就会以chunk的名字命名
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
