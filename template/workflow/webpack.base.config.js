const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:4]:[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:3]:[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'fishfan的脚手架工具',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'fish.html',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
