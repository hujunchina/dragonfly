export default {
	name: '20',
	icon: 'ios-paper',
	label: 'Comfort&Care',
	roleId: '1',
	children: [
		{
			name: 'productConfig',
			label: '产品配置',
		},
		{
			name: 'productManage',
			label: '健康',
			children: [
				{
					name: 'healthConfigManage',
					label: '健康配置管理',
				},
				{
					name: 'healthBrandManage',
					label: '健康品牌管理',
				},
				{
					name: 'healthDataQuery',
					label: '健康数据',
				},
			],
		},
	],
};
