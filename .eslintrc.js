module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['import'],
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript', 'plugin:prettier/recommended'],
  settings: {
    // use a glob pattern
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    'prettier/prettier': 'error',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'arrow-parens': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: "./"
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
