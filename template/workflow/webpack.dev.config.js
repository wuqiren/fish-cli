const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
};
module.exports = merge(commonConfig, devConfig);
