const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    /**
     * 文件名称 (指定名称+目录)
     */
    filename: 'js/[name].js', 
    /**
     * 输出文件的目录（将来所有资源输出的工共目录，img等文件也会输出到这个目录）
     */
    path: resolve(__dirname, 'build'),
    /**
     * 所有资源引入公共路径前缀 ----> 'imgs/a.jpg' ---> '/imgs/a.jpg'
     * 二者的不同之处是，前面没有斜杠说明是当前路径下去找imgs文件，而
     * 前面有斜杠，这个斜杠会以当前的服务器地址去补充，寻找服务器根目录下
     * 的imgs文件夹，一般会在生产模式使用。
     */
    publicPath: '/',
    /**
     * 指定非入口chunk文件的名称，只要是entry后面跟的就是入口chunk，除此之外打包的
     * chunk都会以下面的这个来命名。如何会产生额外的chunk呢？采用动态import的语法
     * 会将文件分割成单独的chunk；通过optimization将node_modules里面的东西分割成
     * 单独的chunk。
     */
    chunkFilename: '[name]_chunk.js',
    /**
     * 打包后的js文件，暴露变量。
     */
    library: '[name]',
    /**
     * 变量名添加到哪个上--> browser
     */
    //libraryTarget: 'window',
    //libraryTarget: 'global', //服务端
    libraryTarget: 'commonjs' //通过commonjs来暴露
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}
