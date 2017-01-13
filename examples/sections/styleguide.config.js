const path = require('path')
const glob = require('glob')
const extend = require('util')._extend

const REACT_MYPAGES_SRC = '../../../react-mypages/src'

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

module.exports = {
  title: 'tutti.ch Style Guide',
  defaultExample: false,
  skipComponentsWithoutExample: true,
  styleguideDir: 'docs/styleguide', // this allow to publish the styleguide in GH-pages
  sections: [
    {
      name: 'Components',
      components: function() {
	return glob.sync(path.resolve(__dirname, REACT_MYPAGES_SRC + '/components/**/*.js')).filter(function(module) {
	  return /\/[A-Z]\w*\.js$/.test(module)
	})
      }
    },
    {
      name: 'Styleguide',
      components: function() {
	return glob.sync(path.resolve(__dirname, REACT_MYPAGES_SRC + '/styleguide/components/**/*.js')).filter(function(module) {
	  return /\/[A-Z]\w*\.js$/.test(module)
	})
      }
    },
  ],
  updateWebpackConfig: function(webpackConfig, env) {
    const dir = [
      path.resolve(__dirname, REACT_MYPAGES_SRC + '/components'),
      path.resolve(__dirname, REACT_MYPAGES_SRC + '/styleguide'),
      path.resolve(__dirname, REACT_MYPAGES_SRC + '/helpers')
    ]

    webpackConfig.sassLoader = {
      includePaths: utils_paths.client('styles')
    }

    // add fallback resolve path so that we can include components
    // like components/Foo/Foo
    // that was not included in the default config so we had to extend it
    webpackConfig.resolve = extend(webpackConfig.resolve, {
      fallback: [utils_paths.base(REACT_MYPAGES_SRC)]
    })

    const BASE_CSS_LOADER = 'css?sourceMap&-minimize&camelCase'

    // Add any packge names here whose styles need to be treated as CSS modules.
    // These paths will be combined into a single regex.
    const PATHS_TO_TREAT_AS_CSS_MODULES = [
      // 'react-toolbox', (example)
    ]

    // If config has CSS modules enabled, treat this project's styles as CSS modules.
    PATHS_TO_TREAT_AS_CSS_MODULES.push(
      utils_paths.base(REACT_MYPAGES_SRC).replace(/[\^\$\.\*\+\-\?=!:\|\\\/\(\)\[\]\{\},]/g, '\\$&')
    )

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
	exclude: /(node_modules|\.min\.)/,
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
