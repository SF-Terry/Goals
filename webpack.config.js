var webpack = require('webpack');
var path = require('path');


var isProduction = true;

var plugins = [];

try {
  isProduction = process.argv.filter(arg => /devProd/.test(arg)).length > 0;
} catch (e) {

}

if (isProduction) {
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}


module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: 'bundle.js'
  },
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
  plugins: plugins
}
