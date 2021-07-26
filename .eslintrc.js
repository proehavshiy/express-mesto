module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    // 'no-underscore-dangle': off,
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
