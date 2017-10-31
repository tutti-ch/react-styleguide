const config = require('./webpack.base.config')

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
        modules: true,
        localIdentName: '[name]_[local]_[hash:base64:5]',
        sourceMap: true,
        camelCase: true,
      }
    }, {
      // compiles Sass to CSS
      loader: "sass-loader",
    }]
  }
)

module.exports = config
