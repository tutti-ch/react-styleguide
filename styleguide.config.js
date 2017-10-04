const path = require('path')

module.exports = {
  styleguideDir: 'docs',

  // @see https://react-styleguidist.js.org/docs/components.html#sections
  //
  // You can group components into sections or add extra Markdown documents
  // to your style guide. Each section consists of (all fields are optional):
  // -- name: section title
  // -- content: A glob pattern string or a function returning a list of components.
  //             The same rule apply as for the root components option.
  // -- sections: Array of subsections (can be nested)
  sections: [
    {
      name: 'Styles',
      components: 'src/styles/**/[A-Z]*.js'
    },
    {
      name: 'Components',
      components: 'src/components/**/[A-Z]*.js'
    }
  ],

  require: [
    // Include our main scss file.
    path.join(__dirname, 'src/assets/scss/main.scss')
  ]
}