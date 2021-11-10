const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Webpack = require('webpack');
const commonConfig = require('./webpack.base.config');
const path = require('path');
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // static: '../dist',
    historyApiFallback: true, // 所有的404都会连接到index.html
    open: false,
    hot:true, // 启用热模块替换功能，浏览器会自动刷新
    port: 8080,
    compress: true, //打包
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
  ],
};
module.exports = merge(commonConfig, devConfig);
