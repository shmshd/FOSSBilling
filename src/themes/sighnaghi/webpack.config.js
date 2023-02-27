const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('./build/')
  .setPublicPath('/themes/sighnaghi/build')

  .addEntry('main', './assets/js/main.js')

  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabel((config) => {
    config.plugins.push('@babel/plugin-proposal-class-properties');
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })
  .enableSassLoader()
  .enablePostCssLoader((options) => {
    options.postcssOptions = {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    };
  })
  .configureTerserPlugin((options) => {
    if (Encore.isProduction()) {
      options.terserOptions = {
        output: {
          comments: false,
        },
      };
    }
  });

module.exports = Encore.getWebpackConfig();
