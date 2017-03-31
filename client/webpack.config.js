const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  devtool: 'source-map',
  module: {
    rules: [{
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
        test: [/\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, /\LICENSE$/],
        loader: "file-loader",
        include: [
          path.resolve(__dirname, './images'),
          path.resolve(__dirname, './node_modules'),
          path.resolve(__dirname, './src')
        ],
        options: {
          name: 'assets/[name].[ext]',
        },
      }, {
        test: /materialize-css\/bin\//,
        loader: 'imports?jQuery=jquery,$=jquery'
      },

    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'jquery': path.join(__dirname, './node_modules/jquery/dist/jquery'),
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './index.html')
    }, {
      from: path.resolve(__dirname, './images'),
      to: 'images'
    }]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ]
};
