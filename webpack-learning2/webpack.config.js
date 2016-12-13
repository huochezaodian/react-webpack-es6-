var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

//定义一些常用路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是那个文件名字
	entry: {
		app:path.resolve(APP_PATH, 'index.js'),
		mobile: path.resolve(APP_PATH, 'mobile.js'),
	    //添加要打包在vendors里面的第三方库
	    vendors: []
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
	//添加我们的插件 会自动生成一个html文件
	plugins: [
		//这个使用uglifyJs压缩你的js代码
    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
    	//把入口文件里面的数组打包成verdors.js
    	new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new HtmlWebpackPlugin({
			title: 'hello world app',
			 template: path.resolve(TEM_PATH, 'index.html'), 
			 filename: 'index.html', 
			 //chunks这个参数告诉插件要引用entry里面的哪几个入口 
			 chunks: ['app', 'vendors'], 
			 //要把script插入到标签里 
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

	devServer: {
		historyApiFallback: true,
		hot: true,//为热替换准备的 不是自动刷新 不加也会自动刷新
		inline: true,
		progress: true,
		port: 8090,
		proxy: {//添加ajax请求
			'/api/*': {
				target: 'http://localhost:5000',
				secure: false
			}
		}
	},
	//webpack的处理顺序是perLoaders - loaders - postLoaders
	module: {
		perloaders:[
			{
				test:/\.jsx?$/,
				include:APP_PATH,
				loader:'jshint-loader'
			}
		],
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
	},

	//配置jshint的选项，支持es6的校验
	jshint:{
		"esnext": true
	},

	devtool:'evel-source-map'//显示你出错代码的位置
};