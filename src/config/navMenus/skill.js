export default {
	name: '5',
	icon: 'ios-paper',
	label: '技能管理',
	roleId: '1',
	children: [
		{
			name: 'nluModels',
			label: '控制语料',
			children: [
				{
					name: 'nluModelDetail',
					label: '技能详情',
					hideInNav: true,
					children: [
						{
							name: 'nluVersionDetail',
							label: '编辑版本详情',
						},
					],
				},
				{
					name: 'nluModelAdd',
					label: '新增技能',
					hideInNav: true,
				},
				{
					name: 'nluModelUpdate',
					label: '更新技能',
					hideInNav: true,
				},
			],
		},
		{
			name: 'nluModelTestManager',
			label: '测试管理',
			children: [
				{
					name: 'nluModelSingleTest',
					label: '单条测试',
					hideInNav: true,
				},
				{
					name: 'nluModelBatchTest',
					label: '上传批量测试文件',
					hideInNav: true,
				},
			],
		},
		{
			name: 'platformSkillManage',
			label: '平台技能',
			children: [
				{
					name: 'program',
					label: '切换方案',
					hideInNav: true,
				},
			],
		},
		{
			name: 'skillList',
			label: '技能管理',
			children: [
				{
					name: 'skillDetail',
					label: '技能详情',
					hideInNav: true,
				},
				{
					name: 'skillToolkit',
					label: '工具箱',
					hideInNav: true,
				},
			],
		},
	],
};
