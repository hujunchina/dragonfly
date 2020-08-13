import { env } from './env';

const hosts = {
	dev: 'https://public-data-dev.oss-cn-qingdao.aliyuncs.com',
	developer: 'https://public-data-dev.oss-cn-qingdao.aliyuncs.com',
	development: 'https://public-data-daily.oss-cn-shanghai.aliyuncs.com',
	daily: 'https://public-data-daily.oss-cn-shanghai.aliyuncs.com',
	production: 'https://images.tuyacn.com', // 线上环境，开发，日常环境目前用的daily,本地env.js配置 export const env = "daily"
	pre: 'https://images.tuyacn.com',
};

const apiRoot = {
	dev: '/api/',
	daily: '',
	production: '',
};
export const IMAGE_HOST = hosts[env];

export const API_ROOT = apiRoot[env];
