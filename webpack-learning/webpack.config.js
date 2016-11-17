var webpack = require('webpack');
var path =require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	
	entry: path.resolve(__dirname, "app/main.js"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name]-[hash]-[id].js"
	},

	module:{
		loaders:[
			{
				test:/\.json$/,
				loader:"json"
			},
			{
				test:/\.jsx?$/,
				exclude:/node_modules/,
				loader:'babel'
			},
			{
				test:/\.css/,
				loader:ExtractTextPlugin.extract('style','css?modules!postcss')
			}
		]
	},

	postcss:[
		require('autoprefixer')
	],

	plugins: [
		new webpack.BannerPlugin("Copyright Duolaidian."),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname, "app/index.tmpl.html") 
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin(),
	    new ExtractTextPlugin("[name]-[hash]-[id].css")
	],

	devServer:{
		contentBase:"./build",
		colors:true,
		historyApiFallback:true,
		inline:true,
		hot:true,
		port:8081
	}
}