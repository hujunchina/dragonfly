import VueRouter from 'vue-router';
import PageNotFound from '@/page/404.vue';
import IndustryAdminUserManage from '@/page/industryapplication/IndustryAdminUserManage.vue';
// import ThirdDeviceManage from '@/page/industryapplication/ThirdDeviceManage.vue';
import ProductInfoManage from '@/page/industryapplication/ProductInfoManage.vue';
import FileInfoManage from '@/page/industryapplication/FileInfoManage.vue';
import TongTianGatewayManage from '@/page/industryapplication/TongTianGatewayManage.vue';

const router = new VueRouter({
	mode: 'history',
	base: '/saas',
	routes: [
		{ path: '/', redirect: '/page/industryapplication/IndustryAdminUserManage' },
		{
			path: '/page/industryapplication/IndustryAdminUserManage',
			component: IndustryAdminUserManage,
		},
		// { path: '/page/industryapplication/ThirdDeviceManage', component: ThirdDeviceManage },
		{ path: '/page/industryapplication/ProductInfoManage', component: ProductInfoManage },
		{ path: '/page/industryapplication/FileInfoManage', component: FileInfoManage },
		{ path: '/page/industryapplication/TongTianGatewayManage', component: TongTianGatewayManage },
		{ path: '*', component: PageNotFound },
	],
});

export default router;
