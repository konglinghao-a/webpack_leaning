// import add from './add';
import count from './count'

import('./add')
  .then(({default: add}) => {
    console.log(add(1, 2));
  })

console.log('index.js文件加载了');
console.log(count(3, 1));


