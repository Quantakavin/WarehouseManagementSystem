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

<<<<<<< HEAD
  //  prettier: disabler,
  // root: true,
  // extends: '@react-native-community',
  // rules: {
  //   'prettier/prettier': 0,
  // },
  
=======
  prettier: disabler,
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
  },
>>>>>>> a201cd595d4660f068d5f122fd418f700a4b13ec
};