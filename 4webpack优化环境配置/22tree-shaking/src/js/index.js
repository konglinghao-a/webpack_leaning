import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// 这样一来，mul就是引用了的绿色的叶子，count就是没引用的灰色叶子
// 灰色叶子会通过tree shaking 摇掉
// eslint-disable-next-line
console.log(mul(2, 3));


// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));
