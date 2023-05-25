/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const sassResourcesLoader = require('craco-sass-loader')

const overrideWebpack = {
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
          '@entities': path.resolve(__dirname, 'src/entities'),
        },
      }
      return webpackConfig
    },
  },
  options: {},
}

const sassLoader = {
  plugin: sassResourcesLoader,
  options: {
    resources: './src/shared/scss/index.scss', // Глобальные стили
  },
}

const plugins = [overrideWebpack, sassLoader]

const jest = {
  configure: (jestConfig) => {
    return {
      ...jestConfig,
      moduleNameMapper: {
        '^@app/(.+)': '<rootDir>/src/app/$1',
        '^@pages/(.+)': '<rootDir>/src/pages/$1',
        '^@widgets/(.+)': '<rootDir>/src/widgets/$1',
        '^@shared/(.+)': '<rootDir>/src/shared/$1',
        '^@entities/(.+)': '<rootDir>/src/entities/$1',
        '^@public/(.+)': '<rootDir>/public/$1',
        '\\.(css|scss)$': 'identity-obj-proxy',
        axios: 'axios/dist/node/axios.cjs',
      },
    }
  },
}

module.exports = { plugins, jest }
