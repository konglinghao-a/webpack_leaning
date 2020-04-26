const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js', 
    path: resolve(__dirname, 'build'),
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
  mode: 'development',

  /**
   * 解析模块的规则(都跟路径有关系)
   */
  resolve: {
    /**
     * 配置解析模块路径别名: 写路径时就可以方便一点
     * 缺点：写路径的时候就没有提示了
     */
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    /**
     * 配置省略文件路径的后缀名(默认是.js，所以我们引js的时候可以不写)
     * 这样的话，如果你引了index，它会先找index.js，找不到的话就找
     * index.json，再找不到就找index.css 就是那么一层一层找下来，找不到
     * 就报错。它只会匹配第一个找到的文件。
     */
    extensions: ['.js', '.json', '.css', '.jsx'],
    /**
     * 告诉webpack解析模块是去找哪个目录（默认是去node_modules里面找,当前目录找不到
     * 就去上一级找，层级一深找就会很麻烦，所以直接给它一个绝对路径让它好找一点。）
     */
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
}
