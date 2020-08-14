<template>
	<el-table :data="basicInfo" style="width: 100%;">
		<el-table-column prop="id" label="工单编号"></el-table-column>
		<el-table-column prop="serviceProviderName" label="服务商名称"></el-table-column>
		<el-table-column prop="sourceName" label="工单来源"></el-table-column>
		<el-table-column prop="projectName" label="施工项目"></el-table-column>
		<el-table-column
			prop="orderStatus"
			label="施工状态"
			:formatter="constructionStatusFormat"
		></el-table-column>
		<el-table-column prop="roomQuantity" label="房间数量"></el-table-column>
		<el-table-column prop="deviceQuantity" label="设备数量"></el-table-column>
		<el-table-column
			prop="orderType"
			label="工单类型"
			:formatter="orderTypeFormat"
		></el-table-column>
		<el-table-column prop="gmtCreate" label="创建时间" :formatter="dateFormat"></el-table-column>
		<el-table-column prop="startTime" label="开始时间" :formatter="dateFormat"></el-table-column>
		<el-table-column prop="endTime" label="结束时间" :formatter="dateFormat"></el-table-column>
	</el-table>
</template>

<script>
// 引入时间戳转换工具
import moment from 'moment';
export default {
	name: 'BasicInfo',
	props: {
		basicInfo: Array,
	},
	data() {
		return {
			tableData: this.basicInfo,
		};
	},
	methods: {
		// 时间戳转换日期
		dateFormat: function (row, column) {
			if (row == null || row == undefined) {
				return '';
			}
			const date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
		constructionStatusFormat: function (row, column) {
			if (row == null || row == undefined) {
				return '';
			}
			const status = row[column.property];
			if (status == undefined) {
				return '';
			}
			if (status == 0) {
				return '未分配';
			}
			if (status == 1) {
				return '待施工';
			}
			if (status == 2) {
				return '施工中';
			}
			if (status == 3) {
				return '待验收';
			}
			if (status == 4) {
				return '已验收';
			}
		},
		orderTypeFormat(row, column) {
			if (row == null || row == undefined) {
				return '';
			}
			const status = row[column.property];
			if (status == undefined) {
				return '';
			}
			if (status == 1) {
				return '施工';
			}
			if (status == 2) {
				return '维修';
			}
		},
	},
};
</script>
