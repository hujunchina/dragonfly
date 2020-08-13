import pickBy from 'lodash/pickBy';

const toString = Object.prototype.toString;
const isObject = (obj) => toString.call(obj) === '[object Object]';

export const cleanObject = (obj) => {
	let tmp = {};
	if (isObject(obj)) {
		obj = pickBy(obj, (v) => v !== undefined);
		Object.keys(obj).forEach((key) => {
			if (isObject(obj[key])) {
				tmp[key] = cleanObject(obj[key]);
			} else {
				tmp[key] = obj[key];
			}
		});
		return tmp;
	}
	return obj;
};
