// 懒加载组件
function lazy(name, path) {
	if (name !== 'dashboard') {
		return () => import(`@/page${path}.vue`);
	} else {
		return () => import(`@/components/${name}.vue`);
	}
}
export { lazy };
