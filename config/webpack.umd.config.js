/**
 * This configuration file will do two things:
 * 1. Copy components and styles to dist folder and ignore unrelated stuff outside.
 * 2. Copy all svg icons under src/components/Icons/assets to dist/assets/icons folder and flatten them.
 */
const path = require('path')
const config = require('./webpack.base.config')
const CopyWebPackPlugin = require('copy-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')

const root = path.join(__dirname, '../')

// The entry file
config.entry = {
  'main': path.resolve('src', 'index.js')
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
    options: {
      includePaths: [path.join(__dirname, "../src/styles")]
    }
  }]
})

// Disable the children stats
config.stats = {
  children: false
}

config.plugins = [
  new CleanWebPackPlugin([path.join(root, 'dist')], { root: root }),
  new CopyWebPackPlugin([
    {
      from: path.join(root, 'src/styles/Icons/assets/**/*.svg'),
      to: path.join(root, 'dist/assets/icons/'),
      flatten: true
    },
    {
      context: path.join(root, 'src/components/'),
      from: path.join(root, 'src/components/**/*'),
      to: path.join(root, 'dist/components')
      // ignore: [path.join(root, 'src/components/**/*.test.js')]
    },
    {
      context: path.join(root, 'src/styles/'),
      from: path.join(root, 'src/styles/**/_*.scss'),
      to: path.join(root, 'dist/styles')
    },
    {
      from: {
        glob: path.join(root, 'src/*'),
        dot: true
      },
      to: path.join(root, 'dist'),
      flatten: true
    }
  ])
]

module.exports = config