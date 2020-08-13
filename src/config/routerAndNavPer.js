const pathToRegexp = require('path-to-regexp');

const routerAndNav = {
	checkRoutes: function (path) {
		const routes = JSON.parse(localStorage.getItem('routes'));

		if (routes !== null || routes !== undefined) {
			const routes_regexp = routes.map(getRouteToRegexp); // 转化路由为正则表达式
			for (const reg of routes_regexp) {
				if (reg.exec(path) || path === '/') {
					return true;
				}
				// 暂时做一个这样的处理 后续如果权限全开的页面增加了再考虑改为可配置
				if (path == '/operatelog/IotOperateLog' || path == '/oss/ossList') {
					return true;
				}
			}
		}
		return false;
	},
	getRouteFuncId: function (path) {
		const routes = JSON.parse(localStorage.getItem('allRoutes'));
		for (const route of routes) {
			for (const key in route) {
				if (route[key].startsWith('route')) {
					const reg = pathToRegexp(route[key].substring(6));
					if (reg.exec(path)) {
						return key;
					}
				} else {
					const reg = pathToRegexp(route[key]);
					if (reg.exec(path)) {
						return key;
					}
				}
			}
		}
		return '-1';
	},
	getAclUrl: function (path) {
		// eslint-disable-next-line no-unused-vars
		const funId = this.getRouteFuncId(path);
	},
};
const getRouteToRegexp = function (routeStr) {
	// routeStr 约定路由字符串为 route:/user/:id/detail
	// 去除头部route:
	// 转化正则
	return pathToRegexp(routeStr.substring(6));
};
export default routerAndNav;
