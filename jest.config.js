module.exports = {
  verbose: true,
  moduleDirectories: [ 'node_modules', 'src' ],
  moduleNameMapper: {
    '.*\\.(css|scss)$': '<rootDir>/test/config/styles.js'
  },
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    '!src/components/**/*.test.{js,jsx}',
    '!tests/**/*.spec.{js,jsx}'
  ],
  coverageDirectory: 'coverage/',
  coverageReporters: ['html', 'lcov'],
  setupFiles: [
    '<rootDir>/test/config/shim.js',
    '<rootDir>/test/config/setup.js'
  ]
}
