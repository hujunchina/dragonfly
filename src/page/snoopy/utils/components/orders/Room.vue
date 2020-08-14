<template>
	<el-table :data="rooms" stripe style="width: 100%;">
		<el-table-column prop="roomId" label="房间id"></el-table-column>
		<el-table-column prop="roomNo,roomTypeName" label="房号（房型）">
			<template slot-scope="scope"
				>{{ scope.row.roomNo }}{{ scope.row.roomTypeName | roomTypeNameFormat }}</template
			>
		</el-table-column>
		<el-table-column prop="taskId" label="任务id"></el-table-column>
		<el-table-column prop="constructionTemplateId" label="施工模板id"></el-table-column>
		<el-table-column prop="constructionTemplateName" label="施工模板名称"></el-table-column>
		<el-table-column
			prop="taskStatus"
			label="施工状态"
			:formatter="constructionStatusFormat"
		></el-table-column>
		<el-table-column prop="devices" label="设备列表">
			<template slot-scope="scope">
				<span v-for="item in scope.row.devices" :key="item.deviceId">
					<el-tooltip effect="dark" :content="item.deviceId" placement="top-start">
						<el-tag size="small" v-if="item.effective == 1" type="success">{{
							item.deviceName
						}}</el-tag>
						<el-tag size="small" v-if="item.effective == 0" type="info">{{
							item.deviceName
						}}</el-tag>
					</el-tooltip>
				</span>
			</template>
		</el-table-column>
		<el-table-column fixed="right" label="操作" width="100">
			<template slot-scope="scope">
				<el-button @click="delRoom(scope.row)" type="text" size="small">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	name: 'Room',
	props: {
		rooms: Array,
		orderId: String,
	},
	data() {
		this.colConfigs = [
			{ prop: 'roomId', label: '房间id' },
			{ prop: 'roomName', label: '房间名称' },
			{ prop: 'constructionStatus', label: '施工状态' },
			{ prop: 'devices', label: '设备列表' },
		];
		return {};
	},
	filters: {
		roomTypeNameFormat: function (data) {
			if (data != undefined && data != null && data != '') {
				return '(' + data + ')';
			} else {
				return '';
			}
		},
	},
	methods: {
		delRoom(row) {
			this.$confirm('此操作将永久删除工单下的该房间, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$http
						.delete('/api/snoopy/order/room?orderId=' + this.orderId + '&roomId=' + row.roomId)
						.then((res) => {
							if (res.data.code == 100) {
								let index = 0;
								this.rooms.forEach((item, i) => {
									if (item.roomId == this.roomId) {
										index = i;
									}
								});
								this.rooms.splice(index, 1);
								this.$message({
									type: 'success',
									message: '删除成功!',
								});
							} else if (res.data.code == undefined) {
							} else {
								this.$message.error('删除房间异常：' + res.data.msg);
							}
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
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
	},
};
</script>
