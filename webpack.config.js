const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = [
  {
    devtool: 'source-map',

    context: path.join(__dirname, '/src'),

    entry: {
      style: './sass/style.scss'
    },

    output: {
      path: path.join(__dirname,  '/docs/css'),
      filename: '[name].css'
    },

    module: {
      loaders: [
        {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: 'file'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader',
            'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
        }
      ]
    },

    plugins: [
      new WebpackBuildNotifierPlugin(),
      new ExtractTextPlugin('[name].css')
    ]
  },
  {
    context: path.join(__dirname, '/src'),

    entry: {
      bundle: './script/app.js'
    },

    output: {
      path: path.join(__dirname, '/docs'),
      filename: 'script/[name].js'
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 9000,
        server: { baseDir: ['docs'] },
        files: [
          'docs/**.css',
          'disp/**.html'
        ]
      })
    ]
  }
];
