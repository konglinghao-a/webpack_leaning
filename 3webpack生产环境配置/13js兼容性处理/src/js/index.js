/**
 * 一旦引入就可以将全部的js代码兼容, 这样打包后的js文件就会很大，因为
 * 它把所有跟兼容性相关的东西都引入进来了。
 */
//import '@babel/polyfill';

const add = (x, y) => {
  return x + y;
}
console.log(add(2, 4));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器好了');
    resolve();
  }, 1000)
})
console.log(promise);
