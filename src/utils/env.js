import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// eslint-disable-next-line no-useless-escape
let BACKENDNG_URL = /http[s]{0,1}:\/\/backendng[-.]([a-zA-Z0-9]*).([a-zA-Z-0-9]*).[a-z-.A-Z0-9\/:#]*/;

const BACKEND_ENV = {
	env_defalut: {
		env: 'daily',
		location: 'cn',
	},
	ENV: {
		daily: 'daily',
		dev: 'development',
		wgine: 'pre',
		'tuya-inc': 'prod',
	},
	envUtils: {
		formatEnv: function (loca, env) {
			return BACKEND_ENV.ENV[env] || BACKEND_ENV.ENV[loca];
		},
	},
};

/**
 * 根据前端url判断当前环境
 * rsts[1]: dev daily cn us en  ueaz
 * rsts[2]: wgine,tuya-inc
 * @returns {*}
 */
export default function localenv() {
	let hostInfo = location.href.match(BACKENDNG_URL);
	if (hostInfo.length < 3) {
		return BACKEND_ENV.env_defalut;
	}
	let env = {
		env: BACKEND_ENV.envUtils.formatEnv(hostInfo[2], hostInfo[1]) || process.env.NODE_ENV,
		location: hostInfo[1],
	};
	return env;
}
