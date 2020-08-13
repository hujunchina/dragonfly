export default {
	name: '17',
	icon: 'ios-paper',
	label: '施工商平台',
	roleId: '1',
	children: [
		{
			name: 'snoopyIndustryAudit',
			label: '行业审核',
		},
		{
			name: 'snoopyPermissionManage',
			label: '权限管理',
		},
		{
			name: 'snoopyPermissionModuleManage',
			label: '权限组管理',
		},
		{
			name: 'snoopyOemManage',
			label: 'OEM管理',
		},
		{
			name: 'snoopyOem',
			label: '默认角色管理',
		},
		{
			name: 'snoopyUtils',
			label: '小工具',
		},
	],
};
