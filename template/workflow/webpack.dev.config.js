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
    hot: 'only', // 启用热模块替换功能，在构建失败时不刷新页面作为回退
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
