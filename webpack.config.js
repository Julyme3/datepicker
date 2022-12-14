const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isDev ? 'source-map' : 'eval',
  devServer: {
    static: './dist',
    port: 3000,
    compress: true,
    hot: false,
    historyApiFallback: true,
    open: true,
    liveReload: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, 'src/assets'),
    //             to: path.resolve(__dirname, 'dist/assets')
    //         }
    //     ]
    // }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
    }),
    new ESLintPlugin({
      fix: false,
      failOnWarning: false,
    }),
    new MomentLocalesPlugin({
      localesToKeep: ['ru'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
