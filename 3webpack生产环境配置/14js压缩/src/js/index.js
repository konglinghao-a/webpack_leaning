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
