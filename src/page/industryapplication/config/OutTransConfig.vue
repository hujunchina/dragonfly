<template>
	<div class="container">
		<!-- 搜索按钮 -->
		<el-button
			style="float: right; margin-right: 1%;"
			type="primary"
			icon="el-icon-search"
			@click="clickToSerach"
			circle
		></el-button>

		<!-- 搜索下拉框 -->
		<div v-for="(item, index) in searchList" :key="index">
			<el-input
				placeholder="请输入搜索内容"
				v-model="item.searchInput"
				style="float: right; width: 10%; margin-right: 1%;"
				:disabled="item.ifSearchEnough"
				clearable
			></el-input>
			<el-select
				style="float: right; margin-right: 1%; margin-bottom: 20px;"
				v-model="item.searchType"
				@change="searchTypeChange(item, index)"
				clearable
				placeholder="搜索类型"
			>
				<el-option
					v-for="(item, index) in searchTypeList"
					:key="index"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
		</div>

		<!-- 添加按钮 -->
		<el-button
			style="float: right; margin-right: 1%;"
			type="primary"
			@click="clickToOpenAdd"
			v-has3="'/industrymanage/tongtianManage/outTransConfig/add'"
		>
			添加
		</el-button>

		<!-- 表格 -->
		<el-table
			class="mod-login-wrapper"
			ref="testTable"
			v-loading="loading"
			:data="tableData"
			style="width: 100%;"
			border
			:default-sort="{ prop: 'id', order: 'ascending' }"
			show-overflow-tooltip
		>
			<el-table-column prop="id" label="ID" sortable></el-table-column>
			<el-table-column prop="outTransCodeId" label="外部交易编号" sortable></el-table-column>
			<el-table-column prop="paramName" label="参数名称" sortable></el-table-column>
			<el-table-column prop="paramValue" label="参数内容"></el-table-column>
			<el-table-column prop="memo" label="备注"></el-table-column>
			<el-table-column prop="creator" label="创建人" sortable></el-table-column>
			<el-table-column prop="modifier" label="修改人" sortable></el-table-column>
			<el-table-column prop="status" label="是否上线" :formatter="formatStatus"></el-table-column>
			<el-table-column fixed="right" label="操作" width="170">
				<template slot-scope="scope">
					<!--  上下线  -->
					<el-button
						v-if="scope.row.status == 1"
						@click="updateStatus(scope.row)"
						type="danger"
						icon="el-icon-arrow-down"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/outTransConfig/publish'"
					></el-button>
					<el-button
						v-if="scope.row.status == 0"
						@click="updateStatus(scope.row)"
						type="success"
						icon="el-icon-arrow-up"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/outTransConfig/publish'"
					></el-button>
					<!--  快速添加 -->
					<el-button
						@click="openAddDialogByCopy(scope.row)"
						type="primary"
						icon="el-icon-plus"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/outTransConfig/add'"
					></el-button>
					<!--  编辑 -->
					<el-button
						@click="openUpdateDialog(scope.row)"
						type="warning"
						icon="el-icon-edit"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/outTransConfig/update'"
					></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom-page" align="center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
			></el-pagination>
		</div>

		<el-dialog
			title="添加"
			:visible.sync="dialogVisible"
			width="40%"
			:before-close="handleClose"
			:close-on-press-escape="false"
			:close-on-click-modal="false"
		>
			<div>
				<el-form
					label-position="left"
					:rules="rules"
					:model="uriRuleAddContent"
					status-icon
					ref="uriRuleAddContent"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label-width="30%" label="外部交易编号" prop="outTransCodeId">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.outTransCodeId"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="参数名称" prop="paramName">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.paramName"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="参数内容" prop="outRouterType">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.paramValue"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="备注" prop="memo">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.memo"
							auto-complete="off"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUriRule">提 交</el-button>
			</span>
		</el-dialog>

		<el-dialog
			title="修改"
			:visible.sync="dialogVisibleUpdate"
			width="40%"
			:before-close="handleCloseUpdate"
			:close-on-press-escape="false"
			:close-on-click-modal="false"
		>
			<div>
				<el-form
					label-position="left"
					:rules="rules"
					:model="uriRuleUpdateContent"
					status-icon
					ref="uriRuleUpdateContent"
					label-width="100px"
					class="demo-ruleForm"
				>
					<el-form-item label-width="30%" label="外部交易编号" prop="outTransCodeId">
						<el-input
							type="text"
							v-model="uriRuleUpdateContent.outTransCodeId"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="参数名称" prop="paramName">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.paramName"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="参数内容" prop="paramValue">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.paramValue"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="备注" prop="memo">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.memo"
							auto-complete="off"
						></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleUpdate = false">取 消</el-button>
				<el-button type="primary" @click="updateUriRule">提 交</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tableData: [],
			searchType: '',

			// 搜索框搜索类型下拉数据
			searchTypeList: [
				{
					value: 'outTransCodeId',
					label: '外部交易编号',
				},
				{
					value: 'creator',
					label: '创建人',
				},
				{
					value: 'modifier',
					label: '修改人',
				},
			],

			// 三组搜索框
			searchList: [
				{
					ifSearchEnough: true,
					searchType: '',
					searchInput: '',
				},
				{
					ifSearchEnough: true,
					searchType: '',
					searchInput: '',
				},
				{
					ifSearchEnough: true,
					searchType: '',
					searchInput: '',
				},
			],

			// 默认每页数据量
			pagesize: 10,

			// 当前页码
			currentPage: 1,

			// 查询的页码
			start: 1,

			// 默认数据总数
			totalCount: 0,

			loading: true,
			dialogVisible: false,
			dialogVisibleUpdate: false,

			// 添加模板
			uriRuleAddContent: {
				outTransCodeId: '',
				paramName: '',
				paramValue: '',
				memo: '',
				creator: '',
				modifier: '',
			},

			// 编辑模板
			uriRuleUpdateContent: {
				id: '',
				outTransCodeId: '',
				paramName: '',
				paramValue: '',
				memo: '',
				modifier: '',
			},

			// 校验规则
			rules: {
				outTransCodeId: [{ required: true, message: '请输入外部交易编号', trigger: 'blur' }],
				paramName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
				paramValue: [{ required: true, message: '请输入参数内容', trigger: 'blur' }],
			},

			// 下拉框数据
		};
	},
	watch: {},

	// 定义方法
	methods: {
		// 页面load方法
		loadData: function () {
			let outTransCodeId = null;
			let modifier = null;
			let creator = null;

			// 组装多组搜索框的搜索条件赋值
			this.searchList.forEach((it) => {
				switch (it.searchType) {
					case 'outTransCodeId':
						outTransCodeId = it.searchInput;
						break;
					case 'modifier':
						modifier = it.searchInput;
						break;
					case 'creator':
						creator = it.searchInput;
						break;
					default:
						break;
				}
			});
			// 获取银行渠道系统表数据
			this.$http
				.post('/api/industrymanage/tongtianManage/outTransConfig/list', {
					outTransCodeId: outTransCodeId,
					modifier: modifier,
					creator: creator,
					offset: this.pagesize * (this.currentPage - 1),
					limit: this.pagesize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.loading = false;
						this.tableData = res.data.result.data;
						this.totalCount = res.data.result.totalCount;
					} else {
						this.$message.error('程序异常！');
					}
				});
		},

		// 新增方法
		addUriRule() {
			this.$refs.uriRuleAddContent.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/industrymanage/tongtianManage/outTransConfig/add', {
							outTransCodeId: this.uriRuleAddContent.outTransCodeId,
							paramName: this.uriRuleAddContent.paramName,
							paramValue: this.uriRuleAddContent.paramValue,
							memo: this.uriRuleAddContent.memo,
							status: 0,
							creator: this.$cookie.get('nickname'),
							modifier: this.$cookie.get('nickname'),
						})
						.then((res) => {
							if (res.data.code == 100) {
								this.$notify({
									title: '成功',
									message: '添加成功',
									type: 'success',
								});
								this.dialogVisible = false;
								this.loadData();
								this.clearUriRuleConfigData();
							} else if (res.data.code == 101) {
								this.$message.error('操作失败！');
							}
						});
				} else {
					return false;
				}
			});
		},

		// 编辑方法
		updateUriRule() {
			this.$refs.uriRuleUpdateContent.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/industrymanage/tongtianManage/outTransConfig/update', {
							id: this.uriRuleUpdateContent.id,
							outTransCodeId: this.uriRuleUpdateContent.outTransCodeId,
							paramName: this.uriRuleUpdateContent.paramName,
							paramValue: this.uriRuleUpdateContent.paramValue,
							memo: this.uriRuleUpdateContent.memo,
							modifier: this.$cookie.get('nickname'),
						})
						.then((res) => {
							if (res.data.code == 100) {
								this.$notify({
									title: '成功',
									message: '修改成功',
									type: 'success',
								});
								this.dialogVisibleUpdate = false;
								this.loadData();
								this.clearUriRuleConfigData();
							} else if (res.data.code == 101) {
								this.$message.error('操作失败！');
							}
						});
				} else {
					return false;
				}
			});
		},

		// 上下线
		updateStatus(row) {
			let status = 1;
			if (row.status == '1') {
				status = 0;
			}
			this.$confirm('此操作影响较大, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$http
					.get('/api/industrymanage/tongtianManage/outTransConfig/publish', {
						params: {
							outTransCodeId: row.outTransCodeId,
							paramName: row.paramName,
							status: status,
							modifier: this.$cookie.get('nickname'),
						},
					})
					.then((res) => {
						if (res.data.code == 100) {
							this.$notify({
								title: '成功',
								message: '修改成功',
								type: 'success',
							});
							this.dialogVisibleUpdate = false;
							// 刷新列表数据
							this.loadData();

							// 清空url数据
							this.clearUriRuleConfigData();
						} else if (res.data.code == 101) {
							this.$message.error('操作失败！');
						}
					});
			});
		},

		paramsPatternChange() {
			const params = this.uriRuleAddContent.paramsPattern;
			if (params != '') {
				this.uriRuleAddContent.uri = this.PathUtil(params);
			}
		},
		paramsPatternChangeUpdate() {
			const params = this.uriRuleUpdateContent.paramsPattern;
			if (params != '') {
				this.uriRuleUpdateContent.uri = this.PathUtil(params);
			}
		},

		// 搜索类型改变赋值
		searchTypeChange(item, index) {
			if (item.searchType == '') {
				this.searchList[index].ifSearchEnough = true;
				this.searchList[index].searchInput = '';
				this.loadData();
			} else {
				this.searchList[index].ifSearchEnough = false;
			}
		},

		// 弹出快捷添加
		openAddDialogByCopy(row) {
			// 清空数据
			this.clearUriRuleConfigData();
			this.uriRuleAddContent = JSON.parse(JSON.stringify(row));
			this.dialogVisible = true;
		},

		// 添加 biz 下拉赋值
		handleSelectBiz(item) {
			this.uriRuleAddContent.biz = item.value;
		},

		// 编辑 biz 下拉赋值
		handleSelectBizUpdate(item) {
			this.uriRuleUpdateContent.biz = item.value;
		},

		//
		querySearchBiz(queryString, cb) {
			const restaurants = this.res_biz;
			const results = queryString
				? restaurants.filter(this.createFilter(queryString))
				: restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		handleSelectRole(item) {
			this.uriRuleAddContent.role = item.value;
		},
		handleSelectRoleUpdate(item) {
			this.uriRuleUpdateContent.role = item.value;
		},
		//
		querySearchRole(queryString, cb) {
			const restaurants = this.res_role;
			const results = queryString
				? restaurants.filter(this.createFilter(queryString))
				: restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		handleSelectApplication(item) {
			this.uriRuleAddContent.application = item.value;
			this.uriRuleAddContent.authInterface = item.url;
		},
		handleSelectApplicationUpdate(item) {
			this.uriRuleUpdateContent.application = item.value;
			this.uriRuleUpdateContent.authInterface = item.url;
		},
		querySearchApplication(queryString, cb) {
			const restaurants = this.res_application;
			const results = queryString
				? restaurants.filter(this.createFilter(queryString))
				: restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createFilter(queryString) {
			return (restaurant) => {
				return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
			};
		},

		// 点击搜索
		clickToSerach() {
			this.currentPage = 1;
			this.loadData();
		},

		// 点击打开添加模态框
		clickToOpenAdd() {
			this.clearUriRuleConfigData();
			this.dialogVisible = true;
		},

		// 每页显示数据量变更
		handleSizeChange: function (val) {
			this.pagesize = val;
			this.loadData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadData();
		},

		// 关闭
		handleClose() {
			this.dialogVisible = false;
			// 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
			this.$refs.uriRuleAddContent.resetFields();
		},

		handleCloseUpdate() {
			this.dialogVisibleUpdate = false;
			this.$refs.uriRuleUpdateContent.resetFields();
		},

		// 汉化上下线状态
		formatStatus(row) {
			return row.status == '1' ? '上线' : '下线';
		},

		// 清空配置模板
		clearUriRuleConfigData() {
			this.uriRuleAddContent = {
				id: '',
				outTransCodeId: '',
				paramName: '',
				paramValue: '',
				memo: '',
				creator: '',
				modifier: '',
				status: 0,
			};
			// 编辑模板赋值
			this.uriRuleUpdateContent = this.uriRuleAddContent;
		},

		openUpdateDialog(row) {
			this.uriRuleUpdateContent = JSON.parse(JSON.stringify(row));
			this.dialogVisibleUpdate = true;
		},

		// 删除提示
		delUriRule(row) {
			this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$http
					.post('', {
						id: row.id,
						status: 0,
					})
					.then((res) => {
						if (res.data.code == 100) {
							this.$notify({
								title: '成功',
								message: '删除成功',
								type: 'success',
							});
							this.loadData();
						}
					});
			});
		},
	},
	mounted() {
		this.loadData();
	},
};
</script>
<style lang="scss" scoped>
.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
