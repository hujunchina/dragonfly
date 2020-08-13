import { request } from './request';

// 校验版本号
export function checkVersion(version) {
	const versionRegex = /^([1-9]\d|[1-9])(\.([0-9]\d|\d)){1,2}$/;
	return versionRegex.test(version);
}

// 检验email地址
export function checkEmail(email) {
	const emailRegex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
	return emailRegex.test(email);
}

// 检验公司email地址
export function checkTuyaEmail(email) {
	const emailRegex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@tuya.com$/;
	return emailRegex.test(email);
}

// 时间处理
export function formatDate(timeStamp) {
	const date = new Date();
	date.setTime(timeStamp);
	const y = date.getFullYear();
	let m = date.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	let h = date.getHours();
	h = h < 10 ? '0' + h : h;
	let minute = date.getMinutes();
	let second = date.getSeconds();
	minute = minute < 10 ? '0' + minute : minute;
	second = second < 10 ? '0' + second : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

export function getCodes(categoryCode) {
	return request('post', '/api/code/getCodes', { categoryCode: categoryCode });
}

export function getCommunicationTypes() {
	return getCodes('communication_type');
}

export function formatObj(meta, target) {
	for (let i = 0; i < meta.length; i++) {
		const obj = {
			value: meta[i].code,
			label: meta[i].name,
		};
		target.push(obj);
	}
}

export function getChipCommunicationTypes() {
	return getCodes('chip_communication_type');
}

export function timestampToString(timestamp) {
	const date = new Date(timestamp);
	const Y = date.getFullYear() + '-';
	const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	const D = date.getDate() + ' ';
	const h = date.getHours() + ':';
	const m = date.getMinutes() + ':';
	const s = date.getSeconds();
	return Y + M + D + h + m + s;
}

export function timestampToDateString(timestamp) {
	const date = new Date(timestamp);
	const Y = date.getFullYear() + '-';
	const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	const D = date.getDate() + ' ';
	const h = date.getHours() + ':';
	const m = date.getMinutes() + ':';
	const s = date.getSeconds();
	const mmm = date.getMilliseconds();
	return Y + M + D + h + m + s + '.' + mmm;
}
