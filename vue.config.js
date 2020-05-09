const path = require('path')

const ROOT = path.resolve(__dirname)

function root(...args) {
  const newArgs = Array.prototype.slice.call(args, 0)
  return path.join(...[ROOT].concat(newArgs))
}

module.exports = {
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.ts', '.vue'],
      alias: {
        '@core': root('packages/core/src'),
        '@client': root('packages/mix-it-client/src'),
        '@front': root('packages/mix-it-front/src')
      }
    }
  }
}
