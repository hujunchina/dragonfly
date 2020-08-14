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
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="角色管理" name="roleManage">
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
							ref="roleTableData"
							:data="roleTableData"
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
			</el-tab-pane>
			<el-tab-pane label="权限组管理" name="permissionModuleManage">
				<div>
					<el-form label-width="20%">
						<el-row>
							<el-col :span="2">
								<el-button type="success" style="margin-left: 15px;" @click="addPermissionModule()">
									新增
								</el-button>
							</el-col>
							<el-col :span="8" :offset="10">
								<el-form-item label="权限组名称:">
									<el-input
										class="inputText"
										placeholder="请输入权限组名称"
										v-model="moduleName"
										clearable
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-button
									class="searchButton"
									type="primary"
									icon="el-icon-search"
									style="margin-left: 15px;"
									@click="searchPermissionModule()"
								>
									搜索
								</el-button>
								<el-button
									style="margin-left: 15px;"
									type="primary"
									plain
									@click="resetPermissionModule()"
								>
									重置
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
							ref="permissionModuleTableData"
							:data="permissionModuleTableData"
							border
							style="width: 100%;"
							:show-overflow-tooltip="true"
						>
							<el-table-column
								prop="moduleId"
								label="权限组id"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="moduleName"
								label="权限组名称"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="accessLevel"
								label="类型"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="sort"
								label="顺序"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column fixed="right" prop="operate" width="200px" label="操作">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										@click="modifyPermissionModule(scope.row.moduleId)"
										style="margin-right: 5px;"
									>
										修改
									</el-button>
									<el-button
										size="mini"
										type="danger"
										@click="deletePermissionModule(scope.row)"
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
							@size-change="permissionModuleHandleSizeChange"
							@current-change="permissionModuleHandleCurrentChange"
							:current-page="permissionModuleCurrentPage"
							:page-sizes="[10, 20, 30, 40, 50]"
							:page-size="permissionModulePageSize"
							layout="total, sizes, prev, pager, next, jumper"
						></el-pagination>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="权限管理" name="permissionManage">
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
									@click="searchPermission()"
								>
									搜索
								</el-button>
								<el-button
									style="margin-left: 15px;"
									type="primary"
									plain
									@click="resetPermission()"
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
							ref="permissionTableData"
							:data="permissionTableData"
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
							<el-table-column
								prop="sort"
								label="顺序"
								:show-overflow-tooltip="true"
							></el-table-column>
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
							@size-change="permissionHandleSizeChange"
							@current-change="permissionHandleCurrentChange"
							:current-page="permissionCurrentPage"
							:page-sizes="[10, 20, 30, 40, 50]"
							:page-size="permissionPageSize"
							layout="total, sizes, prev, pager, next, jumper"
						></el-pagination>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
// 引入时间戳转换工具
import moment from 'moment';

export default {
	data() {
		return {
			activeName: 'roleManage',

			roleTableData: [], // 角色表格

			permissionModuleTableData: [], // 权限组表格
			permissionModuleToatalRecord: 0, // 总条数(接口参数)
			permissionModuleTotalCount: 0, // 前端页面自定义参数
			permissionModulePageSize: 20, // 默认每页条数
			permissionModulePageNo: 1, // 页码
			permissionModuleCurrentPage: 1, // 当前页码

			permissionTableData: [], // 权限点表格数据
			permissionToatalRecord: 0, // 总条数(接口参数)
			permissionTotalCount: 0, // 前端页面自定义参数
			permissionPageSize: 20, // 默认每页条数
			permissionPageNo: 1, // 页码
			permissionCurrentPage: 1, // 当前页码

			highlightId: -1, // 默认高亮行数据id
			start: 1, // 查询的页码
			msg: '', // 提示
			name: '', // 搜索条件:权限名称
			type: '', // 搜索条件:权限类型
			path: '', // 搜索条件:权限编码
			moduleName: '', // 搜索条件:权限组名称
		};
	},

	created() {
		this.loadRoleData();
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

		handleClick(tab) {
			if (tab.name == 'permissionModuleManage') {
				this.loadPermissionModuleData();
			} else if (tab.name == 'roleManage') {
				this.loadRoleData();
			} else if (tab.name == 'permissionManage') {
				this.loadPermissionData();
			}
		},

		// 每页显示数据量变更
		permissionHandleSizeChange: function (val) {
			this.permissionPageSize = val;
			this.loadPermissionData();
		},
		// 页码变更
		permissionHandleCurrentChange: function (val) {
			this.permissionCurrentPage = val;
			this.loadPermissionData();
		},

		// 每页显示数据量变更
		permissionModuleHandleSizeChange: function (val) {
			this.permissionModulePageSize = val;
			this.loadPermissionModuleData();
		},
		// 页码变更
		permissionModuleHandleCurrentChange: function (val) {
			this.permissionModuleCurrentPage = val;
			this.loadPermissionModuleData();
		},

		// 加载默认角色列表
		loadRoleData: function () {
			this.$http.get('/api/hotel/managerRole/list').then((res) => {
				if (res.data.code == 100) {
					this.roleTableData = res.data.result;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 加载权限组列表
		loadPermissionModuleData: function () {
			this.$http
				.post('/api/hotel/module/permissions', {
					moduleName: this.moduleName,
					pageNo: this.permissionModuleCurrentPage,
					pageSize: this.permissionModulePageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.permissionModuleTableData = res.data.result.data;
						this.permissionModuleTotalCount = res.data.result.total;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		// 加载权限列表
		loadPermissionData: function () {
			this.$http
				.post('/api/hotel/permissionsPage', {
					name: this.name,
					type: this.type,
					path: this.path,
					pageNo: this.permissionCurrentPage,
					pageSize: this.permissionPageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.permissionTableData = res.data.result;
						this.permissionTotalCount = res.data.rows;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		searchPermission: function () {
			this.permissionCurrentPage = 1;
			this.loadPermissionData();
		},

		resetPermission: function () {
			this.name = '';
			this.type = '';
			this.path = '';
		},

		searchPermissionModule: function () {
			this.permissionModuleCurrentPage = 1;
			this.loadPermissionModuleData();
		},

		resetPermissionModule: function () {
			this.moduleName = '';
		},

		// 跳转默认角色编辑界面
		modifyDefaultRole: function (roleDetail) {
			this.$router.push({ name: 'hotelDefaultRole', query: { roleDetail: roleDetail } });
		},

		// 跳转新增默认角色界面
		addDefaultRole: function () {
			this.$router.push({ name: 'hotelDefaultRole' });
		},

		// 跳转权限编辑界面
		modifyPermission: function (permissionId) {
			this.$router.push({ name: 'hotelPermission', query: { permissionId: permissionId } });
		},

		// 跳转权限新增界面
		addPermission: function () {
			this.$router.push({ name: 'hotelPermission' });
		},

		// 跳转权限组修改编辑界面
		modifyPermissionModule: function (moduleId) {
			this.$router.push({ name: 'hotelPermissionModule', query: { moduleId: moduleId } });
		},

		// 跳转权限组新增界面
		addPermissionModule: function () {
			this.$router.push({ name: 'hotelPermissionModule' });
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
						.delete('/api/hotel/delete/permission?permissionId=' + permission.permissionId)
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.loadPermissionData();
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

		// 删除权限组
		deletePermissionModule: function (permissionModule) {
			this.$confirm('是否确认删除' + permissionModule.moduleName, {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
			})
				.then(() => {
					this.$http
						.delete('/api/hotel/delete/modulePermission?moduleId=' + permissionModule.moduleId)
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.loadPermissionModuleData();
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
