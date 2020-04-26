const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');

//设置nodejs的环境变量, 是postcss给css设置兼容的时候按照开发环境来兼容
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtraPlugin.loader,
          'css-loader',
          /**
           * css兼容性处理都要使用一个库：postcss。postcss想要在webpack中使用需要用到
           * postcss-loader，除此之外还需要用到一个插件：postcss-preset-env。这个插件
           * 能够帮助我们postcss识别某些环境和加载指定的配置，能够让我们的兼容性配置精确
           * 到某一个浏览器的版本。这个配置有两种写法
           */
          // 1、使用loader的默认配置
          // 'postcss-loader'
          // 2、修改loader的配置，一般要用到大括号
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                //postcss的插件
                /**
                 * 这个插件的作用就是帮postcss找到package.json中的browserslist里面的配置，
                 * 通过配置加载指定的css兼容性样式。所以我们下面还是要写browserslist，
                 * browserslist要写在package.json中。配置要这么写：
                 * "browserslist": {
                 *    //想让其默认找开发环境的话，就必须设置环境变量：node环境变量：
                 *    //process.env.NODE_ENV = development
                 *    "development": [
                 *        //最新的浏览器版本
                 *        "last 1 chrome version",
                 *        "last 1 firefox version",
                 *        "last 1 safari version",
                 *    ],
                 *    //他默认是看生产环境的，跟下面写的mode: "development"没啥关系
                 *    "production": [
                 *        //小于这个百分比的浏览器不要
                 *        ">0.2%",  
                 *        //不要死了的浏览器（ie10）
                 *        "not dead",
                 *        //不要op_mini（早就死亡了）
                 *        "not op_mino all"
                 *    ]
                 * }
                 */
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtraPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'

}