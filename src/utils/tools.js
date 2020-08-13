// 使用方法
// import { deepFreeze } from '@/utils/tools'

export const loadCss = (src) => {
	return new Promise((resolve, reject) => {
		const node = document.createElement('link');
		node.rel = 'stylesheet';
		node.href = src;
		node.onload = resolve;
		node.onerror = reject;
		document.getElementsByTagName('head')[0].appendChild(node);
	});
};

/**
 * 深度冻结对象,数组
 * @param {object | array} object
 */
export const deepFreeze = (object) => {
	const propNames = Object.getOwnPropertyNames(object);
	for (const name of propNames) {
		const value = object[name];
		const isObj = value && typeof value === 'object';
		object[name] = isObj ? deepFreeze(value) : value;
	}

	return Object.freeze(object);
};

// 是否
export const booleanFilter = (value) => {
	if (value === undefined || value === null) {
		return '';
	}
	return value ? '是' : '否';
};

/**
 * 十进制转二进制位 (数组)
 * 5 -> [1, 0, 1]
 * 4 -> [0, 0, 1]
 */
export function decimalismToBinaryArr(num = 0) {
	return num
		.toString(2) // 转二进制
		.split('') // 转数组
		.map(Number) // 转 number 数组
		.reverse(); // 倒序
}

/**
 * 十进制转二进制位
 * 5 -> [0, 2] // 第 0 位, 第 2 位有值
 * 4 -> [2] // 第 2 位有值
 */
export function decimalismToBinary(num = 0) {
	const result = [];
	decimalismToBinaryArr(num).reduce((accumulator, current, index) => {
		if (current) {
			accumulator.push(index);
		}
		return accumulator;
	}, result);
	return result;
}

/**
 * JS 对象转 FormData
 *
 * @param {object} obj JS 对象
 * @param {FormData?} form
 * @param {string?} namespace
 */
export const objectToFormData = (obj, form, namespace) => {
	const formData = form || new FormData();
	let formKey;

	for (const property in obj) {
		const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, property);
		if (!hasOwnProperty) {
			continue;
		}
		if (namespace) {
			formKey = namespace + '[' + property + ']';
		} else {
			formKey = property;
		}
		// 对象类型 object | array
		if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
			objectToFormData(obj[property], formData, property);
		} else {
			formData.append(formKey, obj[property]);
		}
	}
	return formData;
};

/**
 * timestamp | dateFormat('YYYY-MM-DD HH:mm:ss')
 * @param {*} timestamp 时间戳
 * @param {*} mode 格式
 */
export function dateFormat(timestamp, mode = '') {
	const time = new Date(timestamp);
	if (!time) {
		return '';
	}

	const year = time.getFullYear().toString();
	const month = String(time.getMonth() + 1).padStart(2, '0');
	const day = String(time.getDate()).padStart(2, '0');
	const hour = String(time.getHours()).padStart(2, '0');
	const minute = String(time.getMinutes()).padStart(2, '0');
	const second = String(time.getSeconds()).padStart(2, '0');

	mode = mode.replace('YYYY', year);
	mode = mode.replace('YY', year.slice(2));
	mode = mode.replace('MM', month);
	mode = mode.replace('DD', day);
	mode = mode.replace('HH', hour);
	mode = mode.replace('mm', minute);
	mode = mode.replace('ss', second);

	return mode;
}

/**
 * 返回一个清理掉属性值为 null、''、[] 的全新对象
 * @param cond
 */
export function clearObject(cond) {
	const ret = {};
	for (const field in cond) {
		if (Object.prototype.hasOwnProperty.call(cond, field)) {
			if (cond[field] == null || cond[field] === '') {
				continue;
			}
			if (Array.isArray(cond[field]) && cond[field].length === 0) {
				continue;
			}
			ret[field] = cond[field];
		}
	}
	return ret;
}
