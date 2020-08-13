export default {
	name: '10',
	icon: 'ios-paper',
	label: '行业应用',
	roleId: '1',
	children: [
		{
			name: 'industryAdminUserManage',
			label: '行业用户管理',
			children: [
				{
					name: 'adminUserProductManage',
					label: '超级用户产品管理',
					hideInNav: true,
				},
				{
					name: 'subaccountManage',
					label: '超级用户子账号管理',
					hideInNav: true,
				},
			],
		},
		{
			name: 'thirdDeviceManage',
			label: '超仪水电表设备同步',
		},
		{
			name: 'productInfoManage',
			label: '行业产品信息管理',
		},
		{
			name: 'fileInfoManage',
			label: '公寓皮肤上传',
		},
		{
			name: 'tongTianGatewayManage',
			label: '回调网关后台',
		},
	],
};
