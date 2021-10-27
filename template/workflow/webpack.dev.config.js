const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.config');
const path = require('path');
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: false,
    hot: true,
    quiet: true,
    port: 8082,
  },
};
module.exports = merge(commonConfig, devConfig);
