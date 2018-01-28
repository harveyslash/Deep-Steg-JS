var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  // The script from which dependencies are to be loaded.
  entry:  {
    'bundle':'./entry.js',
    'reveal': './reveal.js'
  },
  // Name and location of the output bundle.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './index.html', to: "index.html" }, 
      { from: './reveal.html', to: "reveal.html" },
      { from: './css', to: 'css'}, 
      { from: './js', to: 'js'}, 
      { from: './bg.jpg', to: 'bg.jpg'}, 
      , 
    ])
  ],
  // Add source maps in order to have more meaningful errors.
  devtool: 'source-map',
  // Let the development server know where to serve the files from.
  devServer: {
    contentBase: 'dist'
  },
  // Fix for the 'fs' module issue described below.
  node: {
    fs: 'empty'
  },
  // Fix for the GLSL issue described below.
  module: {
    loaders: [
      { test: /\.(glsl)$/, loader: 'url-loader'}
    ]
  }
};