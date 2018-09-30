const { resolve } = require('path');
const proxyUrl = 'http://47.99.42.198';
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
    proxy 
  }
}