var vue = require('vue-loader')
var webpack = require('webpack')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
var path = require('path')

module.exports = {
	entry: {		
		'compInsightsHome': './src/compInsightsHome.js'		
	},
	output: {
		path: path.join("../../content/lib/CompInsights/", 'static'),
		publicPath: '/static/',
		filename: '[name].js'
	},
	plugins: [
		new CommonsChunkPlugin("init.js"),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en\-ca|fr\-ca/)
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				// excluding some local linked packages.
				// for normal use cases only node_modules is needed.
				exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
				loader: 'babel?optional[]=runtime&loose=all'
			}
		],
		postLoaders: [
			//{
			//	test: /\.js$/,
			//	exclude: /\/(node_modules|bower_components)\//,
			//	loader: 'autopolyfiller',
			//	query: {browsers: ['last 2 versions', 'ie >= 9']}
			//}
		]
	},
	node: {
		fs: "empty"
	}
}

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
} else {
	module.exports.devtool = '#source-map'
}
