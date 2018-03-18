const webpack = require('webpack')
const glob = require('glob')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const HTMLReg = /\/([\w-]+)(?=\.html)/
const JSReg = /\/([\w-]+)(?=\.js)/

const html = glob.sync('src/pages/**/*.html').map(path => {
  let name = path.match(HTMLReg)[1]
  return new HTMLWebpackPlugin({
    template: path,
    filename: name + '/' + name + '.html',
    chunks: [name, 'vendor', 'manifest']
  })
})

const entries = glob.sync('src/pages/**/*.js').reduce((prev, next) => {
  let name = next.match(JSReg)[1]
  prev[name] = './' + next
  return prev
}, {})

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: entries,
  output: {
    filename: '[name]/[name].[chunkhash:8].js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader'
          }
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader!',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: 'css-loader!resolve-url-loader!sass-loader?sourceMap',
              fallback: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              use: 'css-loader!resolve-url-loader!sass-loader?indentedSyntax',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextPlugin({
      filename: '[name]/[name].[contenthash:8].css',
      allChunks: true // `allChunks` is needed to extract from extracted chunks as well
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      deepChildren: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: "vendor/manifest.js",
      minChunks: Infinity
    }),
  ].concat(html)
}