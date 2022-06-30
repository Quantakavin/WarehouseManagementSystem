module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'prettier'
  ],
  rules: {
    "prettier/prettier": "error"
  },

  //  prettier: disabler,
  // root: true,
  // extends: '@react-native-community',
  // rules: {
  //   'prettier/prettier': 0,
  // },
  
};