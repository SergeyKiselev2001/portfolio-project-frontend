/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  plugins: [
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
