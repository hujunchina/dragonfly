export default {
	name: '13',
	icon: 'ios-paper',
	label: '基础服务',
	roleId: '1',
	children: [
		{
			name: 'gotone',
			label: '消息中心',
			children: [
				{
					name: 'SceneInfoConfig',
					label: '渠道场景配置',
				},
				{
					name: 'MsgSendOrderLog',
					label: '消息发送单查询',
				},
				{
					name: 'MsgSceneCount',
					label: '场景数据统计',
				},
			],
		},
	],
};
