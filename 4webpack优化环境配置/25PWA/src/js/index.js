import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

/**
 * 注册serviceworker
 * 处理兼容问题
 * 这里会有小问题，eslint并不认识全局变量，所以我们要在package.json里面配置：
 * "eslintConfig": {
 *  "extends": "airbnb-base",
 *    "env": {
*     "browser": true //支持浏览器端全局变量
 *   }
 * },
 *
 * service-worker代码必须运行在服务器上，所以我们要通过服务器的方式去启动构建后的
 * build下面的这个资源。
 *    ----> 可以用nodejs代码
 *    ----> 或者下载serve包   npm i serve -g  执行：serve -s build: 启动服务器，把build
 *    目录下的所有资源作为静态资源暴露出去
 */
if ('serviceWorker' in navigator) { // 判断兼容性的代码
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js') // 这个文件webpack会生成
      .then(() => {
        console.log('serviceworker注册成功'); 
        /**
         * 一旦注册成功，下一次因为网络断线这些代码全都会失效，就无法加载东西，那么它就会
         * 去serviceworker中加载东西，就能拿到上一次我通过serviceworker的缓存拿到结果。
         */
      })
      .catch(() => {
        console.log('serviceworker注册失败');
      });
  });
}
