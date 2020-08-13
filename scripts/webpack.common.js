const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const env = process.env.NODE_ENV;
const isEnvDevelopment = env === 'development';

const miniCssExtractPluginConfig = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: isEnvDevelopment,
		reloadAll: true,
	},
};
const vueStyleLoaderConfig = {
	loader: 'vue-style-loader',
	options: {},
};

const packageJsonName = require('../package.json').name;

const publicPaths = {
	development: '//127.0.0.1:9902/',
	production: `//static1.tuyacn.com/static/${packageJsonName}/`,
};

const currentEnvPublicPath = publicPaths[env];

module.exports = {
	entry: paths.appIndexJs,
	output: {
		path: paths.appDist,
		filename: isEnvDevelopment ? 'js/bundle.js' : 'js/[name].[contenthash:5].js',
		chunkFilename: isEnvDevelopment ? 'js/[name].chunk.js' : 'js/[name].[contenthash:5].chunk.js',
		publicPath: currentEnvPublicPath,
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue: 'vue/dist/vue.esm.js',
			'@': paths.appSrc,
		},
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: packageJsonName,
			filename: 'index.html',
			template: paths.appHtml,
		}),
		new VueLoaderPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.jsx?$/,
				include: paths.appSrc,
				loader: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.css$/,
				include: paths.appNodeModules,
				use: [
					isEnvDevelopment ? vueStyleLoaderConfig : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.css$/,
				exclude: paths.appNodeModules,
				use: [
					isEnvDevelopment ? vueStyleLoaderConfig : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.less$/,
				include: paths.appNodeModules,
				use: [
					isEnvDevelopment ? vueStyleLoaderConfig : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				test: /\.less$/,
				exclude: paths.appNodeModules,
				use: [
					isEnvDevelopment ? vueStyleLoaderConfig : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				include: paths.appNodeModules,
				use: [
					isEnvDevelopment ? 'vue-style-loader' : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: paths.appNodeModules,
				use: [
					isEnvDevelopment ? 'vue-style-loader' : miniCssExtractPluginConfig,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: 'images/[name].[hash:5].[ext]',
							publicPath: currentEnvPublicPath,
						},
					},
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[hash:5].[ext]',
					publicPath: currentEnvPublicPath,
				},
			},
		],
	},
};
