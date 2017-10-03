const path = require('path')

module.exports = {
  // Tells the styleguide where to search the components.
  components: 'src/components/**/[A-Z]*.js',

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
      name: 'CSS Style Guide',
      components: 'src/style-guide/**/[A-Z]*.js'
    },
    {
      name: 'UI Components',
      // content: 'docs/ui-components.md'
      components: 'src/components/**/[A-Z]*.js'
    }
  ],

  require: [
    // Include our main scss file.
    path.join(__dirname, 'src/assets/scss/main.scss')
  ]
}