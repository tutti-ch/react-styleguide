const path = require('path')

const config = {
  // The base directory for resolving the entry option
  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ]
  },

  module: {
    rules: [
      // Babel loader, will use your project’s .babelrc
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      // Helps importing files
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}

module.exports = config