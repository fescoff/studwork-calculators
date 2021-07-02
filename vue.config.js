const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: ['global'],
        paths: [path.resolve(__dirname, 'src/style')],
      },
    },
  },

  chainWebpack: config => {
    config.resolve.extensions.prepend('.vue');

    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(opts => ({ ...opts, emitWarning: true }));
  },
};
