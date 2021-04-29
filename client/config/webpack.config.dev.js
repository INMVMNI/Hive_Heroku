const path = require('path')
const config = require('./webpack.config.js')

config.devServer = {
  // historyApiFallback: {
  //   // index: '/'
  //   // *changed this from: true for use with devServer
  //   index: 'build/index.html'
  // },
  historyApiFallback: true,
  contentBase: path.join(__dirname, '../build'),
  host: '0.0.0.0',
  port: 3000,
  proxy: {
  "/api/*": "http://localhost:5000"
  // "/upload" : "http://localhost:5000"
  }
}

config.devtool = 'inline-source-map'

module.exports = config
