const path = require('path')
const glob = require('glob')
const extend = require('util')._extend
const loaders = require('loaders')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const REACT_MYPAGES_SRC = 'node_modules/react-mypages/src'
const REACT_MYPAGES_HELPERS = REACT_MYPAGES_SRC + '/helpers'
const REACT_STYLEGUIDE_COMPONENTS = 'styleguide'

const ASSET_PATHS = [REACT_MYPAGES_SRC, REACT_STYLEGUIDE_COMPONENTS]
const dir = ASSET_PATHS.concat([REACT_MYPAGES_HELPERS]).map((_path) => path.resolve(__dirname, _path))

const utils_paths = function() {
  const resolve = path.resolve

  const base = function base() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return resolve.apply(resolve, [path.resolve(__dirname, '.')].concat(args))
  }

  return {
    base: base,
    client: base.bind(null, REACT_MYPAGES_SRC),
    dist: base.bind(null, 'dist')
  }
}()

function getComponents(directory) {
  return function() {
    return glob.sync(path.resolve(__dirname, directory + '/components/**/*.js')).filter(function(module) {
      return /\/[A-Z]\w*\.js$/.test(module)
    })
  };
}

const extractStyles = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: true
})

module.exports = {
  // template: 'templates/index.html',
  title: 'tutti.ch Style Guide',
  defaultExample: false,
  skipComponentsWithoutExample: true,
  styleguideDir: 'docs', // this allow to publish the styleguide in GH-pages
  sections: [
    {
      name: 'Components',
      components: getComponents(REACT_MYPAGES_SRC)
    },
    {
      name: 'Styleguide',
      components: getComponents(REACT_STYLEGUIDE_COMPONENTS)
    }
  ],
  webpackConfig: {
    resolve: {
      modules: [
        ...ASSET_PATHS.map((path) => utils_paths.base(path)),
        'node_modules'
      ],
      extensions: ['*', '.js', '.jsx', '.json'],
      alias: {
        'rsg-components/Wrapper': path.join(__dirname, 'styleguide/internal/Wrapper')
      }
    },
    module: {
      loaders: [
        {
          test: /\.pdf$/,
          loader: 'ignore-loader'
        },
        {
          test: /\.js?$/,
          include: dir,
          use: [{
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: [
                'babel-plugin-transform-class-properties',
                'babel-plugin-syntax-dynamic-import', [
                  'babel-plugin-transform-runtime',
                  {
                    helpers: true,
                    polyfill: true,
                    regenerator: true
                  }
                ],
                [
                  'babel-plugin-transform-object-rest-spread',
                  {
                    useBuiltIns: false
                  }
                ]
              ],
              presets: [
                'stage-0',
                'babel-preset-react', ['babel-preset-env', {
                  targets: {
                    ie9: false,
                    uglify: true,
                    modules: false
                  }
                }]
              ]
            }
          }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                import: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1,
                camelCase: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  utils_paths.base('styles'),
                  utils_paths.client('styles')
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|eot|woff|woff2|ttf|svg)$/,
          exclude: /.pdf/,
          include: /.*/, // Because styleguidist requires either include or exclude.
          loader: 'url-loader?limit=8192'
        }
      ]
    }
  }
}
