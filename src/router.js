import VueRouter from 'vue-router';
import PageNotFound from '@/page/404.vue';

import IndustryAdminUserManage from '@/page/industryapplication/IndustryAdminUserManage.vue';
import AdminUserProductManage from '@/page/industryapplication/AdminUserProductManage.vue';
import SubaccountManage from '@/page/industryapplication/SubaccountManage.vue';
import CloudStorageManage from '@/page/manage/CloudStorageManage.vue';
import ProductInfoManage from '@/page/industryapplication/ProductInfoManage';
// import ThirdDeviceManage from '@/page/industryapplication/ThirdDeviceManage.vue';
import FileInfoManage from '@/page/industryapplication/FileInfoManage.vue';
import TongTianGatewayManage from '@/page/industryapplication/TongTianGatewayManage.vue';

import productConfigOfSecurity from '@/page/security/productConfigOfSecurity.vue';
import productConfigOfSecurityDetail from '@/page/security/productConfigOfSecurityDetail.vue';
import servicePlanOfSecurity from '@/page/security/servicePlanOfSecurity.vue';
import productCategoryOfSecurity from '@/page/security/productCategoryOfSecurity.vue';
import deviceLog from '@/page/security/deviceLog.vue';
import userMsid from '@/page/security/userMsidQuery.vue';

import SaasServiceManage from '@/page/saas/SaasServiceManage.vue';
import CustomerResidenceManage from '@/page/saas/CustomerResidenceManage.vue';
import SaasProductManage from '@/page/saas/SaasProductManage.vue';
import SaasDeviceManage from '@/page/saas/SaasDeviceManage.vue';
import SaasDpManage from '@/page/saas/SaasDpManage.vue';
import SaasDeviceQuery from '@/page/saas/SaasDeviceQuery.vue';
// import SaasSiderBar from '@/page/saas/SaasSiderBar.vue';
// import SaasDubboTool from '@/page/saas/SaasDubboTool.vue';
// import saasFlow from '@/page/saas/SaasFlow.vue';
// import SaasTools from '@/page/saas/SaasTools.vue';
// import SaasDeviceLog from '@/page/saas/SaasDeviceLog.vue';
import SaasShieldResource from '@/page/saas/SaasShieldResource.vue';
import SaasShieldRole from '@/page/saas/SaasShieldRole.vue';
// import SaasDeviceProjectChange from '@/page/saas/SaasDeviceProjectChange';

import HotelIndustryAudit from '@/page/hotel/industryAudit/HotelIndustryAudit.vue';
import HotelIndustryAuditDetail from '@/page/hotel/industryAudit/HotelIndustryAuditDetail.vue';
import HotelPmsInfoManage from '@/page/hotel/pms/HotelPmsInfoManage.vue';
import HotelPmsInfoModify from '@/page/hotel/pms/HotelPmsInfoModify.vue';
import HotelPermissionManage from '@/page/hotel/permission/HotelPermissionManage.vue';
import HotelPermission from '@/page/hotel/permission/HotelPermission.vue';
import HotelPermissionModule from '@/page/hotel/permission/HotelPermissionModule.vue';
import HotelDefaultRole from '@/page/hotel/defaultRole/HotelDefaultRole.vue';
import HotelBrandOemManage from '@/page/hotel/brandOem/HotelBrandOemManage.vue';
import HotelBrandOemModify from '@/page/hotel/brandOem/HotelBrandOemModify.vue';
import VoiceSkillSuppliesManage from '@/page/hotel/voiceSupplies/VoiceSkillSuppliesManage.vue';
import HotelUtils from '@/page/hotel/utils/HotelUtils.vue';
import HotelMakeup from '@/page/hotel/internal/HotelMakeup.vue';
import HotelExecution from '@/page/hotel/internal/HotelExecution.vue';
import HotelWebAppDomainModify from '@/page/hotel/webApp/HotelWebAppDomainModify.vue';
import WebAppBasicManage from '@/page/hotel/webApp/WebAppBasicManage.vue';
import WebAppBasicModify from '@/page/hotel/webApp/WebAppBasicModify.vue';

import SnoopyIndustryAudit from '@/page/snoopy/industryAudit/SnoopyIndustryAudit.vue';
import SnoopyIndustryAuditDetail from '@/page/snoopy/industryAudit/SnoopyIndustryAuditDetail.vue';
import SnoopyDefaultRole from '@/page/snoopy/defaultRole/SnoopyDefaultRole.vue';
import SnoopyDefaultRoleManage from '@/page/snoopy/defaultRole/SnoopyDefaultRoleManage.vue';
import SnoopyPermission from '@/page/snoopy/permission/SnoopyPermission.vue';
import SnoopyPermissionManage from '@/page/snoopy/permission/SnoopyPermissionManage.vue';
import SnoopyPermissionModule from '@/page/snoopy/permission/SnoopyPermissionModule.vue';
import SnoopyPermissionModuleManage from '@/page/snoopy/permission/SnoopyPermissionModuleManage.vue';
import snoopyUtils from '@/page/snoopy/utils/snoopyUtils.vue';
import SnoopyOemManage from '@/page/snoopy/oem/SnoopyOemManage.vue';
import SnoopyOemModify from '@/page/snoopy/oem/SnoopyOemModify.vue';

