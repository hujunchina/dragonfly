import VueRouter from 'vue-router';
import PageNotFound from '@/page/404.vue';
// import ProductPCBAManage from '@/page/manage/smart/module/ProductPCBAManage.vue';

const router = new VueRouter({
	mode: 'history',
	base: '/saas',
	routes: [
		{ path: '/', redirect: '/manage/module/productPcbaManage' },
		// { path: '/manage/module/productPcbaManage', component: ProductPCBAManage },
		{ path: '*', component: PageNotFound },
	],
});

export default router;
