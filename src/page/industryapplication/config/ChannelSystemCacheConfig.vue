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
			v-has3="'/industrymanage/tongtianManage/channelSystem/add'"
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
			<el-table-column prop="channelSystemId" label="系统渠道ID" sortable></el-table-column>
			<el-table-column prop="channelSystemName" label="渠道系统名称" sortable></el-table-column>
			<el-table-column prop="memo" label="备注"></el-table-column>
			<el-table-column prop="type" label="渠道类型"></el-table-column>
			<el-table-column
				prop="parentChannelSystemId"
				label="上级渠道系统ID"
				sortable
			></el-table-column>
			<el-table-column prop="partnerId" label="渠道系统所属合作方ID" sortable></el-table-column>
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
						v-has3="'/industrymanage/tongtianManage/channelSystem/publish'"
					></el-button>
					<el-button
						v-if="scope.row.status == 0"
						@click="updateStatus(scope.row)"
						type="success"
						icon="el-icon-arrow-up"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/channelSystem/publish'"
					></el-button>
					<!--  快速添加 -->
					<el-button
						@click="openAddDialogByCopy(scope.row)"
						type="primary"
						icon="el-icon-plus"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/channelSystem/add'"
					></el-button>
					<!--  编辑 -->
					<el-button
						@click="openUpdateDialog(scope.row)"
						type="warning"
						icon="el-icon-edit"
						circle
						size="small"
						v-has3="'/industrymanage/tongtianManage/channelSystem/update'"
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
					<el-form-item label-width="30%" label="渠道系统Id" prop="channelSystemId">
						<el-input
							type="text"
							v-model="uriRuleAddContent.channelSystemId"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="渠道系统名称" prop="channelSystemName">
						<el-input
							type="text"
							v-model="uriRuleAddContent.channelSystemName"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="备注">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.memo"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="渠道类型">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.type"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="上级渠道系统ID">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.parentChannelSystemId"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="渠道系统所属合作方ID">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleAddContent.partnerId"
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
					<el-form-item label-width="30%" label="渠道系统名称" prop="channelSystemName">
						<el-input
							type="text"
							v-model="uriRuleUpdateContent.channelSystemName"
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
					<el-form-item label-width="30%" label="渠道类型" prop="type">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.type"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="上级渠道系统ID" prop="parentChannelSystemId">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.parentChannelSystemId"
							auto-complete="off"
						></el-input>
					</el-form-item>
					<el-form-item label-width="30%" label="渠道系统所属合作方ID" prop="partnerId">
						<el-input
							autosize
							type="textarea"
							v-model="uriRuleUpdateContent.partnerId"
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
					value: 'channelSystemId',
					label: '渠道系统ID',
				},
				{
					value: 'channelSystemName',
					label: '渠道系统名称',
				},
				{
					value: 'parentChannelSystemId',
					label: '上级渠道系统ID',
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
				id: '',
				httpMethod: '',
				whiteUri: 'false',
				uri: '',
				desc: '',
				application: '',
				paramsPattern: '',
				biz: '',
				role: '',
				authInterface: '',
				authMethod: '',
				version: '1.0.0',
				timeout: 5000,
				methodParams: '',
				creator: '',
				modifier: '',
			},

			// 编辑模板
			uriRuleUpdateContent: {
				id: '',
				httpMethod: '',
				whiteUri: 'false',
				uri: '',
				desc: '',
				application: '',
				paramsPattern: '',
				biz: '',
				role: '',
				authInterface: '',
				authMethod: '',
				version: '',
				status: '',
				timeout: '',
				methodParams: '',
				creator: '',
				modifier: '',
			},

			// 校验规则
			rules: {
				channelSystemName: [{ required: true, message: '请输入渠道系统名称', trigger: 'blur' }],
				type: [{ required: true, message: '请输入渠道类型', trigger: 'blur' }],
			},
		};
	},
	watch: {},

	// 定义方法
	methods: {
		// 页面load方法
		loadData: function () {
			let channelSystemId = null;
			let channelSystemName = null;
			let parentChannelSystemId = null;
			let modifier = null;
			let creator = null;
			// 组装多组搜索框的搜索条件赋值
			this.searchList.forEach((it) => {
				switch (it.searchType) {
					case 'channelSystemId':
						channelSystemId = it.searchInput;
						break;
					case 'channelSystemName':
						channelSystemName = it.searchInput;
						break;
					case 'parentChannelSystemId':
						parentChannelSystemId = it.searchInput;
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
				.post('/api/industrymanage/tongtianManage/channelSystem/list', {
					channelSystemId: channelSystemId,
					channelSystemName: channelSystemName,
					parentChannelSystemId: parentChannelSystemId,
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
						.post('/api/industrymanage/tongtianManage/channelSystem/add', {
							channelSystemId: this.uriRuleAddContent.channelSystemId,
							channelSystemName: this.uriRuleAddContent.channelSystemName,
							memo: this.uriRuleAddContent.memo,
							type: this.uriRuleAddContent.type,
							parentChannelSystemId: this.uriRuleAddContent.parentChannelSystemId,
							partnerId: this.uriRuleAddContent.partnerId,
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
						.post('/api/industrymanage/tongtianManage/channelSystem/update', {
							id: this.uriRuleUpdateContent.id,
							channelSystemId: this.uriRuleUpdateContent.channelSystemId,
							channelSystemName: this.uriRuleUpdateContent.channelSystemName,
							memo: this.uriRuleUpdateContent.memo,
							type: this.uriRuleUpdateContent.type,
							parentChannelSystemId: this.uriRuleUpdateContent.parentChannelSystemId,
							partnerId: this.uriRuleUpdateContent.partnerId,
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
			if (row.status == 1) {
				status = 0;
			}
			this.$confirm('此操作影响较大, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$http
					.get('/api/industrymanage/tongtianManage/channelSystem/publish', {
						params: {
							channelSystemId: row.channelSystemId,
							status: status,
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
			// 给add对象赋值
			this.uriRuleAddContent = JSON.parse(JSON.stringify(row));
			this.dialogVisible = true;
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

		formatWhiteUri(row) {
			return row.whiteUri == '1' ? '是' : '否';
		},

		// 清空配置模板
		clearUriRuleConfigData() {
			this.uriRuleAddContent = {
				id: '',
				channelSystemId: '',
				channelSystemName: '',
				memo: '',
				type: '',
				parentChannelSystemId: '',
				partnerId: '',
				creator: '',
				modifier: '',
			};
		},

		openUpdateDialog(row) {
			// 清空之前的值？
			this.uriRuleUpdateContent = JSON.parse(JSON.stringify(row));
			this.dialogVisibleUpdate = true;
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
