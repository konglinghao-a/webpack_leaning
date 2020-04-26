## webpack5

此版本重点关注以下内容：

- 通过持久缓存提高构建性能。
- 使用更好的算法和默认值来改善长期缓存
- 通过更好的树摇和代码生成来改善捆绑包大小
- 清除处于怪异状态的内部结构，同时在v4中实现功能而不引入任何重大更改
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用v5

## 下载

- npm i webpack@next webpack-cli -D

## 自动删除Node.js Polyfills

早期，webpack地目标是允许在浏览器中运行大多数node.js模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而写的。webpack <=4附带了许多node,js核心模块地polyfill，一旦模块使用任何核心模块（即crypto模块），这些模块就会自动应用。

尽管这令使用为node.js编写地模块变得容易，但它会将这些巨大地ployfill添加到包中。在许多情况下，这些polyfill是不必要的。

webpack5会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块
- 可以为node.js核心模块手动添加一个polyfill，错误消息将提示如何实现该目标。

## Chunk和模块ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds:"deterministic, moduleIds: "deterministic"`

## Chunk ID

你可以不用使用`import(/* webpackChunkName: "name" */"module")`在开发环境来命名为chunk命名，生产环境还是有必要的webpack内部有chunk命名规则，不再以id(0, 1, 2)命名了。

## Tree Shaking

1、webpack现在能够处理对嵌套模块的tree shaking

```javascript
//inner.js
export const a = 1;
export const b = 2;

//module.js
import * as inner from './inner';
export { inner };

//user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中，inner模块暴露的`b`会被删除 (webpack4检测不出来)

2、webpack现在能够处理好多个模块之间的关系

```javascript
import { something } from './something';

function usingSomething() {
    return something;
}

export function test() {
    return usingSomething();
}
```

当设置了`sideEffects: false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`./something`（在webpack4中，你不用test，但是你的test用了something里面的东西，所以something还是会被打包进去）

3、webpack现在能处理对Commonjs的tree shaking

## output

webpack4默认只能输出ES5代码

webpack5开始新增一个属性output.ecmaVersion,可以生成ES5和ES6代码 ( ES6的好处就在于少了babel编译的过程了，因为babel编译越多，它的速度就越慢)

如：`output.ecmaVersion: 2015`

## SplitChunk

```javascript
//webpack4
minSize: 30000
```

```javascript
//webpack5
minSize: {
	javascript: 30000,
	style: 50000
}
```

## Caching

```javascript
//配置缓存
cache: {
    //磁盘缓存
    type: "filesystem",
    buildDependencies: {
        //当配置修改时，缓存失效
        config: [__filename]
    }
}
```

缓存输出到`node_modules/.cache/webpack`

## 监视输出文件

之前webpack总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此时更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件

## 默认值

- `entry: "./src/index.js"`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

## 更多内容

https://github.com/webpack/changelog-v5