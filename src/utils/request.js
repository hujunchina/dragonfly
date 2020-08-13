import { API_ROOT } from '@/config/host.js';
import { Message } from 'element-ui';

// 配置API接口地址
// var root = '/api/'
// 引用axios
const axios = require('axios');
// 自定义判断元素类型JS
function toType(obj) {
	return {}.toString
		.call(obj)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
	for (const key in o) {
		if (o[key] === null) {
			delete o[key];
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim();
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key]);
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key]);
		}
	}
	return o;
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure) {
	if (params) {
		params = filterNull(params);
	}

	axios({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
		baseURL: API_ROOT,
		withCredentials: false,
	})
		.then((res) => {
			if (res.code == 0 || (res.data && res.data.code === 0)) {
				if (success) {
					success(res.data);
				}
			} else {
				if (failure) {
					failure(res.data);
				} else {
					Message.error({ message: res.data && res.data.msg });
				}
			}
		})
		.catch((err) => {
			const res = err.response;
			if (err) {
				const msg = '发生错误啦：' + res.status + '-' + res.statusText;
				Message.error({ message: msg });
			}
		});
}

// 返回在vue模板中的调用接口
export const http = {
	get: function (url, params, success, failure) {
		return apiAxios('GET', url, params, success, failure);
	},
	post: function (url, params, success, failure) {
		return apiAxios('POST', url, params, success, failure);
	},
	put: function (url, params, success, failure) {
		return apiAxios('PUT', url, params, success, failure);
	},
	delete: function (url, params, success, failure) {
		return apiAxios('DELETE', url, params, success, failure);
	},
};

/**
 * 这种结构体的返回适用，{ "result" : any, "t" : 1561526320200, "success" : true, "status" : "ok" }
 * @param {*} method
 * @param {*} url
 * @param {*} params
 * @param {*} success
 * @param {*} failure
 */
function apiAxiosResult(method, url, params, success, failure) {
	if (params) {
		params = filterNull(params);
	}
	if (typeof success !== 'function') {
		success = null;
	}
	if (typeof failure !== 'function') {
		failure = null;
	}
	if (url.indexOf('/api') !== 0 && url.indexOf('/mock') !== 0) {
		url = `/api${url}`;
	}

	axios({
		method: method,
		url: url,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
		baseURL: API_ROOT,
		withCredentials: false,
	})
		.then((res) => {
			if (res.status === 200) {
				const { data } = res;
				if (data.flag === 'true' || data.code === '100') {
					success && success(data.result);
				} else {
					failure && failure(data);
					const msg = data.msg || data.errorMsg;
					Message.error({ message: msg });
				}
			} else {
				if (failure && res.data) {
					failure(res.data);
				} else {
					Message.error({ message: res.msg || res.errorMsg });
				}
			}
		})
		.catch((err) => {
			const res = err.response;
			if (err) {
				let msg;
				if (res.data && res.data.message) {
					msg = res.data.message;
				} else {
					msg = '发生错误啦：' + res.status + '-' + res.statusText;
				}
				Message.error({ message: msg });
			}
		});
}
/**
 * result & errorCode
 */
export const httpRc = {
	get: function (url, params, success, failure) {
		return apiAxiosResult('GET', url, params, success, failure);
	},
	post: function (url, params, success, failure) {
		return apiAxiosResult('POST', url, params, success, failure);
	},
	put: function (url, params, success, failure) {
		return apiAxiosResult('PUT', url, params, success, failure);
	},
	delete: function (url, params, success, failure) {
		return apiAxiosResult('DELETE', url, params, success, failure);
	},
};
export const bashRequest = axios.create({
	baseURL: API_ROOT,
	withCredentials: false,
	timeout: 30000,
});

export const request = (method, path, data) => {
	return new Promise((res, rej) => {
		bashRequest[method](path, data)
			.then((rs) => {
				res(rs.data);
			})
			.catch(rej);
	});
};

const methods = ['get', 'request', 'post', 'delete', 'head', 'options', 'put', 'patch'];
methods.forEach((method) => {
	request[method] = (path, data) => request(method, path, data);
	request[method] = (path, data) => request(method, path, data);
});