const router = new VueRouter({
	mode: 'history',
	base: '/saas',
	routes: [
		{ path: '/', redirect: '/page/industryapplication/IndustryAdminUserManage' },
		// 公寓 SaaS
		{
			name: 'industryAdminUserManage',
			path: '/page/industryapplication/IndustryAdminUserManage',
			component: IndustryAdminUserManage,
		},
		{
			name: 'adminUserProductManage',
			path: '/page/industryapplication/AdminUserProductManage',
			component: AdminUserProductManage,
		},
		{
			name: 'subaccountManage',
			path: '/page/industryapplication/SubaccountManage',
			component: SubaccountManage,
		},
		{
			name: 'cloudStorageManage',
			path: '/page/manage/CloudStorageManage',
			component: CloudStorageManage,
		},
		// {
		// 	// name: 'thirdDeviceManage',
		// 	// path: '/page/industryapplication/ThirdDeviceManage',
		// 	// component: ThirdDeviceManage,
		// },
		{
			name: 'productInfoManage',
			path: '/page/industryapplication/ProductInfoManage',
			component: ProductInfoManage,
		},
		{
			name: 'fileInfoManage',
			path: '/page/industryapplication/FileInfoManage',
			component: FileInfoManage,
		},
		{
			name: 'tongTianGatewayManage',
			path: '/page/industryapplication/TongTianGatewayManage',
			component: TongTianGatewayManage,
		},
		// 安防 SaaS
		{
			name: 'productConfigOfSecurity',
			path: '/security/productConfigOfSecurity',
			component: productConfigOfSecurity,
		},
		{
			name: 'productConfigOfSecurityDetail',
			path: '/security/productConfigOfSecurityDetail',
			component: productConfigOfSecurityDetail,
		},
		{
			name: 'servicePlanOfSecurity',
			path: '/security/servicePlanOfSecurity',
			component: servicePlanOfSecurity,
		},
		{
			name: 'productCategoryOfSecurity',
			path: '/security/productCategoryOfSecurity',
			component: productCategoryOfSecurity,
		},
		{
			name: 'deviceLog',
			path: '/security/deviceLog',
			component: deviceLog,
		},
		{
			name: 'userMsid',
			path: '/security/userMsidQuery',
			component: userMsid,
		},
		// SaaS 中台
		{
			name: 'saasServiceManage',
			path: '/page/saas/SaasServiceManage',
			component: SaasServiceManage,
		},
		{
			name: 'customerResidenceManage',
			path: '/page/saas/CustomerResidenceManage',
			component: CustomerResidenceManage,
		},
		{
			name: 'saasProductManage',
			path: '/page/saas/SaasProductManage',
			component: SaasProductManage,
		},
		{ name: 'saasDeviceManage', path: '/page/saas/SaasDeviceManage', component: SaasDeviceManage },
		{ name: 'saasDpManage', path: '/page/saas/SaasDpManage', component: SaasDpManage },
		{ name: 'saasDeviceQuery', path: '/page/saas/SaasDeviceQuery', component: SaasDeviceQuery },
		{
			name: 'saasShieldResource',
			path: '/page/saas/SaasShieldResource',
			component: SaasShieldResource,
		},
		// TODO: 中台工具页面
		// { name: 'saasShieldRole', path: '/page/saas/SaasShieldRole', component: SaasShieldRole },
		// // {
		// // 	path: '/page/saas',
		// // 	component: SaasTools,
		// // 	children: [
		// // 		{
		// // 			name: 'saasTools',
		// // 			path: 'saasTools',
		// // 			components: {
		// // 				default: SaasSiderBar,
		// // 				saasRight: SaasDubboTool,
		// // 			},
		// // 		},
		// // 	],
		// // },
		// // {
		// // 	path: '/page/saas',
		// // 	component: SaasTools,
		// // 	children: [
		// // 		{
		// // 			name: 'saasFlow',
		// // 			path: 'saasFlow',
		// // 			components: {
		// // 				default: SaasSiderBar,
		// // 				saasRight: saasFlow,
		// // 			},
		// // 		},
		// // 	],
		// // },
		// // {
		// // 	path: '/page/saas',
		// // 	component: SaasTools,
		// // 	children: [
		// // 		{
		// // 			name: 'saasDeviceLog',
		// // 			path: 'saasDeviceLog',
		// // 			components: {
		// // 				default: SaasSiderBar,
		// // 				saasRight: SaasDeviceLog,
		// // 			},
		// // 		},
		// // 	],
		// // },
		// // {
		// // 	path: '/page/saas',
		// // 	component: SaasTools,
		// // 	children: [
		// // 		{
		// // 			name: 'saasDeviceProjectChange',
		// // 			path: 'saasDeviceProjectChange',
		// // 			components: {
		// // 				default: SaasSiderBar,
		// // 				saasRight: SaasDeviceProjectChange,
		// // 			},
		// // 		},
		// // 	],
		// // },
		// 酒店 SaaS
		{
			name: 'hotelIndustryAudit',
			path: '/page/hotel/HotelIndustryAudit',
			component: HotelIndustryAudit,
		},
		{
			name: 'hotelIndustryAuditDetail',
			path: '/page/hotel/HotelIndustryAuditDetail',
			component: HotelIndustryAuditDetail,
		},
		{
			name: 'hotelPmsInfoManage',
			path: '/page/hotel/HotelPmsInfoManage',
			component: HotelPmsInfoManage,
		},
		{
			name: 'hotelPmsInfoModify',
			path: '/page/hotel/HotelPmsInfoModify',
			component: HotelPmsInfoModify,
		},
		{
			name: 'hotelPermissionManage',
			path: '/page/hotel/HotelPermissionManage',
			component: HotelPermissionManage,
		},
		{ name: 'hotelPermission', path: '/page/hotel/HotelPermission', component: HotelPermission },
		{
			name: 'hotelPermissionModule',
			path: '/page/hotel/HotelPermissionModule',
			component: HotelPermissionModule,
		},
		{ name: 'hotelDefaultRole', path: '/page/hotel/HotelDefaultRole', component: HotelDefaultRole },
		{
			name: 'hotelBrandOemManage',
			path: '/page/hotel/HotelBrandOemManage',
			component: HotelBrandOemManage,
		},
		{
			name: 'hotelBrandOemModify',
			path: '/page/hotel/HotelBrandOemModify',
			component: HotelBrandOemModify,
		},
		{
			name: 'voiceSkillSuppliesManage',
			path: '/page/hotel/VoiceSkillSuppliesManage',
			component: VoiceSkillSuppliesManage,
		},
		{ name: 'hotelUtils', path: '/page/hotel/HotelUtils', component: HotelUtils },
		{ name: 'hotelMakeup', path: '/page/hotel/HotelMakeup', component: HotelMakeup },
		{ name: 'hotelExecution', path: '/page/hotel/HotelExecution', component: HotelExecution },
		{
			name: 'hotelWebAppDomainModify',
			path: '/page/hotel/HotelWebAppDomainModify',
			component: HotelWebAppDomainModify,
		},
		{
			name: 'webAppBasicManage',
			path: '/page/hotel/WebAppBasicManage',
			component: WebAppBasicManage,
		},
		{
			name: 'webAppBasicModify',
			path: '/page/hotel/WebAppBasicModify',
			component: WebAppBasicModify,
		},
		// 施工商平台
		{
			name: 'snoopyIndustryAudit',
			path: '/page/snoopy/SnoopyIndustryAudit',
			component: SnoopyIndustryAudit,
		},
		{
			name: 'snoopyIndustryAuditDetail',
			path: '/page/snoopy/SnoopyIndustryAuditDetail',
			component: SnoopyIndustryAuditDetail,
		},
		{
			name: 'snoopyDefaultRole',
			path: '/page/snoopy/SnoopyDefaultRole',
			component: SnoopyDefaultRole,
		},
		{
			name: 'snoopyDefaultRoleManage',
			path: '/page/snoopy/SnoopyDefaultRoleManage',
			component: SnoopyDefaultRoleManage,
		},
		{
			name: 'snoopyPermission',
			path: '/page/snoopy/SnoopyPermission',
			component: SnoopyPermission,
		},
		{
			name: 'snoopyPermissionManage',
			path: '/page/snoopy/SnoopyPermissionManage',
			component: SnoopyPermissionManage,
		},
		{
			name: 'snoopyPermissionModule',
			path: '/page/snoopy/SnoopyPermissionModule',
			component: SnoopyPermissionModule,
		},
		{
			name: 'snoopyPermissionModuleManage',
			path: '/page/snoopy/SnoopyPermissionModuleManage',
			component: SnoopyPermissionModuleManage,
		},
		{ name: 'snoopyUtils', path: '/page/snoopy/utils/snoopyUtils', component: snoopyUtils },
		{
			name: 'snoopyOemManage',
			path: '/page/snoopy/oem/snoopyOemManage',
			component: SnoopyOemManage,
		},
		{
			name: 'snoopyOemModify',
			path: '/page/snoopy/oem/snoopyOemModify',
			component: SnoopyOemModify,
		},
		// 404 页
		{ path: '*', component: PageNotFound },
	],
});

export default router;
