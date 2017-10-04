const path = require('path')
const config = require('./webpack.base.config')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// The entry file
config.entry = {
  'main': path.resolve('src', 'components/index.js')
}

// Configurations for output folder
config.output = {
  path: path.join(__dirname, '/dist'),
  filename: '[name].bundle.js',
  library: 'TuttiCH',
  libraryTarget: 'umd'
}

// Add rules to extract less into css
config.module.rules.push({
  test: /\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        // translates CSS into CommonJS
        loader: "css-loader",
        options: {
          modules: true
        }
      },
      {
        // compiles Sass to CSS
        loader: "sass-loader",
        options: {
          includePaths: [path.join(__dirname, "src/styles")]
        }
      }]
  })
})

// Disable the children stats
config.stats = {
  children: false
}


config.plugins = [
  new ExtractTextPlugin("[name].bundle.css")
]

module.exports = config