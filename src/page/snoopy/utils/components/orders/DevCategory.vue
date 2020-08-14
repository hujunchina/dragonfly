<template>
	<div>
		<el-divider content-position="left">wifi</el-divider>
		<el-tag v-for="item in wifi" :key="item.categoryCode"
			>{{ item.categoryName }}x{{ item.quantity }}</el-tag
		>
		<el-divider content-position="left">zigbee</el-divider>
		<el-tag v-for="item in zigbee" :key="item.categoryCode"
			>{{ item.categoryName }}x{{ item.quantity }}</el-tag
		>
	</div>
</template>

<script>
export default {
	name: 'DevCategory',
	props: {
		wifi: Array,
		zigbee: Array,
	},
	data() {
		return {};
	},
};
</script>
