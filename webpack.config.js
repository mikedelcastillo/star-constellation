const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './source/js/main.js'
  },
  output: {
    path: __dirname + "/public/js",
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    // new UglifyJsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // })
  ],
  watch: true
};
