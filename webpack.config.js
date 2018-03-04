const glob = require('glob')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HTMLReg = /\/([\w-]+)(?=\.html)/
const JSReg = /\/([\w-]+)(?=\.js)/

const html = glob.sync('pages/**/*.html').map(path => {
	let name = path.match(HTMLReg)[1]
	return new HTMLWebpackPlugin({
		template: path,
		filename: name + '.html',
		chunks: [name]
	})
})

const entries = glob.sync('pages/**/*.js').reduce((prev, next) => {
	let name = next.match(JSReg)[1]
	prev[name] = './' + next
	return prev
}, {})

module.exports = {
	entry: entries,
	output: {
		filename: 'js/[name].[chunkhash:8].js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options:{
              minimize: true
            }
          }
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
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/[name].[contenthash:8].css')
	].concat(html)
}