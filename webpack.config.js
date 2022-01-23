const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [ 
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/about.html',
      inject: 'body',
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/gear.html',
      inject: 'body',
      filename: 'gear.html'
    }),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/map.html',
      inject: 'body',
      filename: 'map.html'
    }),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/weather.html',
      inject: 'body',
      filename: 'weather.html'
    }),
    new HtmlWebpackPlugin({
      title: 'camp-planner',
      template: './src/meals.html',
      inject: 'body',
      filename: 'meals.html'
    }),
  ],
  module: { 
    rules: [
      {
        test: /\.(svg|ico|gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      },
      {
        test:/\.html$/,
        use: [
          'html-loader'
        ]
      },
      
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ]
  }
};