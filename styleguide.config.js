const path = require('path')
const glob = require('glob')
const extend = require('util')._extend
const loaders = require('loaders')

const REACT_MYPAGES_SRC = 'node_modules/react-mypages/src'
const REACT_MYPAGES_HELPERS = REACT_MYPAGES_SRC + '/helpers'
const REACT_STYLEGUIDE_COMPONENTS = 'styleguide'

const ASSET_PATHS = [REACT_MYPAGES_SRC, REACT_STYLEGUIDE_COMPONENTS]

function getComponents(directory) {
  return function() {
    return glob.sync(path.resolve(__dirname, directory + '/components/**/*.js')).filter(function(module) {
      return /\/[A-Z]\w*\.js$/.test(module)
    })
  };
}

module.exports = {
  template: 'templates/index.html',
  title: 'tutti.ch Style Guide',
  defaultExample: false,
  skipComponentsWithoutExample: true,
  styleguideDir: 'docs', // this allow to publish the styleguide in GH-pages
  sections: [{
      name: 'Components',
      components: getComponents(REACT_MYPAGES_SRC)
    },
    {
      name: 'Styleguide',
      components: getComponents(REACT_STYLEGUIDE_COMPONENTS)
    }
  ]
}
