const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    clean: true, // webpack5 自带的清空dist目录功能
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], //没有写后缀时进行补全
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
      {
        test: /\.(js|ts|jsx|tsx)$/,
        include: path.appSrc,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'fishfan的脚手架工具',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
