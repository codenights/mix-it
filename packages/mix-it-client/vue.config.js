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
        '@core': root('../core/src'),
        '@client': root('../mix-it-client/src'),
        '@front': root('./src')
      }
    }
  }
}
