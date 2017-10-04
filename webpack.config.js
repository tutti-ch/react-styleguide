module.exports = process.env.NODE_ENV === 'umd'
  ? require('./config/webpack.umd.config')
  : require('./config/webpack.dev.config')