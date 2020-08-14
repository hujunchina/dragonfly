<style lang="scss" scoped>
.el-date-editor--datetimerange.el-input__inner {
	width: 90%;
}

.el-select {
	width: 90%;
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #eff869;
}

.mod-login-wrapper {
	margin-bottom: 20px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
<template>
	<div class="container">
		<div>
			<el-form label-width="20%">
				<el-row>
					<el-col :span="3">
						<el-button type="success" style="margin-left: 15px;" @click="addDefaultRole()">
							新增角色
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<br />
		<div>
			<div>
				<el-table
					class="mod-login-wrapper"
					ref="tableData"
					:data="tableData"
					border
					style="width: 100%;"
					:show-overflow-tooltip="true"
				>
					<el-table-column
						prop="roleId"
						label="角色id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="roleName"
						label="角色名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="level"
						label="类型"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="remark"
						label="描述"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column fixed="right" prop="operate" width="200px" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="modifyDefaultRole(scope.row)"
								style="margin-right: 5px;"
							>
								修改
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tableData: [],
			highlightId: -1, // 默认高亮行数据id
			msg: '', // 提示
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},

	methods: {
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

		// 加载默认角色列表
		loadData: function () {
			this.$http.get('/api/snoopy/managerRole/list').then((res) => {
				if (res.data.code == 100) {
					this.tableData = res.data.result;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 跳转默认角色编辑界面
		modifyDefaultRole: function (roleDetail) {
			this.$router.push({ name: 'snoopyDefaultRole', query: { roleDetail: roleDetail } });
		},

		// 跳转新增默认角色界面
		addDefaultRole: function () {
			this.$router.push({ name: 'snoopyDefaultRole' });
		},
	},
};
</script>
