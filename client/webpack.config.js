const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  watch: true,
  module: {
    loaders: [{
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader'
    }, {
      test: [/\.css$/, /\.scss$/],
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: [/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, /\LICENSE$/],
      loader: "file-loader"
    }]
  }
};
