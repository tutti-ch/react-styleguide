module.exports = process.env.NODE_ENV === 'production'
  ? require('./config/webpack.umd.config')
  : require('./config/webpack.dev.config')