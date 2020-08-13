// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

const GlobalConfig = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		// assetsPublicPath: '/dist/',
		assetsPublicPath: '/',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report,
	},
	dev: {
		env: require('./dev.env'),
		port: process.env.PORT || 8804,
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		autoOpenBrowser: true,
		assetsSubDirectory: 'assets',
		assetsPublicPath: '/',
		apiDomain: 'http://localhost:8804/api/',
		domain: 'http://localhost',
		host: 'localhost',

		proxyTable: {
			'/api': {
				target: 'http://localhost:7037/',
				pathRewrite: { '^/api/': '' },
				changeOrigin: true,
				headers: {},
			},
			/**
			 * 前端开发人员使用, 请勿删除
			 */
			// '/api': {
			//   target: 'https://backendng-daily.tuya-inc.cn:7799', // 日常
			//   // target: 'https://backendng-cn.wgine.com:7799', // 预发
			//   changeOrigin: true,
			// },
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		sourceMap: false,
		gzip: false,
		gzipExtensions: ['js', 'css'],
	},
	daily: {
		env: require('./daily.env'),
		port: process.env.PORT || 8804,
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		autoOpenBrowser: true,
		assetsSubDirectory: 'assets',
		assetsPublicPath: '/',
		apiDomain: 'https://backendng.tuya-inc.cn:7788/api',
		domain: 'http://localhost',
		proxyTable: {
			'/api': {
				target: 'http://backendng.daily.svc:7037/',
				pathRewrite: { '^/api/': '' },
				changeOrigin: true,
				headers: {},
			},
		},
		sourceMap: false,
		gzip: false,
		gzipExtensions: ['js', 'css'],
	},
	pre: {
		env: require('./pre.env'),
		port: process.env.PORT || 8804,
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		autoOpenBrowser: true,
		assetsSubDirectory: 'assets',
		assetsPublicPath: '/',
		apiDomain: 'https://backendng.cn.wgine.com:7788/api',
		domain: 'http://localhost',
		proxyTable: {
			'/api': {
				target: 'http://backendng.pre.svc:7037/',
				pathRewrite: { '^/api/': '' },
				changeOrigin: true,
				headers: {},
			},
		},
		sourceMap: false,
		gzip: false,
		gzipExtensions: ['js', 'css'],
	},
	prod: {
		env: require('./prod.env'),
		port: process.env.PORT || 8804,
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		autoOpenBrowser: true,
		assetsSubDirectory: 'assets',
		assetsPublicPath: '/',
		apiDomain: 'https://backendng.cn.tuya-inc.com:7788/api',
		domain: 'http://localhost',
		proxyTable: {
			'/api': {
				target: 'http://localhost:8080/',
				pathRewrite: { '^/api/': '' },
				changeOrigin: true,
				headers: {},
			},
		},
		sourceMap: false,
		gzip: false,
		gzipExtensions: ['js', 'css'],
	},
};
if (process.env.NODE_ENV === 'daily') {
	module.exports = GlobalConfig.daily;
} else if (process.env.NODE_ENV === 'pre') {
	// 线上直接用预发的镜像env.NODE_ENV = 'pre'
	if (process.env['DEPLOY_ENV'] === 'pre') {
		module.exports = GlobalConfig.daily;
	} else {
		module.exports = GlobalConfig.pre;
	}
} else if (process.env.NODE_ENV === 'prod') {
	module.exports = GlobalConfig.prod;
} else {
	module.exports = GlobalConfig.dev;
}
