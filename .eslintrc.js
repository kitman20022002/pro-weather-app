module.exports = {
 extends: ['react-app','airbnb', 'prettier'],
 plugins: ['prettier'],
 parser: 'babel-eslint',
 parserOptions: {
   sourceType: 'module',
   allowImportExportEverywhere: false,
   codeFrame: false,
 },
 env: {
   browser: true,
   jest: true,
 },
 rules: {
   'prettier/prettier': ['error'],
   'no-console': 2,
   'no-debugger': 'error',
   'no-alert': 'error',
   'default-case': 'error',
   'max-len': [
     'error',
     {
       code: 120,
     },
   ],
   'prefer-promise-reject-errors': ['off'],
   'react/jsx-filename-extension': ['off'],
   'react/prop-types': ['off'],
   'no-return-assign': ['off'],
 },
};
