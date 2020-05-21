'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '[name].[hash].js',
    path: process.cwd() + '/dist', // process.cwd() 进程的当前目录 __dirname： 脚本所在目录, 有一定的区别
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
      options: {
        transpileOnly: true, // 加快编译速度建议与fork-ts-checker-webpack-plugin一起使用以再次进行完整类型检查
        appendTsSuffixTo: [/.vue$/] // 给.vue 文件添加一个 .ts的后缀用于编译， 由于使用了vue的单文件组件，所以ts-loader配置了appendTsSuffixTo: [/\.vue$/] 。
        // 但是发现在使用thread-loader和cache-loader加速构建时，会报Could not find file: '*.vue.ts'的错误。但是项目中并没有*.vue.ts的文件。
      }
    }, {
      test: /\.(css|less)$/,
      loader: 'vue-style-loader!less-loader!css-loader'
    }]
  },
  plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin({
    template: './public/index.html',
    inject: true //是否自动注入生成后的文件
  })],
  devtool: '#eval-source-map'
};