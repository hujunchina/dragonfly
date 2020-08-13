export default {
	name: '6',
	icon: 'ios-paper',
	label: '线下订单',
	roleId: '1',
	children: [
		{
			name: 'cookwiseList',
			label: '云菜谱',
			children: [
				{
					name: 'cookwiseDetail',
					label: '云菜谱详情',
					hideInNav: true,
				},
			],
		},
		{
			name: 'licenseUUID',
			label: 'UUID录入',
		},
	],
};
