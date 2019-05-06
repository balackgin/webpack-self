const webpack = require('webpack');
const path = require('path');
const ExtracTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8001',
      './src/js/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "../../",
    filename: 'js/[name].min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /mode_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtracTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader'
          }
        })
      },
      {
        test:/\/(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192&name=img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtracTextPlugin('style/[name].min.css'),
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ['index'],
      template: './src/pages/index/index.html',
      filename: 'pages/index/index/html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}