<style lang="scss" scoped>
.inputText {
	width: 180px;
	margin-left: 20px;
}

.el-select {
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #c9e5f5;
}

#top {
	padding: 5px;
	overflow: hidden;
	background: #20a0ff;
}

.createTime {
	margin-bottom: 40px;
	margin-left: 20px;
}

.el-tag {
	margin-right: 20px;
	margin-left: 20px;
}

.mod-login-wrapper {
	margin-bottom: 20px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>

<style>
.app {
	position: relative;
	right: 50px;
	left: 50px;
	font-size: 25px;
}
</style>

<template>
	<div class="container">
		<div>
			<div>
				<el-table
					class="mod-login-wrapper"
					ref="tableData"
					:data="tableData"
					style="width: 100%;"
					border
					show-overflow-tooltip
				>
					<el-table-column prop="id" width="79px" label="序号"></el-table-column>
					<el-table-column prop="uid" label="子账号ID"></el-table-column>
					<el-table-column prop="username" label="用户名称"></el-table-column>
					<el-table-column prop="moduleNames" label="权限列表"></el-table-column>
					<el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
				</el-table>
			</div>

			<div class="bottom-page" align="center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

export default {
	data() {
		return {
			id: '',
			uid: '', // 用户id
			username: '', // 用户名
			moduleNames: '', // 权限列表
			gmtCreate: '', // 创建时间

			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
		};
	},

	methods: {
		// 时间戳转换日期
		dateFormat: function (row, column) {
			var date = row[column.property];
			var timestamp = date * 1000; // 秒级别转为毫秒级别
			if (timestamp == undefined) {
				return '';
			}
			return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
		},

		// 点击行响应
		handleclick: function (row) {
			this.highlightId = row.id;
		},
		// 改变当前点击的行的class，高亮当前行
		tableRowClassName: function (row) {
			if (row.id == this.highlightId) {
				return 'info-row';
			}
		},

		// 每页显示数据量变更
		handleSizeChange: function (val) {
			this.pageSize = val;
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
		},
	},
};
</script>
