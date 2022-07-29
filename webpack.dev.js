process.env.NODE_ENV = 'development';

const webpack = require('webpack');
<<<<<<< HEAD
const merge = require('webpack-merge');
=======
const {merge} = require('webpack-merge');
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
<<<<<<< HEAD
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
=======
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1
    // })
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  ],
});
