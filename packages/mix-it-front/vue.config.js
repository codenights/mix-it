const path = require('path')
const ROOT = path.resolve(__dirname)

function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

module.exports = {
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.ts', '.vue'],
      alias: {
        '@core': root('../core/src'),
        '@client': root('./src'),
        '@front': root('../mix-it-front/src')
      }
    }
  }
}
