const { resolve } = require('path');
const proxyUrl = 'http://118.31.6.176:9999';
const localPath = '/';

const serviceList = [
  `${localPath}auth`,
  `${localPath}admin`,
  `${localPath}code`,
  `${localPath}gen`,
  `${localPath}daemon`
]

let proxy = {};

serviceList.forEach(service => {
  proxy[service] = {
    target: proxyUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^${service}`] : service
    }
  }
});

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@c', resolve(__dirname, './src/components'));
  },
  devServer: {
    open: true,
    proxy 
  }
}