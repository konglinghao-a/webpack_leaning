/**
 * build文件：打包后输出放置到这个文件
 * src文件：我们项目的源代码目录
 * index.js文件：webpack的入口文件
 * 
 * webpack的安装：
 *    npm install webpack webpack-cli -g
 *    npm install webpack webpack-cli -D
 *    
 * 1、运行指令
 *    开发环境指令：webpack ./src/index.js -o ./build/built.js --mode=development
 *      webpack会以 webpack ./src/index.js 为入口文件开始打包，打包后输出到./build/built.js
 *      整体打包环境是开发环境。
 * 
 *      Hash: cb6c9e39a39fc54a96c1
 *      这是哈希值，每次打包都会生成一个唯一的哈希值
 * 
 * 2、生产环境指令：webpack ./src/index.js -o ./build/built.js --mode=production
 *    会压缩js代码
 * 
 * 3、结论：
 *    （1）webpack能处理js/json，不能处理css/img等其他资源
 *    （2）生产环境和开发环境将ES6模块化（import）编译成浏览器能识别的模块化
 *    （3）生产环境比开发环境多一个压缩js代码。
 *    
 */

import './index.css'
import data from './data.json'
console.log(data)

function add(x, y) {
  return x + y;
}
console.log(add(1, 2));