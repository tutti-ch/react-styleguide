const path = require('path')

module.exports = {
  // The base directory for resolving the entry option
  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
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
      // Other loaders that are needed for your components
      {
        test: /\.css|\.scss$/,
        use: [{
          // creates style nodes from JS strings
          loader: "style-loader"
        }, {
          // translates CSS into CommonJS
          loader: "css-loader",
          options: {
            modules: true
          }
        }, {
          // compiles Sass to CSS
          loader: "sass-loader",
          options: {
            includePaths: [path.join(__dirname, "src/styles")]
          }
        }]
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