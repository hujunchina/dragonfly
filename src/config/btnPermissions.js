import Vue from 'vue';
import axios from 'axios';
import { cloneVNode } from '@/utils/vnode';
import Permission from '@/components/Permission/index.vue';
import routerAndNav from '@/config/routerAndNavPer.js';

const PermissionWrap = Vue.extend(Permission);

axios
	.post('/api/function', {})
	.then((response) => {
		localStorage.setItem('btnPermissions', JSON.stringify(response.data.result.funArray));
		localStorage.setItem(
			'routes',
			JSON.stringify(response.data.result.routeArray.filter((route) => route.startsWith('route:'))),
		);
	})
	.catch(() => {});

axios
	.post('/api/routes', {})
	.then((response) => {
		localStorage.setItem('allRoutes', JSON.stringify(response.data.result));
	})
	.catch(() => {});

/** 权限指令**/
const has = Vue.directive('has', {
	inserted: function (el, binding) {
		if (!Vue.prototype.$_has(binding.value)) {
			el.parentNode.removeChild(el);
		}
	},
});
const has2 = Vue.directive('has2', {
	inserted: function (el, binding) {
		if (!Vue.prototype.$_has2(binding.value)) {
			el.parentNode.removeChild(el);
		}
	},
});
const has3 = Vue.directive('has3', {
	inserted: function (el, binding, vnode) {
		if (!Vue.prototype.$_has3(binding.value)) {
			vnode.componentOptions.listeners = null; // 取消监听事件
			const parentNode = el.parentNode;
			if (!parentNode) {
				return;
			}
			parentNode.removeChild(el);
			const instance = new PermissionWrap({
				data: {
					id: '您没有该权限，点击打开申请地址',
				},
			});
			// vnode.componentInstance.$options.propsData.disabled = ''; // 禁止按钮
			const node = cloneVNode(vnode, instance.$createElement);
			node.componentOptions.listeners = null; // 取消监听事件
			instance.$slots.default = [node];
			instance.$mount();
			parentNode.appendChild(instance.$el);
		}
	},
	bind: function (el, binding, vnode) {
		if (!Vue.prototype.$_has3(binding.value)) {
			const oDiv = el; // 当前元素
			vnode.componentOptions.listeners = null; // 取消监听事件
			oDiv.style.backgroundColor = '#C7C7C7';
			oDiv.onclick = function () {
				const acl = window.acl;
				const pathname = '/#/personal/possessionApplyManage/backendng/fun/';
				const funcId = routerAndNav.getRouteFuncId(binding.value);
				window.open(acl + pathname + funcId);
			};
		}
	},
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
	let isExist = false;
	const buttonpermsStr = localStorage.getItem('btnPermissions');
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'daily') {
		return true;
	}
	if (buttonpermsStr == undefined || buttonpermsStr == null) {
		return false;
	}
	const buttonperms = JSON.parse(buttonpermsStr);
	for (const buttonperm of buttonperms) {
		if (buttonperm.includes(value)) {
			isExist = true;
		}
	}
	return isExist;
};

Vue.prototype.$_has2 = function (value) {
	let isExist = false;
	const buttonpermsStr = localStorage.getItem('btnPermissions');
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'daily') {
		return true;
	}
	if (buttonpermsStr == undefined || buttonpermsStr == null) {
		return false;
	}
	const buttonperms = JSON.parse(buttonpermsStr);
	for (const buttonperm of buttonperms) {
		if (value.startsWith(buttonperm)) {
			isExist = true;
		}
	}
	return isExist;
};

Vue.prototype.$_has3 = function (value) {
	let isExist = false;
	const buttonpermsStr = localStorage.getItem('btnPermissions');
	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'daily') {
	}
	if (buttonpermsStr == undefined || buttonpermsStr == null) {
		return false;
	}
	const buttonperms = JSON.parse(buttonpermsStr);
	for (const buttonperm of buttonperms) {
		if (value == buttonperm) {
			isExist = true;
		}
	}
	return isExist;
};

export { has };
export { has2 };
export { has3 };
