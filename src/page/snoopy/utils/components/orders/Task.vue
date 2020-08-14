<style lang="scss" scoped>
span {
	font-size: 14px;
}
.el-card__body {
	position: relative;
}
.more {
	position: absolute;
	right: 0%;
	bottom: 0%;
	margin-right: 20px;
	margin-bottom: 20px;
	font-size: 14px;
	text-align: right;
}
</style>

<template>
	<el-row :gutter="12">
		<el-col :span="6" v-for="item in tasks" v-bind:key="item.id">
			<el-card shadow="hover">
				<p>
					<span>任务编号：{{ item.taskId }}</span>
				</p>
				<p>
					<span>施工员昵称：{{ item.operatorName }}</span>
				</p>
				<p>
					<span>施工员账号：{{ item.operatorAccount }}</span>
				</p>
				<p>
					<span>施工状态：{{ item.constructionStatus | constructionStatusFormat }}</span>
				</p>
				<p>
					<span>分配时间：{{ item.gmtCreate | dateFormat }}</span>
				</p>
				<a class="more" @click="getTaskRoom(item.taskId)">更多</a>

				<el-drawer
					title="任务关联的房间列表"
					:visible.sync="drawer"
					:with-header="false"
					size="40%"
				>
					<span>任务关联的房间列表</span>
					<el-table :data="taskRooms">
						<el-table-column prop="roomId" label="房间id"></el-table-column>
						<el-table-column prop="roomNo" label="房间名称"></el-table-column>
						<el-table-column
							prop="taskStatus"
							label="施工状态"
							:formatter="constructionStatusFormat"
						></el-table-column>
					</el-table>
				</el-drawer>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
// 引入时间戳转换工具
import moment from 'moment';
export default {
	name: 'Task',
	props: {
		tasks: Array,
	},
	data() {
		return {
			drawer: false,
			innerDrawer: false,
			taskRooms: [],
		};
	},
	filters: {
		// 时间戳转换日期
		dateFormat: function (value) {
			if (value == undefined || value == null) {
				return '';
			}
			return moment(value).format('YYYY-MM-DD HH:mm:ss');
		},
		constructionStatusFormat: function (status) {
			if (status == undefined) {
				return '';
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
	},
	methods: {
		getTaskRoom(taskId) {
			this.$http.get('/api/snoopy/order/task/room?taskId=' + taskId).then((res) => {
				if (res.data.code == 100) {
					this.drawer = true;
					this.taskRooms = res.data.result;
				} else if (res.data.code == undefined) {
				} else {
					this.$message.error('查询任务下的房间异常：' + res.data.msg);
				}
			});
		},
		constructionStatusFormat: function (row, column) {
			if (row == null || row == undefined) {
				return '';
			}
			const status = row[column.property];
			if (status == undefined) {
				return '';
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
	},
};
</script>
