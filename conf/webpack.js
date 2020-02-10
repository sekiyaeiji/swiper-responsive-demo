const webpack = require('webpack')
const PrettierPlugin = require('prettier-webpack-plugin')

module.exports = {
  entry: {
    common: './src/js/common.js'
  },
  output: {
    path: __dirname + '/../dist/js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: './conf/eslintrc.js'
        },
      },
      {
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/
      },
    ]
  },
  plugins: [
    new PrettierPlugin({
      printWidth: 120,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'all',
      semi: false,
      bracketSpacing: true
    })
  ]
}
