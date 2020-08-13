<script>
const download = (response) => {
	if (!response) {
		return;
	}
	let url = window.URL.createObjectURL(response.data);
	let link = document.createElement('a');
	link.style.display = 'none';
	link.href = url;
	let contentDisposition = response.headers['content-disposition'];
	let fileName = decodeURI(contentDisposition.slice(21));
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
};

// 校验传入参数是否不存在或未定义
const checkEmpty = (response) => {
	if (
		typeof response === 'undefined' ||
		response === undefined ||
		response === 'undefined' ||
		response === null
	) {
		return '';
	}
	return response;
};

// 校验传入参数encode之后是否不存在或未定义
const checkEncodeEmpty = (response) => {
	let result = checkEmpty(response);
	if (result === '') {
		return '';
	}
	let encodeResult = checkEmpty(encodeURI(result));
	return encodeResult;
};

// 全局变量配置文件 可配置些全局需要的参数 by jason 2018/05/07
const pageSize = 30;
const pageSizes = [30, 50, 100];
const limitPageSize = 1000;

// 常用常量
const notifyTitle = 'BSS错误信息提示：';

// 校验整数和小数的正则
const numPattern = /^[0-9]+([.]{1}[0-9]+){0,1}$/;

const integerPattern = /^[0-9]+$/;

/**
 * 输入内容空格去除
 * @param str
 * @param trimAll =true包阔中间的空格都去掉，否则只去掉前后空格
 * hulda20180525
 */
const trimInput = (str) => {
	var result = str.replace(/(^\s+)|(\s+$)/g, '');
	return result;
};

const check4Num = (value, self) => {
	if (!value) {
		return true;
	}
	let reg = /^\d{0,8}\.{0,1}(\d{1,4})?$/;
	let checkReg = new RegExp(reg).test(value);
	if (!checkReg) {
		self.$message({
			message: '只能输入整数或者4位以内的小数！',
			type: 'error',
		});
		return false;
	}
	return true;
};

const checkValueReg = (value, reg, tip, errorType, self) => {
	if (!value) {
		return true;
	}
	let checkReg = new RegExp(reg).test(value);
	if (!checkReg) {
		self.$message({
			message: tip,
			type: errorType,
		});
		return false;
	}
	return true;
};

/**
 * 大部分导出支持
 * @param self
 * @param parent
 * @param queryData
 */
const doExportExcel = (self, parent, queryData) => {
	self.$http
		.post(parent.exportUrl, queryData)
		.then((response) => {
			if (!response.data.success) {
				self.$notify({
					// eslint-disable-next-line no-invalid-this
					title: this.$globalConf.notifyTitle,
					type: 'error',
					message: response.data.errorMsg,
				});
				self.loading = false;
				return;
			}
			self.loading = true;
			// 轮询加载结果
			let doQuery = function () {
				self.$http
					.post('/get/redis/result', { keyType: parent.exportRedisKey }) // 轮询结果场景
					.then((response) => {
						if (response.data.success) {
							let result = response.data.result;
							if (result != null) {
								// TODO 根据key获取oss上的file
								if (result.status === 2) {
									let url = result.result.url;
									self.$httpBlob
										.post('/download/file', { url: url, fileName: parent.exportFileName })
										.then((response) => {
											self.$globalConf.download(response);
											self.exportLoading = false;
										})
										.catch((error) => {
											self.$message({
												message: error,
												type: 'error',
												showClose: true,
											});
										});
								} else {
									setTimeout(doQuery, 2000);
								}
							}
						} else {
							setTimeout(doQuery, 2000);
						}
					})
					.catch((error) => {
						self.loading = false;
						self.exportLoading = false;
						self.$message({
							message: error,
							type: 'error',
							showClose: true,
						});
					});
			};
			setTimeout(doQuery, 2000);
		})
		.catch((error) => {
			self.exportLoading = false;
			self.$message({
				message: error,
				type: 'error',
				showClose: true,
			});
		});
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
const accMul = (arg1, arg2) => {
	if (isNaN(arg1)) {
		arg1 = 0;
	}
	if (isNaN(arg2)) {
		arg2 = 0;
	}
	arg1 = Number(arg1);
	arg2 = Number(arg2);

	let m = 0;
	let s1 = arg1.toString();
	let s2 = arg2.toString();
	try {
		m += s1.split('.')[1].length;
	} catch (e) {}
	try {
		m += s2.split('.')[1].length;
	} catch (e) {}
	return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
};

/**
 * 最大公约数
 * @param arg1
 * @param arg2
 * @returns {number}
 */
const gcd1 = (arg1, arg2) => {
	if (arg1 == 0 || arg2 == 0) {
		return 0;
	}
	let mod = arg1 % arg2;
	if (mod == 0) {
		return arg2;
	} else {
		return gcd1(arg2, mod);
	}
};

/**
 * 最大公约数转比例
 * @param arg1
 * @param arg2
 * @returns {number}
 */
const gcdScale = (arg1, arg2) => {
	if (arg1 == 0 || arg2 == 0) {
		return arg1 + ':' + arg2;
	}
	let al = accMul(arg1, 100000);
	let bl = accMul(arg2, 100000);
	let gcdNum = gcd1(al, bl);
	if (gcdNum != 0) {
		al /= gcdNum;
		bl /= gcdNum;
	}
	return al + ':' + bl;
};

/**
 * config表配置权限判断
 * @param key
 */
const checkConfigPermission = (key, self) => {
	let promise = new Promise((resolve) => {
		let username = window.atob(self.$cookie.get('userid'));
		self.$http
			.get('/get/config/value/' + key)
			.then((response) => {
				let config = response.data.result;
				if (config == null || config.configValue == null) {
					resolve(false);
				}
				let configArray = config.configValue.split(',');
				if (configArray.indexOf(username) > -1) {
					resolve(true);
				}
				resolve(false);
			})
			.catch(() => {
				resolve(false);
			});
	});
	return promise;
};

export default {
	pageSize, // 默认分页条数
	pageSizes, // 默认分布选项
	notifyTitle,
	limitPageSize, // 默认分页limit
	download, // 导出方法
	trimInput, // 输入内容空格去除
	numPattern,
	check4Num, // 校验只能输入整数或者4位以内的小数
	doExportExcel,
	checkEmpty, // 校验空或undefined
	checkEncodeEmpty, // 校验encode之后是否存在
	accMul, // js乘法
	gcdScale, // 计算公约数比例
	integerPattern, // 正整数正则
	checkValueReg, // 正则校验
	checkConfigPermission,
};
</script>
