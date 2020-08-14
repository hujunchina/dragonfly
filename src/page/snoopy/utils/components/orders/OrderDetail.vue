<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="房间信息" name="first">
			<room v-bind:rooms="orderRooms" v-bind:orderId="orderId"></room>
		</el-tab-pane>
		<el-tab-pane label="任务信息">
			<task v-bind:tasks="orderTasks"></task>
		</el-tab-pane>
		<el-tab-pane label="施工设备品类">
			<dev-category v-bind:wifi="wifi" v-bind:zigbee="zigbee"></dev-category>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import Room from './Room';
import Task from './Task';
import DevCategory from './DevCategory';
export default {
	name: 'OrderDetail',
	components: {
		Room,
		Task,
		DevCategory,
	},
	props: {
		orderId: String,
		orderRooms: Array,
		orderTasks: Array,
		wifi: Array,
		zigbee: Array,
	},
	data() {
		return {
			activeName: 'first',
		};
	},
	methods: {},
};
</script>
