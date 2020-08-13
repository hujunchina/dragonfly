export const navMenus = [];
navMenus.push({
	name: '1',
	icon: 'ios-paper',
	label: 'smart-产品管理',
	roleId: '1',
	children: [
		{
			name: 'productManage',
			label: '产品管理',
			children: [
				{
					name: 'productManageDetail',
					label: '产品管理详情',
				},
				{
					name: 'productCameraConfig',
					label: '模块固件管理',
				},
			],
		},
		{
			name: 'productConfig',
			label: '产品配置',
		},
		{
			name: 'uiList',
			label: 'ui管理',
		},
		{
			name: 'permissionProjectManage',
			label: '权限管理',
			children: [
				{
					name: 'permissionUserManage',
					label: '用户角色管理',
				},
				{
					name: 'permissionRoleManage',
					label: '角色管理',
				},
				{
					name: 'permissionPermissionManage',
					label: '权限管理',
				},
				{
					name: 'permissionFunctionManage',
					label: '功能',
				},
				{
					name: 'permissionRolePermManage',
					label: '角色权限管理',
				},
				{
					name: 'permissionPermFunctionManage',
					label: '权限功能管理',
				},
			],
		},
		{
			name: 'productStandard',
			label: '指令标准化',
		},
		{
			name: 'scdxDataSync',
			label: '四川电信数据同步',
		},
		{
			name: 'liantongDataSync',
			label: '联通数据同步',
		},
		{
			name: 'zycloudDataSync',
			label: '专有云数据同步',
		},
		//     {
		//     name: 'baselineVersionManage',
		//     label: '基线版本管理',
		//     children:[{
		//         name:'baselineVersionDetail',
		//         label:'版本管理'
		//     }]
		// },
		{
			name: 'productCategoryManage',
			label: '品类管理',
			children: [
				{
					name: 'productStandardDpModManage',
					label: '功能点配置',
				},
			],
		},
		{
			name: 'hardwareUpgrade',
			label: '固件管理',
		},
		{
			name: 'firmwareChipManage',
			label: '芯片平台管理',
		},
		{
			name: 'firmwareUpgradeManage',
			label: '固件升级管理',
		},
		{
			name: 'firmwareUpgradeLog',
			label: '设备升级日志',
		},
		{
			name: 'firmwareManage',
			label: '固件及版本管理',
		},
		{
			name: 'solutionManage',
			label: '免开发方案',
			children: [
				{
					name: 'productSocStandardDpManage',
					label: '功能点配置',
				},
			],
		},
		{
			name: 'solutionFunctionManage',
			label: 'IO功能项配置',
		},
		{
			name: 'productModuleManage',
			label: '模组管理',
		},
		{
			name: 'chipPlatformManage',
			label: '芯片平台',
		},
		{
			name: 'productSampleManage',
			label: '样品管理',
		},
		{
			name: 'productConfigs',
			label: '产品属性设置',
		},
		{
			name: 'deviceActiveLimit',
			label: 'APP产品限制',
		},
		{
			name: 'networkConfig',
			label: '配网管理',
		},
		{
			name: 'whiteListManage',
			label: '白名单管理',
		},
		{
			name: 'productWhiteListManage',
			label: '产品日志白名单管理',
		},
		{
			name: 'appUserQuery',
			label: 'app用户查询',
		},
	],
});
navMenus.push({
	name: '2',
	icon: 'ios-paper',
	label: '用户管理',
	roleId: '1',
	children: [
		{
			name: 'emailCode',
			label: '测试用户验证码查询',
		},
		{
			name: 'fileUpload',
			label: '文件上传',
		},
		{
			name: 'ossList',
			label: 'OSS文件上传',
		},
		{
			name: 'iconList',
			label: '图标管理',
		},
		{
			name: 'resource',
			label: '资源管理',
		},
		{
			name: 'firmwareSign',
			label: '文件加密',
		},
		{
			name: 'smartPermissionManage',
			label: 'smart角色权限管理',
		},
		{
			name: 'constructionAPP',
			label: '工程APP',
		},
		{
			name: 'constructionAPP2',
			label: '工程APP2.0',
		},
		{
			name: 'userClear',
			label: '用户账号停用',
		},
		{
			name: 'UserOperateLog',
			label: '用户操作日志',
		},
		{
			name: 'userNotice',
			label: '登录隐私政策配置',
		},
		{
			name: 'smartVipManage',
			label: '开放平台账号等级',
		},
		{
			name: 'orderWhitelist',
			label: '物料订单白名单',
		},
	],
});
navMenus.push({
	name: '3',
	icon: 'ios-paper',
	label: '数据中心',
	roleId: '1',
	children: [
		{
			name: 'accountSearch',
			label: '账号搜索',
		},
		{
			name: 'familySearch',
			label: '家庭搜索',
		},
		{
			name: 'logbackConfig',
			label: '日志配置',
		},
		{
			name: 'deviceAuthQuery',
			label: '设备授权码查询',
		},
		{
			name: 'operatorIPManage',
			label: '运营商IP管理',
		},
		{
			name: 'operatorUUIDManage',
			label: '运营商UUID绑定',
		},
		{
			name: 'deviceOperation',
			label: '设备操作',
		},
		{
			name: 'devicePublish',
			label: '下发设备事件',
		},
		{
			name: 'voiceDic',
			label: '语音字典管理',
		},
	],
});

