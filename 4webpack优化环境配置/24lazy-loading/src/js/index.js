
console.log('index.js被加载了');

import { mul } from './test';

//如果是这么写的话，页面一加载就会加载test.js文件
// document.getElementById('btn').onclick = function () {
//   console.log(mul(4, 5));
// };

//下面是懒加载的写法，需要用到动态import
document.getElementById('btn').onclick = function () {
  /**
   * 懒加载：党文件需要使用是才加载
   * 将这个import放到一个异步的回调函数中，一开始不点击，并不会触发这个函数，
   * 因此不会被加载。(这个代码也是一定会进行代码分割的)
   * 
   * webpackPrefetch: true  这是设置预加载；
   * 预加载：会在使用之前，提前加载js文件
   * 
   * 正常加载可以认为是并行加载（同一时间加载多个文件，比如同一时间只有六条http
   * 协议，文件一多就得靠后加载），并行加载没有什么顺序，谁在前面谁先加载，但是可能
   * 先加载的没什么用，这样就浪费了时间。
   * 预加载就是等其他资源加载完毕，浏览器空闲了，再偷偷加载资源。
   * 
   * 所以，懒加载会有一个问题，就是你用的时候才加载，如果体积很大那就要等很久，配合
   * 上预加载，这样就会很好用。预加载的问题就是兼容性非常差。
   */
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({mul}) => {
    console.log(mul(4, 5));
  })
}