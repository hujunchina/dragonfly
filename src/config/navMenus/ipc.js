export default {
	name: '4',
	icon: 'ios-paper',
	label: 'IPC管理',
	roleId: '1',
	children: [
		{
			name: 'logList',
			label: 'P2P日志',
			children: [
				{
					name: 'logDetail',
					label: '日志详情',
					hideInNav: true,
				},
			],
		},
		{
			name: 'p2pIdNum',
			label: 'P2P余量',
		},
		{
			name: 'p2pSearch',
			label: 'P2P归属',
		},
		{
			name: 'failedEventStatistics',
			label: 'p2p失败事件统计',
			children: [
				{
					name: 'p2pFailedEventList',
					label: '失败事件列表',
					hideInNav: true,
					children: [
						{
							name: 'p2pFailedEventDetail',
							label: '详情',
							hideInNav: true,
						},
					],
				},
			],
		},
		{
			name: 'uuidExcel',
			label: 'UUID导入',
		},
		{
			name: 'p2pImport',
			label: 'p2p采购导入',
		},
		{
			name: 'ipcSolution',
			label: 'ipc 方案',
		},
		{
			name: 'ipcImportSolution',
			label: 'ipc方案批量导入',
		},
		{
			name: 'guardList',
			label: '门禁工具',
		},
		{
			name: 'dpManage',
			label: 'IPC通用推送DP管理',
		},
		{
			name: 'cloudStorageAlarm',
			label: '云存储异常设备查询',
		},
		{
			name: 'ossFileHandleRecode',
			label: '对象存储文件记录查询',
		},
		{
			name: 'cameraEventCheck',
			label: '事件查询',
		},
	],
};
