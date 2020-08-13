const CryptoJS = require('crypto-js');
const backendNgUtils = {};
backendNgUtils.install = function (Vue) {
	Vue.prototype.formatDate = function (value) {
		if ((value + '').length == 13) {
			value = Math.floor(value);
		}
		const date = new Date(value);
		const y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? '0' + MM : MM;
		let d = date.getDate();
		d = d < 10 ? '0' + d : d;
		let h = date.getHours();
		h = h < 10 ? '0' + h : h;
		let m = date.getMinutes();
		m = m < 10 ? '0' + m : m;
		let s = date.getSeconds();
		s = s < 10 ? '0' + s : s;
		return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	};

	Vue.prototype.aesEncrypt = function (word, keyStr) {
		keyStr = keyStr ? keyStr : 'eafc08bbbde32d8e';
		const key = CryptoJS.enc.Utf8.parse(keyStr);
		const srcs = CryptoJS.enc.Utf8.parse(word);
		const encrypted = CryptoJS.AES.encrypt(srcs, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		return encrypted.toString();
	};

	Vue.prototype.aesDecrypt = function (word, keyStr) {
		keyStr = keyStr ? keyStr : 'eafc08bbbde32d8e';
		const key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
		const decrypt = CryptoJS.AES.decrypt(word, key, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
	};
};
export default backendNgUtils;
