module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  globals: {
    'ts-jest': {
      tsConfig: '../../tsconfig.json'
    },
    'vue-jest': {
      tsConfig: '../../tsconfig.json'
    }
  },

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/../core/src/$1',
    '@client/(.*)': '<rootDir>/../mix-it-client/src/$1',
    '@front/(.*)': '<rootDir>/../mix-it-front/src/$1'
  }
}
