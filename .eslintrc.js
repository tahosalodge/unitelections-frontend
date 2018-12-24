module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['redux-saga'],
  env: {
    browser: true,
  },
  rules: {
    'react/destructuring-assignment': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'loading'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src/', 'node_modules/'],
      },
    },
  },
};
