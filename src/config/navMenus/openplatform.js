export default {
	name: '18',
	icon: 'ios-paper',
	label: '开放平台',
	roleId: '1',
	children: [
		{
			name: 'openplatformDeveloper',
			label: '开发者管理',
			children: [
				{
					name: 'openplatformDeveloperDetail',
					label: '开发者管理详情',
					hideInNav: true,
				},
			],
		},
		{
			name: 'openplatformApp',
			label: '项目管理',
			children: [
				{
					name: 'openplatformAppDetail',
					label: '项目管理详情',
					hideInNav: true,
				},
			],
		},
		{
			label: 'API管理',
			children: [
				{
					name: 'openplatformApiGroup',
					label: 'API分组',
					children: [
						{
							name: 'openplatformApiGroupDetail',
							label: 'API分组详情',
							hideInNav: true,
						},
					],
				},
				{
					name: 'openplatformApiAudit',
					label: 'API审核',
					children: [
						{
							name: 'openplatformApiAuditDetail',
							label: 'API审核详情',
							hideInNav: true,
						},
					],
				},
			],
		},
		{
			name: 'openplatformWechatApp',
			label: '小程序管理',
			children: [
				{
					name: 'openplatformWechatAppDetail',
					label: '小程序管理详情',
					hideInNav: true,
				},
			],
		},
		{
			name: 'openplatformVirtualdevice',
			label: '虚拟设备管理',
		},
		{
			name: 'openplatformStatistics',
			label: '数据统计',
		},
		{
			label: '错误码管理',
			children: [
				{
					name: 'radarErrorCode',
					label: '错误码管理',
				},
				{
					name: 'radarErrorException',
					label: '错误码异常处理关系管理',
				},
			],
		},
		{
			name: 'ariesInfraredStandardKey',
			label: '万能红外标准指令管理',
		},
	],
};
