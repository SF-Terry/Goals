var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
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
    new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}