import Vue from 'vue';
import mergeJSON from 'merge-json';
import Router from 'vue-router';
import _ from 'underscore';
import ElementUI, { Message } from 'element-ui';
import axios from 'axios';
import fetch from '@/utils/fetch';
import App from './App';
import router from './router';
import { has } from './config/btnPermissions.js';
import { has2 } from './config/btnPermissions';
import store from './store/store';
import global_conf from './components/tools/GlobalConf';
import backendNgUtils from './page/common/js/util';
import routerAndNav from './config/routerAndNavPer.js';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import { request, cookie, wrapUrl, tripUrl, cleanObject } from './utils';
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.headers.post['Content-Type'] = '/api/application/json';
axios.interceptors.response.use((res) => {
	if (typeof res.data.errorCode !== 'undefined' && res.data.errorCode === 101) {
		window.location.href =
			res.data.result.loginUrl + '?backUrl= ' + encodeURIComponent(window.location.href);
	}
	return res;
});
// 权限判断
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'daily') {
	router.beforeEach((to, from, next) => {
		/**
		 * 跳转到外部项目, 不需要做权限判断
		 * 以 `/outside` 开头的路径
		 */
		const isOutside = to.path.indexOf('/outside') === 0;
		if (
			isOutside ||
			routerAndNav.checkRoutes(to.path) ||
			to.path === '/operatelog/IotOperateLog' ||
			to.path === '/oss/ossList'
		) {
			next();
		} else {
			if (to.path.startsWith('/layout/PermissionLimit')) {
				next();
			} else {
				const funcId = routerAndNav.getRouteFuncId(to.path);
				next('/layout/PermissionLimit/' + funcId);
			}
		}
	});
}

window.wrapUrl = wrapUrl;
window.tripUrl = tripUrl;
window._ = _;
Vue.prototype.$globalConf = global_conf; // 挂载全局变量到Vue实例上面

Vue.config.productionTip = false;
// 将API方法绑定到全局
Vue.prototype.$http = axios;
Vue.prototype.$fetch = fetch;
Vue.prototype.$request = request;
// import element
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(has);
Vue.use(has2);
Vue.use(routerAndNav);
// 绑定merge-json
Vue.prototype.$mergeJSON = mergeJSON;

// 设置cookie
Vue.prototype.$cookie = cookie;

Vue.use(backendNgUtils);

Vue.prototype.$tyHttp = function () {
	const body = cleanObject(arguments[1]);
	return axios.post
		.call(this, arguments[0], body, arguments[2])
		.then((res) => res.data)
		.then((result) => {
			if (result.code === '100') {
				return result.result;
			}
			Message.error(result.msg);
			return Promise.reject(result);
		})
		.catch((err) => {
			Message.error(err.message);
			return Promise.reject('internal error');
		});
};

if (isInIcestark()) {
	let vue;
	const mountNode = getMountNode();
	registerAppEnter(() => {
		vue = new Vue({
			store,
			router,
			render: (h) => h(App),
		}).$mount();
		mountNode.innerHTML = '';
		mountNode.appendChild(vue.$el);
	});

	registerAppLeave(() => {
		vue && vue.$destroy();
	});
} else {
	new Vue({
		store,
		router,
		render: (h) => h(App),
	}).$mount('#app');
}
