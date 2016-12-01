var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: BUILD_DIR + '/entry.js',//['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', BUILD_DIR + '/entry.js'],
  output: {
    path: APP_DIR + '/js',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {test : /\.js?/,loader : 'babel'},
      {test : /\.jsx?/,loader : 'babel'},
      {test: /\.css?/, loader: "style!css"},
      {test: /\.scss?/, loader: "style!css!sass"}
    ]
  },
  resolve: {
    extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
  }
};

module.exports = config;