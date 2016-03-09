var path = require('path');

var PATHS = {
  dist: path.resolve(__dirname + '/' + 'dist'),
  src: path.resolve(__dirname)
};

module.exports = {
  entry: {
    app: PATHS.src
  },

  output: {
    path: PATHS.dist,
    filename: "dist.js"
  },

  module: {
    loaders: [
      { test: /\.csv?$/, loader: 'dsv-loader' },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  }

};
