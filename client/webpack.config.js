const configFactory = require('react-scripts/config/webpack.config')
const config = 'development' === process.env.NODE_ENV ? configFactory('development') : configFactory('production')
module.exports = config
