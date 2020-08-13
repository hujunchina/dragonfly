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
		open: true,
		hot: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		proxy: {
			'/api/*': {
				target: 'https://backendng-daily.tuya-inc.cn:7799/',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
