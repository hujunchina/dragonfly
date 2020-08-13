export default {
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
			name: 'appDownloadInfo',
			label: '应用下载信息',
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
};
