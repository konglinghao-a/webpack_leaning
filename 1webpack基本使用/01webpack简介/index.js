//引入js资源
import $ from 'jquery'
//引入样式资源
import './index.less';
//引入图片、字体等其他资源

/**
 * 你要引入很多资源，这些资源都要交给构建工具去处理。那么构建工具webpack怎么处理？
 * 首先要告诉webpack一个打包的起点（入口文件index.js），那么webpack就会以入口文件
 * index.js进行打包。
 * 它会将上面import的每一个依赖都给记录好，形成一个依赖关系树状结构图：
 *            index
 *            /    \
 *        jquery   less
 * 形成好之后就会分别通过这个依赖关系图的先后顺序，依次把这些资源引入进去；引进去
 * 之后的东西叫做chunk块，然后对这个进行各种操作，比如把less编译成css等等，这些
 * 操作统一概括一下就叫做打包。
 * 打包后把这些处理好的资源输出出去，输出的东西叫做bundle。
 * 经过打包后生成的资源就能在浏览器中平稳地运行了。
 * 
 */


$('#title').click(() => {
  $('body').css('backgroundColor', 'deepPink');
})