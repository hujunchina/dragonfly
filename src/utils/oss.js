import _ from 'underscore';

import { request } from './request';
import uuidv4 from 'uuid/v4';

// export const getOssSign = ({ bucket, cloudKey }, successHandler, errorHandler) => {
//   const isIE = /Microsoft Internet Explorer/.test(navigator.appName)
//   request.post('/storage/getObjHttpSign', {bucket,cloudKey}, successHandler, errorHandler);
// }

const GET_SIGN_URL = '/storage/getObjHttpSign';

export const getFileType = (fileType = '') => fileType.split('/')[0];

/**
 * 修改函数名加下划线和时间戳
 * @param filename
 * @returns {string}
 */
const addTampToFilename = (filename) => {
	const lastIdx = filename.lastIndexOf('.');
	const uuid = uuidv4();
	let suffix = '';
	if (lastIdx > -1) {
		const len = filename.length;
		suffix = filename.substring(lastIdx, len);
	}
	return uuid + suffix;
};

/**
 * 获取sign
 * @param {Object} config
 */
export const getOssSign = (config) => {
	return request.post(GET_SIGN_URL, {
		biz: config.biz,
		ownerId: config.ownerId,
		type: getFileType(config.type),
		fileName: addTampToFilename(
			config.filename.replace(/\s/g, '') || config.file.name.replace(/\s/g, ''),
		),
	});
};

/**
 *  上传文件
 *
 * @param {Object} config
 * @param fil
 */
export const uploadFiles = (config) => {
	const formData = new FormData();
	formData.append('key', config.key);
	formData.append('Content-Type', 'text/plain');
	formData.append('OSSAccessKeyId', config.ossAccessId);
	formData.append('policy', config.policy);
	formData.append('Signature', config.sign);
	formData.append('file', config.file);

	return new Promise((res, rej) => {
		request
			.post(config.url, formData)
			.then(() =>
				res({
					size: config.file.size,
					name: config.key.substring(config.key.lastIndexOf('/') + 1), // addTampToFilename(config.filename || config.file.name),
					type: getFileType(config.file.type),
					path: `${config.key}`, // 图片路径， 主域名可变
					url: `${config.url}/${config.key}`,
					// eslint-disable-next-line no-dupe-keys
					type: config.type,
				}),
			)
			.catch(rej);
	});
};

/**
 * 整合上两个函数
 * @param {Object} config
 */
export const upload = (config) =>
	getOssSign(config).then((response) => {
		return uploadFiles({
			key: response.data.cloudKey,
			ossAccessId: response.data.uploadByPostSignDO.ossAccessId,
			policy: response.data.uploadByPostSignDO.policy,
			sign: response.data.uploadByPostSignDO.sign,
			file: config.file,
			url: response.data.url,
			type: config.type,
			filename: config.filename || config.file.name,
		});
	});

/**
 * 对upload函数的包装
 * @param {File} file
 */
export const uploadFile = (file) => {
	if (!(file instanceof File)) {
		return Promise.reject('not a file');
	}
	let type = getFileType(file.type);
	if (!type) {
		type = file.type2UseIfUnknown;
	} else if (file.type2UseIfUnknown) {
		type = file.type2UseIfUnknown;
	}

	return upload({
		biz: file.biz,
		ownerId: file.ownerId,
		type: type,
		filename: file.name,
		file: file,
	});
};

export const uploadFileWithId = (obj = {}) => {
	const biz = obj.biz;
	const file = obj.file;
	const prefix = obj.prefix;
	const productId = obj.productId;
	const meta = '.' + _.last(file.name.split('.'));
	const filename = [prefix, productId].join('_') + meta;

	if (!(file instanceof File)) {
		return Promise.reject('not a file');
	}

	let type = getFileType(file.type);
	if (!type) {
		type = file.type2UseIfUnknown;
	}

	return upload({
		biz: biz,
		ownerId: obj.ownerId,
		type: type,
		filename,
		file: file,
	});
};

export const isImageAndVideo = (fileType) => /image|video/.test(fileType);

export const isImage = (fileType) => /image/.test(fileType);
