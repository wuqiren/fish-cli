const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
};
module.exports = merge(commonConfig, devConfig);
