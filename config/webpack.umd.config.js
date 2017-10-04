const path = require('path')
const config = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebPackPlugin = require('copy-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')

const root = path.join(__dirname, '../')

// The entry file
config.entry = {
  'main': path.resolve('src', 'components/index.js')
}

// Configurations for output folder
config.output = {
  path: path.join(root, 'dist'),
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
          includePaths: [path.join(root, "src/styles")]
        }
      }]
  })
})

// Disable the children stats
config.stats = {
  children: false
}


config.plugins = [
  new CleanWebPackPlugin([path.join(root, 'dist')], { root: root }),
  new ExtractTextPlugin("[name].bundle.css"),
  new CopyWebPackPlugin([
    {
      from: path.join(root, 'src/styles/Icons/assets/**/*.svg'),
      to: path.join(root, 'dist/assets/icons/'),
      flatten: true
    }
  ])
]

module.exports = config