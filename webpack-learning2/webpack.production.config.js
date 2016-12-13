var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

//定义一些常用路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {

	entry: {
		app:path.resolve(APP_PATH, 'index.js'),
		mobile: path.resolve(APP_PATH, 'mobile.js'),
	    vendors: []
	},

	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js'
	},

	plugins: [
    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
    	new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new HtmlWebpackPlugin({
			title: 'hello world app',
			template: path.resolve(TEM_PATH, 'index.html'), 
			filename: 'index.html', 
			chunks: ['app', 'vendors'], 
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			title: 'hello Mobile app',
			template: path.resolve(TEM_PATH, 'mobile.html'), 
			filename: 'mobile.html', 
			chunks: ['mobile', 'vendors'], 
			inject: 'body'

		})
	],

	module: {
		loaders: [
			{
				test:/\.css$/,
				loaders:['style', 'css'],
				include: APP_PATH
			},
			{
				test:/\.(png|jpg)$/,
				loader:'url?limit=40000'
			},
			{
				test:/\.jsx?$/,
				loader:'babel',
				include: APP_PATH,
				query:{
					presets:['es2015']
				}
			},
		]
	}
};