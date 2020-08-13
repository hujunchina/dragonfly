'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	assets: resolveApp('src/assets'),
	appDist: resolveApp('dist'),
	appHtml: resolveApp('src/index.html'),
	appIndexJs: resolveApp('src/main.js'),
	appSrc: resolveApp('src'),
	appNodeModules: resolveApp('node_modules'),
	appComponents: resolveApp('src/components'),
	appPages: resolveApp('src/page'),
	appStyles: resolveApp('src/styles'),
	appConfig: resolveApp('config'),
	appServices: resolveApp('src/services'),
	appStore: resolveApp('src/store'),
	appUtils: resolveApp('src/utils'),
};
