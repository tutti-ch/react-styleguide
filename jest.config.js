module.exports = {
  verbose: true,
  moduleDirectories: [ 'node_modules', 'src' ],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    '!src/components/**/*.test.{js,jsx}',
    '!tests/**/*.spec.{js,jsx}'
  ],
  coverageDirectory: 'coverage/',
  coverageReporters: ['html', 'lcov']
}
