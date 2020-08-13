const product = {
	label: '产品设备管理',
	children: [
		{
			name: 'productManage',
			label: '产品管理',
			children: [
				{
					name: 'productManageDetail',
					label: '产品管理详情',
					hideInNav: true,
				},
				{
					name: 'productCameraConfig',
					label: '模块固件管理',
					hideInNav: true,
				},
				{
					name: 'devUserDetail',
					label: '开发平台用户详情',
					hideInNav: true,
				},
				{
					name: 'productDPStatistic',
					label: '数据统计',
					hideInNav: true,
				},
				{
					name: 'productLangPackConfig',
					label: '语言包配置',
					hideInNav: true,
				},
				{
					name: 'productSpecificationConfig',
					label: '说明书与安装视频配置',
					hideInNav: true,
				},
				{
					name: 'productGuidanceConfig',
					label: '引导页配置',
					hideInNav: true,
				},
			],
		},
		{
			name: 'firmwareUpgradeLog',
			label: '设备升级日志',
		},
		{
			name: 'productConfigs',
			label: '产品属性设置',
		},
		{
			name: 'deviceActiveLimit',
			label: 'App产品限制',
		},
	],
};

const chip = {
	label: '芯片模组管理',
	children: [
		{
			name: 'chipPlatformManage',
			label: '芯片平台管理',
			children: [
				{
					name: 'chipPlatformEdit',
					label: '编辑',
					hideInNav: true,
				},
				{
					name: 'baselineVersionDetail',
					label: 'CI产物',
					hideInNav: true,
				},
			],
		},
		{
			name: 'productModuleManage',
			label: '模组资料管理',
			children: [
				{
					name: 'productModuleEdit',
					label: '编辑',
					hideInNav: true,
				},
			],
		},
		{
			name: 'productPcbaManage',
			label: 'PCBA资料管理',
		},
		{
			name: 'productModuleFirmwareManage',
			label: '通讯模组固件管理',
			children: [
				{
					name: 'moduleFirmwareConfig',
					label: '通用固件配置项管理',
					hideInNav: true,
				},
				// {
				//   name: 'moduleFirmwareConfigBatch',
				//   label: '通用固件配置项批量管理',
				//   hideInNav: true,
				// },
				{
					name: 'moduleFirmwareConfigIo',
					label: 'IO配置详情',
					hideInNav: true,
				},
			],
		},
	],
};

const firmware = {
	label: '固件管理',
	children: [
		{
			name: 'firmwareManage',
			label: '固件及版本管理',
			children: [
				{
					name: 'FirmwareGrayReleaseWhiteList',
					label: '灰度发布-白名单管理',
					hideInNav: true,
				},
			],
		},
		{
			name: 'firmwareUpgradeManage',
			label: '固件升级管理',
		},
		{
			name: 'firmwarePidOTA',
			label: '跨PID/key固件升级',
		},
	],
};

const firmwareConfig = {
	label: '固件配置管理',
	children: [
		{
			name: 'solutionFunctionManage',
			label: 'IO功能项配置',
		},
		{
			name: 'ioConfigRepository',
			label: '固件配置库',
			children: [
				{
					name: 'ioConfigDetail',
					label: '配置库详情',
					hideInNav: true,
				},
			],
		},
	],
};

const category = {
	label: '品类方案管理',
	children: [
		{
			name: 'productCategoryManage',
			label: '品类管理',
			children: [
				{
					name: 'productStandardDpModManage',
					label: '功能点配置',
					hideInNav: true,
				},
			],
		},
		{
			name: 'solutionManage',
			label: '免开发方案',
			children: [
				{
					name: 'productSocStandardDpManage',
					label: '功能点配置',
					hideInNav: true,
				},
				{
					name: 'solutionModule',
					label: '交付物管理',
					hideInNav: true,
				},
				{
					name: 'solutionModuleDetail',
					label: '交付物管理',
					hideInNav: true,
					children: [
						{
							name: 'solutionModuleIo',
							label: 'IO配置详情',
						},
					],
				},
			],
		},
		{
			name: 'Hardware',
			label: '硬件方案创作台',
		},
		{
			name: 'productCategoryLabelManage',
			label: '品类标签管理',
		},
	],
};

const ui = {
	label: 'UI管理',
	children: [
		{
			name: 'uiList',
			label: 'UI管理',
		},
		{
			name: 'uiInfraredCategory',
			label: '红外产品类目管理',
		},
	],
};

const network = {
	label: '配网管理',
	children: [
		{
			name: 'networkConfig',
			label: '配网管理',
		},
		{
			name: 'networkSearch',
			label: '配网搜索',
		},
	],
};

// const purchase = {
//   label: '采购物料',
//   children: [
//     {
//       name: 'relatedCommodityConfig',
//       label: '关联商品配置',
//     },
//     {
//       name: 'productSampleManage',
//       label: '样品管理',
//     },
//   ],
// };

const whitelist = {
	label: '白名单',
	children: [
		{
			name: 'whiteListManage',
			label: '通用白名单',
		},
		{
			name: 'productWhiteListManage',
			label: '产品日志白名单管理',
		},
	],
};

const appUser = {
	label: 'App用户查询',
	name: 'appUserQuery',
};

const permission = {
	label: '权限管理',
	name: 'permissionProjectManage',
	children: [
		{
			name: 'permissionUserManage',
			label: '用户角色管理',
			hideInNav: true,
		},
		{
			name: 'permissionRoleManage',
			label: '角色管理',
			hideInNav: true,
		},
		{
			name: 'permissionPermissionManage',
			label: '权限管理',
			hideInNav: true,
		},
		{
			name: 'permissionFunctionManage',
			label: '功能',
			hideInNav: true,
		},
		{
			name: 'permissionRolePermManage',
			label: '角色权限管理',
			hideInNav: true,
		},
		{
			name: 'permissionPermFunctionManage',
			label: '权限功能管理',
			hideInNav: true,
		},
	],
};

const direction = {
	label: '指令标准化',
	name: 'productStandard',
};

const privateCloudSync = {
	label: '私有云数据同步',
	children: [
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
	],
};

const standard = {
	label: '标准库管理',
	name: 'productValueStandard',
	children: [
		{
			label: '标准单位库',
			name: 'productUnitStandard',
		},
		{
			label: '标准枚举库',
			name: 'productEnumStandard',
		},
		{
			label: '标准故障库',
			name: 'productFaultStandard',
		},
	],
};

const deviceAuth = {
	label: '设备开发者权限',
	name: 'deviceDeveloperAuth',
};

export default {
	icon: '',
	label: '产品管理',
	children: [
		product,
		chip,
		firmware,
		firmwareConfig,
		category,
		ui,
		network,
		// purchase,
		whitelist,
		appUser,
		permission,
		direction,
		privateCloudSync,
		standard,
		deviceAuth,
	],
};
