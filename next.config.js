const path = require('path')
const withImages = require('next-images')

module.exports = withImages({
  webpack: config => {
    config.resolve.modules = [path.resolve(__dirname, 'src'), 'node_modules'];
    return config;
  }
})