
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 * 第一个参数前面加上  webpackChunkName: 'test' 就能够修改名字
 */
import(/* webpackChunkName: 'test' */'./test')
  .then(({mul, count}) => {
    // eslint-disable-next-line
    console.log(mul, count);
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败');
  })



// eslint-disable-next-line
console.log(sum(1, 2, 3, 4)); 
