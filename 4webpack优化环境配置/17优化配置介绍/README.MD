# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map

## 生产环境性能优化
* 优化打包构建速度 (提升开发者的体验)
  * oneOf
  * babel缓存
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存（hash-chunkhash-contenthash）
  * tree shaking
  * code split（会和dll一起更加细致地分割）
  * 懒加载/预加载
  * PWA
