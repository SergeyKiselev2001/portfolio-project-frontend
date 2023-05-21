/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const sassResourcesLoader = require('craco-sass-loader')

module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/shared/scss/index.scss', // Глобальные стили
      },
    },
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.resolve = {
            ...webpackConfig.resolve,
            alias: {
              ...webpackConfig.resolve.alias,
              '@app': path.resolve(__dirname, 'src/app'),
              '@pages': path.resolve(__dirname, 'src/pages'),
              '@widgets': path.resolve(__dirname, 'src/widgets'),
              '@shared': path.resolve(__dirname, 'src/shared'),
            },
          }
          return webpackConfig
        },
      },
      options: {},
    },
  ],
}
