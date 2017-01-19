const path = require('path')
const glob = require('glob')
const extend = require('util')._extend

const REACT_MYPAGES_SRC = 'node_modules/react-mypages/src'
const REACT_MYPAGES_HELPERS = REACT_MYPAGES_SRC + '/helpers'
const REACT_STYLEGUIDE_COMPONENTS = 'styleguide'

const ASSET_PATHS = [REACT_MYPAGES_SRC, REACT_STYLEGUIDE_COMPONENTS]

const utils_paths = function () {
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

module.exports = {
  title: 'tutti.ch Style Guide',
  defaultExample: false,
  skipComponentsWithoutExample: true,
  styleguideDir: '../../docs', // this allow to publish the styleguide in GH-pages
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
  updateWebpackConfig: function(webpackConfig, env) {
    const dir = ASSET_PATHS.concat([REACT_MYPAGES_HELPERS]).map( (_path) =>  path.resolve(__dirname, _path) )

    webpackConfig.sassLoader = {
      includePaths: utils_paths.client('styles')
    }

    // Add fallback resolve path so that we can include components like components/Foo/Foo.
    // That was not included in the default config so we had to extend it.
    webpackConfig.resolve = extend(webpackConfig.resolve, {
	fallback: ASSET_PATHS.map( (path) => utils_paths.base(path) )
    })

    const BASE_CSS_LOADER = 'css?sourceMap&-minimize&camelCase'

    // Add any package names here whose styles need to be treated as CSS modules.
    // These paths will be combined into a single regex.
    // If config has CSS modules enabled, treat this project's styles as CSS modules.
    const PATHS_TO_TREAT_AS_CSS_MODULES = ASSET_PATHS.map( (path) => utils_paths.base(path).replace(/[\^\$\.\*\+\-\?=!:\|\\\/\(\)\[\]\{\},]/g, '\\$&') )

    const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
    const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

    // Loaders for styles that need to be treated as CSS modules.
    if (isUsingCSSModules) {
      const cssModulesLoader = [
	BASE_CSS_LOADER,
	'modules',
	'importLoaders=1',
	'localIdentName=[name]__[local]___[hash:base64:5]'
      ].join('&')

      webpackConfig.module.loaders.push({
	test: /\.scss$/,
	include: cssModulesRegex,
	loaders: [
	  'style',
	  cssModulesLoader,
	  'postcss',
	  'sass?sourceMap'
	]
      })

      webpackConfig.module.loaders.push({
	test: /\.css$/,
	include: cssModulesRegex,
	loaders: [
	  'style',
	  cssModulesLoader,
	  'postcss'
	]
      })
    }


    webpackConfig.module.loaders.push({
	test: /\.(js|jsx)$/,
	include: dir,
	loader: 'babel',
	query: {
	cacheDirectory: true,
	plugins: ['transform-runtime', 'transform-decorators-legacy'],
	presets: ['es2015', 'react', 'stage-0'],
	env: {
	  development: {
	    plugins: [
	      ['react-transform', {
		transforms: [{
		  transform: 'react-transform-hmr',
		  imports: ['react'],
		  locals: ['module']
		}, {
		  transform: 'react-transform-catch-errors',
		  imports: ['react', 'redbox-react']
		}]
	      }]
	    ]
	  },
	  production: {
	    plugins: [
	      'transform-react-constant-elements',
	      'transform-react-remove-prop-types'
	    ]
	  }
	}
      }
    });

    webpackConfig.module.loaders.push(
      {
	   test: /\.(png|jpg|eot|woff|woff2|ttf|svg)$/,
	   include: /.*/, // Because styleguidist requires either include or exclude.
	   loader: 'url?limit=8192',
       }
    )

    return webpackConfig
  }
}
