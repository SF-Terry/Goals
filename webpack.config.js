var webpack = require('webpack');
var path = require('path');

/**
 * 0 - APP
 * 1 - Prototype 
 */
var mode = 0;

var isProduction = false;

try {
  mode = /\d+/.exec(process.argv.filter(arg => /devmode/.test(arg))[0])[0];
  isProduction = process.argv.filter(arg => /devProd/.test(arg)).length > 0;
} catch (e) {

}

var entryMap = {
  '0': './src/entry.js',
  '1': './Prototype/entry.js'
}

var outputMap = {
  '0': {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
  '1': {
    path: path.resolve(__dirname, 'Prototype/prototype/js'),
    filename: 'bundle.js'
  }
}

var entry = entryMap[mode]
var output = outputMap[mode]


module.exports = {
  entry: entry,
  output: output,
  module: {
    loaders: [
      {
        test: /\.js.*/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.css?/,
        loader: "style!css"
      },
      {
        test: /\.scss?/,
        exclude: /node_modules/,
        loader: "style!css!sass"
      }
    ]
  },
  // minify bundle.js
  plugins: [
    isProduction ? new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js') : null,
    isProduction ? new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }) : null,
    isProduction ? new webpack.optimize.UglifyJsPlugin() : null
  ]
}
