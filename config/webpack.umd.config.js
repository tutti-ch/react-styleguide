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

// Exclude react from the bundle
config.externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  },
  'prop-types': {
    root: 'PropTypes',
    commonjs2: 'prop-types',
    commonjs: 'prop-types',
    amd: 'prop-types'
  }
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
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          sourceMap: true,
          camelCase: true,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['ie >= 10', 'last 5 versions', '> 2%']
            },
            discardComments: {
              removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true
          }
        }
      },
      {
        // compiles Sass to CSS
        loader: "sass-loader",
        options: {
          sourceMap: true,
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
  new ExtractTextPlugin({ filename: "[name].bundle.css", allChunks: true }),
  new CopyWebPackPlugin([
    {
      from: path.join(root, 'src/styles/Icons/assets/**/*.svg'),
      to: path.join(root, 'dist/assets/icons/'),
      flatten: true
    }
  ])
]

module.exports = config