const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[contenthash:10].js', 
    path: resolve(__dirname, 'build'),
    //改变chunk的名字
    chunkFilename: 'js/[name]_chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'production', 
  resolve: { 
    alias: {
      $css: resolve(__dirname, 'src/css')
    }, 
    extensions: ['.js', '.json', '.css', '.jsx'], 
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      //下面的都是默认值，可以不写~~~~

      // //分割的chunk最小为30kb，小于30kb就不分割了
      // minSize: 30 * 1024,
      // //最大没有限制，有多大都会分割（但是有了上面一句说明不能小于30kb）
      // maxSize: 0, 
      // //要提取的chunks最少被引用1次，小于1次说明这个模块不是依赖，那就别提取了。
      // minChunks: 1, 
      // //按需加载时，并行加载的文件的最大数量
      // maxAsyncRequests: 5, 
      // //入口js文件最大并行请求数量
      // maxInitialRequests: 3, 
      // //名称连接符
      // automaticNameDelimiter: '~', 
      // //可以使用命名规则
      // name: true, 
      // //分割chunk组 
      // cacheGroups: { 
      //   //node_modules文件会被打包到vendors组的chunk中。---> vendors~xxx.js
      //   //满足上面的规则：如：大小超过30kb，至少被引用一次等
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     //打包优先级为-10
      //     priority: -10
      //   },
      //   default: {
      //     //要提取的chunk最少被引用2次
      //     minChunks: 2,
      //     //优先级
      //     priority: -20,
      //     //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是
      //     //重新打包模块
      //     reuseExistingChunk: true
        // }
      
    },
    /**
     * 前面会出现一个问题：a.js的哈希值改变会影响index.js的重新打包，这样是不可取的。
     * 所以我们想到将index.js里面记录的a.js的哈希值提取出来单独打包。
     * 下面这句话的意思就是，将当前模块的记录其他模块的hash单独打包为一个文件runtime,
     * 所以我们之前做缓存文件的时候一定要加上下面这一句，不然会导致缓存失效。
     */
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      //配置生产环境的压缩方案：js和css (我们需要terser-webpack-plugin这个插件来压缩)
      new TerserWebpackPlugin({
        //如果不进行配置的话，那他会用默认配置，默认配置会性能不太好
        //开启缓存
        cache: true,
        //开启多进程打包
        parallel: true,
        //启用source-map（否则会被压缩掉）
        sourceMap: true
      })
    ]
  }
}
