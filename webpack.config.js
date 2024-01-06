const path = require('path');

module.exports = {
  entry: './script/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  mode : "production",
  watch: true
};