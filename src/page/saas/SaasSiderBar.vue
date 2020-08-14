<template>
	<div>
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
			<el-radio-button :label="false">展开</el-radio-button>
			<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-s-tools"></i>
					<span slot="title">中台工具</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" @click="navDetail">dubbo 调用</el-menu-item>
					<el-menu-item index="1-2" @click="navDetail">流程图生成</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-document"></i>
					<span slot="title">日志</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1" @click="navDetail">网关日志</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-s-help"></i>
					<span slot="title">设备工具</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1" @click="navDetail">设备换绑</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'SaasSiderBar',
	data() {
		return {
			navItem: {
				'1-1': '/page/saas/saasTools',
				'1-2': '/page/saas/saasFlow',
				'2-1': '/page/saas/saasDeviceLog',
				'3-1': '/page/saas/saasDeviceProjectChange',
			},
			isCollapse: false,
		};
	},
	methods: {
		navDetail(item) {
			this.$router.push({ path: `${this.navItem[item.index]}` });
		},
	},
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
</style>
