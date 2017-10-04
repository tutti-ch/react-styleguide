const config = require('./webpack.base.config')
const path = require('path')

config.module.rules.push(
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
  }
)

module.exports = config
