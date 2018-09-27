const { resolve } = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@c', resolve(__dirname, './src/components'));
  }
}