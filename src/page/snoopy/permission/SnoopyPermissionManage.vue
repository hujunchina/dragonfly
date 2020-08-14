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
					<el-col :span="8">
						<el-form-item label="权限名称:">
							<el-input
								class="inputText"
								placeholder="请输入权限名称"
								v-model="name"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="权限类型:">
							<el-input
								class="inputText"
								placeholder="请输入权限类型"
								v-model="type"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="权限编码:">
							<el-input
								class="inputText"
								placeholder="请输入权限编码"
								v-model="path"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<br />
				<el-row>
					<el-col :span="2">
						<el-button type="success" style="margin-left: 15px;" @click="addPermission()">
							新增
						</el-button>
					</el-col>
					<el-col :span="4" :offset="18">
						<el-button
							class="searchButton"
							type="primary"
							icon="el-icon-search"
							style="margin-left: 15px;"
							@click="search()"
						>
							搜索
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="reset()"
							>重置</el-button
						>
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
						prop="permissionId"
						label="权限id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="level"
						label="类型"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="name"
						label="权限名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="type"
						label="权限类型"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="path"
						label="权限编码"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="sort" label="顺序" :show-overflow-tooltip="true"></el-table-column>
					<el-table-column fixed="right" prop="operate" width="200px" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="modifyPermission(scope.row.permissionId)"
								style="margin-right: 5px;"
							>
								修改
							</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="deletePermission(scope.row)"
								style="margin-right: 5px;"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="bottom-page" align="center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 40, 50]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
				></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
// 引入时间戳转换工具
import moment from 'moment';

export default {
	data() {
		return {
			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1, // 页码
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '', // 提示
			name: '', // 搜索条件:权限名称
			type: '', // 搜索条件:权限类型
			path: '', // 搜索条件:权限编码
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},

	methods: {
		// 时间戳转换日期
		dateFormat: function (row, column) {
			const date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
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
			this.loadData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadData();
		},

		// 加载权限列表
		loadData: function () {
			this.$http
				.post('/api/snoopy/permissionsPage', {
					name: this.name,
					type: this.type,
					path: this.path,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.tableData = res.data.result;
						this.totalCount = res.data.rows;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		search: function () {
			this.currentPage = 1;
			this.loadData();
		},

		reset: function () {
			this.name = '';
			this.type = '';
			this.path = '';
		},

		// 跳转权限编辑界面
		modifyPermission: function (permissionId) {
			this.$router.push({ name: 'snoopyPermission', query: { permissionId: permissionId } });
		},

		// 跳转权限新增界面
		addPermission: function () {
			this.$router.push({ name: 'snoopyPermission' });
		},

		// 删除权限
		deletePermission: function (permission) {
			this.$confirm('是否确认删除' + permission.name, {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
			})
				.then(() => {
					this.$http
						.delete('/api/snoopy/delete/permission?permissionId=' + permission.permissionId)
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.loadData();
								this.$message.success('删除成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							return;
						})
						.catch(() => {
							this.$message.error('unexpected request failed.');
						});
				})
				.catch(() => {
					/**
					 * 点击了取消按钮
					 */
				});
		},
	},
};
</script>
