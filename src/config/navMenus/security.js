export default {
	name: '14',
	icon: 'ios-paper',
	label: '安防SaaS',
	roleId: '1',
	children: [
		{
			name: 'productConfigOfSecurity',
			label: '产品配置',
			children: [
				{
					name: 'productConfigOfSecurityDetail',
					label: '产品配置详情',
					hideInNav: true,
				},
			],
		},
		{
			name: 'servicePlanOfSecurity',
			label: '服务套餐',
			children: [],
		},
		{
			name: 'productCategoryOfSecurity',
			label: '设备品类',
			children: [],
		},
		// 姚志远
		{
			name: 'deviceLog',
			label: '设备日志查询',
			children: [],
		},
		{
			name: 'userMsid',
			label: '用户Msid查询',
			children: [],
		},
	],
};
