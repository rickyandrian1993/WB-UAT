const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './index.js',
  target: 'node',
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^pg-native$|^cloudflare:sockets$/
    })
  ],
  output: {
    path: path.resolve(__dirname, '../build-server'),
    filename: 'webservice.js'
  }
}
