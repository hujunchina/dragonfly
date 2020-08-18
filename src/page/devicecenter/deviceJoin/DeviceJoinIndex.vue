<template>
	<el-tabs tab-position="left" style="height: 200px;">
		<el-tab-pane :label="tableName">{{ tableName }}</el-tab-pane>
		<el-tab-pane label="配置管理">配置管理</el-tab-pane>
		<el-tab-pane label="角色管理">角色管理</el-tab-pane>
		<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
	</el-tabs>
</template>

<script>
export default {
	name: 'deviceJoinIndex',
	el: 'saasApp',
	data() {
		return {
			tableName: '进入页面会变化',
		};
	},
	methods: {
		changeName() {
			this.tableName = '已经变化了';
		},
	},
	mounted() {
		this.changeName();
	},
};
</script>
