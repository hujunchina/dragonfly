const paths = require('./paths');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		contentBase: paths.appDist,
		compress: true,
		port: 9902,
		historyApiFallback: true,
		open: false,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		proxy: {
			'/api/*': {
				target: 'https://backendng-dev.tuya-inc.cn:7799/',
				changeOrigin: true,
				secure: false,
			},
			'/proxy/*': {
				target: 'https://backendng-dev.tuya-inc.cn:8867/',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
