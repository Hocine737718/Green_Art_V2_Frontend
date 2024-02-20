const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
});
module.exports = {
  configureWebpack: {
    performance: {
      hints: false // Désactive les avertissements de performance
    }
  }
};
