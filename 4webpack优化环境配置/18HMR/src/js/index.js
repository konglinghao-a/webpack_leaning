//引入
import '../css/iconfont.css';
import '../css/index.less';
import print from './print';

console.log('index.js被加载了。。')
print();

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));

/**
 * 它会全局去找module这个变量，看module上有没有hot这个属性
 */
if (module.hot) {
  /**
   * 一旦module.hot为true，说明开启了HMR功能。 --->让HMR功能生效
   * 所以下面的代码只有开启了HMR功能的时候才会生效，没开启就不会生效。
   * 
   */
  module.hot.accept('./print.js', function () {
    /**
     * 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建，
     * 会执行后面的回调函数
     */
  }) 
}
