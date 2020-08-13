import Vue from 'vue';
import { Button, Select } from 'element-ui';

export const importElement = () => {
	const elements = [Button, Select];

	elements.forEach((el) => {
		Vue.component(el.name, el);
	});
};

export const updateConfirm = (self, msg, successFn, cancelFn) => {
	self
		.$confirm(msg, '警告', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
		.then(() => {
			if (successFn instanceof Function) successFn();
		})
		.catch(() => {
			if (cancelFn instanceof Function) cancelFn();
		});
};