navMenus.push({
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
					children: [
						{
							name: 'p2pFailedEventDetail',
							label: '详情',
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
			name: 'guardList',
			label: '门禁工具',
		},
		{
			name: 'cloudStorageAlarm',
			label: '云存储异常设备查询',
		},
		{
			name: 'cameraEventCheck',
			label: '事件查询',
		},
	],
});

navMenus.push({
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
				},
				{
					name: 'nluModelAdd',
					label: '新增技能',
				},
				{
					name: 'nluModelUpdate',
					label: '更新技能',
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
				},
				{
					name: 'nluModelBatchTest',
					label: '上传批量测试文件',
				},
			],
		},
		{
			name: 'platformSkillManage',
			label: '平台技能',
		},
	],
});

navMenus.push({
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
				},
			],
		},
		{
			name: 'licenseUUID',
			label: 'UUID录入',
		},
	],
});

navMenus.push({
	name: '7',
	icon: 'ios-paper',
	label: '三方语音管理',
	roleId: '1',
	children: [
		{
			name: 'oldCpConfigManager',
			label: '老Cp配置管理',
		},
		{
			name: 'needForwardPidManage',
			label: '第三方转发voicetube产品管理',
		},
		{
			name: 'productTest',
			label: '第三方语音开通测试',
		},
		{
			name: 'iotPlatformManager',
			label: '三方平台配置管理',
		},
		{
			name: 'iotSkillManager',
			label: '底层中台配置管理',
		},
		{
			name: 'iotSplitSolutionManager',
			label: '语音拆分方案管理',
		},
		{
			name: 'iotCategorySolutionManager',
			label: '语音品类方案管理',
		},
	],
});

navMenus.push({
	name: '8',
	icon: 'ios-paper',
	label: '应用管理',
	roleId: '1',
	children: [
		{
			name: 'appPackageKit',
			label: 'App打包分支管理',
		},
		{
			name: 'appManage',
			label: '应用管理',
		},
		{
			name: 'elementConfig',
			label: '管理应用构建元数据定义',
		},
		{
			name: 'recoveryApp',
			label: '误删APP恢复',
		},
		{
			name: 'appInfo',
			label: 'appInfo',
		},
		{
			name: 'appDomainConfig',
			label: 'APP域名配置',
		},
	],
});

navMenus.push({
	name: '9',
	icon: 'ios-paper',
	label: '交易平台',
	roleId: '1',
	children: [
		{
			name: 'paidConfigManage',
			label: '支付配置管理',
		},
		{
			name: 'paidServedQuery',
			label: '支付服务查询',
		},
		{
			name: 'specificationManage',
			label: '规格管理',
		},
		{
			name: 'configManage',
			label: '配置管理',
		},
	],
});

navMenus.push({
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
				},
				{
					name: 'subaccountManage',
					label: '超级用户子账号管理',
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
			label: '通天网关SQL配置',
		},
	],
});
navMenus.push({
	name: '11',
	icon: 'ios-paper',
	label: '配置管理',
	roleId: '1',
	children: [
		{
			name: 'appConfig',
			label: 'App配置管理',
		},
		{
			name: 'mailTemplate',
			label: '邮件模板管理',
		},
		{
			name: 'appVoiceConfig',
			label: '语音通知模板管理',
		},
	],
});
navMenus.push({
	name: '12',
	icon: 'ios-paper',
	label: 'smart-运营管理',
	roleId: '1',
	children: [
		{
			name: 'appBuildAuditing',
			label: '应用打包审核',
		},
		{
			name: 'cloudKeyApplyAuditing',
			label: 'cloudKey申请审核',
		},
		{
			name: 'productAlarmAuditing',
			label: '产品告警审核',
		},
		{
			name: 'serviceApplyAuditing',
			label: '服务申请审核',
		},
		{
			name: 'appMessagePushAudit',
			label: '消息推送审核',
		},
		{
			name: 'marketApplicationConfig',
			label: '开放平台云市场',
		},
		{
			name: 'pidChangeApply',
			label: '设备PID更换凭证审核',
		},
	],
});

navMenus.push({
	name: '13',
	icon: 'ios-paper',
	label: '基础服务',
	roleId: '1',
	children: [
		{
			name: 'sceneInfoConfig',
			label: '场景配置',
		},
		{
			name: 'MsgSendOrderLog',
			label: '消息发送单查询',
		},
	],
});
