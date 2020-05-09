module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/packages/core/src/$1',
    '@client/(.*)': '<rootDir>/packages/mix-it-client/src/$1',
    '@front/(.*)': '<rootDir>/packages/mix-it-front/src/$1'
  }
}
