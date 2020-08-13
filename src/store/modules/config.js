// 项目配置
import { merge } from 'lodash';
import fetch from '@/utils/fetch';
import localStore, { aDay } from '@/utils/store';

// 开发环境
const development = {
	AY: {
		name: '中国区',
		assetPrefix: '',
		application: {
			backendng: '',
			backend: '',
			hestia: '',
			acl: 'http://acl.dev.tuya-inc.cn:7045',
		},
	},
};

// 日常环境
const daily = {
	SH: {
		name: '中国区',
		assetPrefix: 'https://images.daily.tuya-inc.cn',
		application: {
			backendng: 'https://backendng-daily.tuya-inc.cn:7799',
			backend: 'https://backend-daily.tuya-inc.cn:7799',
			hestia: 'https://hestia-daily.tuya-inc.cn:7799',
			acl: 'https://acl-daily.tuya-inc.cn:7799',
			hardware: 'https://iot-hardware.fast-inside.tuya-inc.cn:7799',
		},
	},
};

// 预发环境, 多区共用的配置
const preBase = {
	application: {
		hardware: 'https://iot-hardware.fast-inside.wgine.com:7799',
	},
};

// 预发环境
const pre = {
	AY: merge(
		{
			name: '中国区',
			assetPrefix: 'https://images.tuyacn.com',
			application: {
				backendng: 'https://backendng-cn.wgine.com:7799',
				backend: 'https://backend-cn.wgine.com:7799',
				hestia: 'https://hestia-cn.wgine.com:7799',
				acl: 'https://acl-cn.wgine.com:7799',
			},
		},
		preBase,
	),
	AZ: merge(
		{
			name: '美国区',
			assetPrefix: 'https://images.tuyaus.com',
			application: {
				backendng: 'https://backendng-us.wgine.com:7799',
				backend: 'https://backend-us.wgine.com:7799',
				hestia: 'https://hestia-us.wgine.com:7799',
				acl: 'https://acl-us.wgine.com:7799',
			},
		},
		preBase,
	),
	EU: merge(
		{
			name: '欧洲区',
			assetPrefix: 'https://images.tuyaeu.com',
			application: {
				backendng: 'https://backendng-eu.wgine.com:7799',
				backend: 'https://backend-eu.wgine.com:7799',
				hestia: 'https://hestia-eu.wgine.com:7799',
				acl: 'https://acl-eu.wgine.com:7799',
			},
		},
		preBase,
	),
	IN: merge(
		{
			name: '印度区',
			assetPrefix: 'https://images.tuyain.com',
			application: {
				backendng: 'https://backendng-ind.wgine.com:7799',
				backend: 'https://backend-ind.wgine.com:7799',
				hestia: 'https://hestia-ind.wgine.com:7799',
				acl: 'https://acl-ind.wgine.com:7799',
			},
		},
		preBase,
	),
	UE: merge(
		{
			name: '美东区',
			assetPrefix: 'https://images-ueaz.tuyaus.com',
			application: {
				backendng: 'https://backendng-ueaz.wgine.com:7799',
				backend: 'https://backend-ueaz.wgine.com:7799',
				hestia: 'https://hestia-ueaz.wgine.com:7799',
				acl: 'https://acl-ueaz.wgine.com:7799',
			},
		},
		preBase,
	),
};

// 线上环境, 多区共用的配置
const prodBase = {
	application: {
		hardware: 'https://iot.tuya-inc.com:7799',
	},
};

// 线上环境
const prod = {
	AY: merge(
		{
			name: '中国区',
			assetPrefix: 'https://images.tuyacn.com',
			application: {
				backendng: 'https://backendng-cn.tuya-inc.com:7799',
				backend: 'https://backend-cn.tuya-inc.com:7799',
				hestia: 'https://hestia-cn.tuya-inc.com:7799',
				acl: 'https://acl-cn.tuya-inc.com:7799',
			},
		},
		prodBase,
	),
	AZ: merge(
		{
			name: '美国区',
			assetPrefix: 'https://images.tuyaus.com',
			application: {
				backendng: 'https://backendng-us.tuya-inc.com:7799',
				backend: 'https://backend-us.tuya-inc.com:7799',
				hestia: 'https://hestia-us.tuya-inc.com:7799',
				acl: 'https://acl-us.tuya-inc.com:7799',
			},
		},
		prodBase,
	),
	EU: merge(
		{
			name: '欧洲区',
			assetPrefix: 'https://images.tuyaeu.com',
			application: {
				backendng: 'https://backendng-eu.tuya-inc.com:7799',
				backend: 'https://backend-eu.tuya-inc.com:7799',
				hestia: 'https://hestia-eu.tuya-inc.com:7799',
				acl: 'https://acl-eu.tuya-inc.com:7799',
			},
		},
		prodBase,
	),
	IN: merge(
		{
			name: '印度区',
			assetPrefix: 'https://images.tuyain.com',
			application: {
				backendng: 'https://backendng-ind.tuya-inc.com:7799',
				backend: 'https://backend-ind.tuya-inc.com:7799',
				hestia: 'https://hestia-ind.tuya-inc.com:7799',
				acl: 'https://acl-ind.tuya-inc.com:7799',
			},
		},
		prodBase,
	),
	UE: merge(
		{
			name: '美东区',
			assetPrefix: 'https://images-ueaz.tuyaus.com',
			application: {
				backendng: 'https://backendng-ueaz.tuya-inc.com:7799',
				backend: 'https://backend-ueaz.tuya-inc.com:7799',
				hestia: 'https://hestia-ueaz.tuya-inc.com:7799',
				acl: 'https://acl-ueaz.tuya-inc.com:7799',
			},
		},
		prodBase,
	),
};

const CONFIG_MAP = {
	development,
	daily,
	pre,
	prod,
};

// BASE_CONFIG_KEY, 不能随便改, 要兼容旧代码
const BASE_CONFIG_KEY = 'baseConfig';

const config = {
	namespaced: false, // 不设 namespace
	state: {
		baseConfig: {},
	},
	getters: {
		// 各个大区配置集合
		regionConfigMap: (state) => {
			const { env } = state.baseConfig || {};
			return CONFIG_MAP[env] || {};
		},
		// 当前大区配置
		config: (state, getters) => {
			const { regionConfigMap, baseConfig } = getters;
			const { serverRegion } = baseConfig;
			const regionConfig = regionConfigMap[serverRegion];
			return regionConfig || {};
		},
		baseConfig: (state) => {
			return state.baseConfig || {};
		},
	},
	mutations: {
		setBaseConfig(state, baseConfig) {
			state.baseConfig = baseConfig;
		},
	},
	actions: {
		async fetchBaseConfig({ commit }) {
			let baseConfig = localStore.get(BASE_CONFIG_KEY);
			if (!baseConfig) {
				// 避免重复调用接口
				baseConfig = await fetch({
					url: '/api/config/get',
				});
			}
			// 只缓存一天, 避免数据失去时效性
			window.acl = CONFIG_MAP[baseConfig.env][baseConfig.serverRegion]?.application.acl;
			localStore.set(BASE_CONFIG_KEY, baseConfig, Date.now() + aDay);
			commit('setBaseConfig', baseConfig);
			const env = baseConfig.env;
			if (env === 'daily') {
				document.title = '管理后台(日常环境)';
			} else if (env === 'pre') {
				document.title = '管理后台(预发环境)';
			} else if (env === 'prod') {
				document.title = '管理后台(线上环境)';
			} else if (env === 'dev') {
				document.title = '管理后台(开发环境)';
			} else {
				document.title = '管理后台';
			}
		},
	},
};

export default config;
