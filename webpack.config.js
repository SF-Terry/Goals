const webpack = require('webpack');
const path = require('path');
const express = require('express')
const PORT = process.env.PORT
const BUILD = process.env.BUILD

const app = express()

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js.*/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }
        ]
      }, {
        test: /\.css?/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }, {
        test: /\.scss?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: BUILD ? [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.UglifyJsPlugin()
  ] : []
}

// server
if (PORT) {
  app.use(express.static(__dirname))
  app.listen(PORT)
}