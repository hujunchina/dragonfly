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
			<el-select v-model="option" placeholder="请选择搜索类型(本期只支持UID)">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-input
				v-if="option === 'uid'"
				class="inputText"
				placeholder="请输入用户id，精确匹配"
				v-model="uid"
				style="width: 245px;"
				clearable
			></el-input>
			<el-input
				v-if="option === 'username'"
				class="inputText"
				placeholder="请输入用户账号，精确匹配"
				v-model="username"
				style="width: 245px;"
				clearable
			></el-input>
			<el-input
				v-if="option === 'enterpriseName'"
				class="inputText"
				placeholder="请输入企业名称，精确匹配"
				v-model="enterpriseName"
				style="width: 245px;"
				clearable
			></el-input>
			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
				>搜索</el-button
			>
			<el-button
				style="margin-left: 15px;"
				type="primary"
				plain
				@click="addAdminUser('adminUserForm')"
				>新增超级用户</el-button
			>
		</div>
		<br />
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
					<el-table-column prop="aid" width="79px" label="序号"></el-table-column>
					<el-table-column prop="uid" label="用户id"></el-table-column>
					<el-table-column prop="username" label="用户账号"></el-table-column>
					<el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
					<el-table-column prop="contactPerson" label="联系人"></el-table-column>
					<el-table-column prop="mobile" label="手机号"></el-table-column>
					<el-table-column
						prop="gmtCreate"
						label="创建时间"
						:formatter="dateFormat"
					></el-table-column>
					<el-table-column
						prop="gmtModified"
						label="修改时间"
						:formatter="dateFormat"
					></el-table-column>
					<el-table-column fixed="right" prop="operate" label="用户管理">
						<template slot-scope="scope">
							<a
								href="javaScript:;"
								@click="showAdminuserDetail(scope.row)"
								style="margin-right: 11px;"
								>详情</a
							>
							<a href="javaScript:;" @click="editAdminuserPWD(scope.row)">编辑</a>
						</template>
					</el-table-column>
					<el-table-column fixed="right" prop="operate" label="产品管理">
						<template slot-scope="scope">
							<router-link :to="{ path: 'AdminUserProductManage', query: { id: scope.row.id } }"
								>管理</router-link
							>
						</template>
					</el-table-column>
					<el-table-column fixed="right" prop="operate" label="子账号管理">
						<template slot-scope="scope">
							<router-link :to="{ path: 'SubaccountManage', query: { id: scope.row.id } }"
								>管理</router-link
							>
						</template>
					</el-table-column>
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

		<!-- 用户管理 详情 的展示 -->
		<el-dialog :title="showDetail" :visible.sync="showDetailDialog" center>
			<el-form ref="showserForm" :model="showUserForm" label-width="183px">
				<el-form-item label="用户id" prop="uid">
					<el-input v-model="showUserForm.uid"></el-input>
				</el-form-item>
				<el-form-item label="用户账号" prop="username">
					<el-input v-model="showUserForm.username"></el-input>
				</el-form-item>
				<el-form-item label="开发者id" prop="developerUid">
					<el-input v-model="showUserForm.developerUid"></el-input>
				</el-form-item>
				<el-form-item label="注册日期" prop="gmtCreate">
					<el-input v-model="showUserForm.gmtCreate"></el-input>
				</el-form-item>
				<el-form-item label="企业名称" prop="enterpriseName">
					<el-input v-model="showUserForm.enterpriseName"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contactPerson">
					<el-input v-model="showUserForm.contactPerson"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="mobile">
					<el-input v-model="showUserForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="创建人" prop="creator">
					<el-input v-model="showUserForm.creator"></el-input>
				</el-form-item>
				<el-form-item label="修改人" prop="modifier">
					<el-input v-model="showUserForm.modifier"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="showUserForm.remark"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 用户管理 编辑（更新当前用户密码）-->
		<el-dialog :title="showEdit" :visible.sync="showEditDialog" center>
			<el-form ref="showserForm" :model="showUserForm" label-width="183px">
				<el-form-item label="用户密码" prop="password">
					<el-input v-model="showUserForm.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="repassword">
					<el-input v-model="showUserForm.repassword" placeholder="请确认您的密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showEditDialog = false">取消</el-button>
					<el-button type="primary" @click="commitUpdate()" :loading="commitLoading"
						>确认</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 新增超级管理员的弹窗 -->
		<el-dialog :title="addTitle" :visible.sync="showAddDialog" center>
			<el-form :model="adminUserForm" ref="adminUserForm" :rules="rules" label-width="183px">
				<el-form-item label="开发者账号" prop="developerUid">
					<el-input
						v-model="adminUserForm.developerUid"
						placeholder="请输入开发平台开发者账号"
					></el-input>
				</el-form-item>
				<el-form-item label="应用id" prop="appId">
					<el-select
						v-model="adminUserForm.appId"
						placeholder="请选择应用id"
						style="margin-left: 0;"
					>
						<el-option v-for="item in appIds" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="国家码" prop="countryCode">
					<el-select
						v-model="adminUserForm.countryCode"
						placeholder="请选择国家码"
						style="margin-left: 0;"
					>
						<el-option
							v-for="country in countryCodes"
							:key="country.value"
							:label="country.label"
							:value="country.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="账号" prop="admin">
					<el-input v-model="adminUserForm.admin"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="adminUserForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="repassword">
					<el-input v-model="adminUserForm.repassword" placeholder="请确认用户密码"></el-input>
				</el-form-item>
				<el-form-item label="联系人" prop="contactPerson">
					<el-input v-model="adminUserForm.contactPerson" placeholder="请填写联系人"></el-input>
				</el-form-item>
				<el-form-item label="联系人手机号" prop="mobile">
					<el-input v-model="adminUserForm.mobile" placeholder="请填写联系人手机号"></el-input>
				</el-form-item>

				<el-form-item label="选择模块名" prop="checkModules">
					<el-checkbox
						:indeterminate="isIndeterminate"
						v-model="checkAll"
						@change="handleCheckAllChange"
						>全选</el-checkbox
					>
					<div style="margin: 15px 0;"></div>
					<el-checkbox-group v-model="checkedModules" @change="handleCheckedModulesChange">
						<el-checkbox
							v-for="module in modules"
							:label="module"
							:key="module.value"
							:value="module"
							>{{ module.label }}</el-checkbox
						>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item>
					<el-button @click="showAddDialog = false">取消</el-button>
					<el-button type="primary" @click="submitForm('adminUserForm')" :loading="commitLoading"
						>保存</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
// 引入时间戳转换工具
import moment from 'moment';

const moduleOptions = [
	{
		value: '1004',
		label: '订单管理',
	},
	{
		value: '1017',
		label: '退单管理',
	},
	{
		value: '1010',
		label: '押金管理',
	},
	{
		value: '1001',
		label: '子账号管理',
	},
	{
		value: '1005',
		label: '订单统计－周期',
	},
	{
		value: '1006',
		label: '订单统计－区域',
	},
	{
		value: '1011',
		label: '押金退还管理',
	},
	{
		value: '1007',
		label: '分析报表',
	},
	{
		value: '1008',
		label: '场所管理',
	},
	{
		value: '1012',
		label: '提现管理',
	},
	{
		value: '1009',
		label: '代理商管理',
	},
	{
		value: '1013',
		label: '活动列表',
	},

	{
		value: '1014',
		label: '红包使用明细',
	},
	{
		value: '1015',
		label: '用户等级折扣管理',
	},
	{
		value: '1002',
		label: '用户管理',
	},
	{
		value: '1003',
		label: '设备管理',
	},
	{
		value: '1016',
		label: '故障管理',
	},
	{
		value: '1018',
		label: '操作日志',
	},
	{
		value: '1020',
		label: '菜单管理',
	},
	{
		value: '1019',
		label: '用户反馈',
	},
];

export default {
	data() {
		var validateRepassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.adminUserForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var validateDevelop = (rule, value, callback) => {
			if (value) {
				// this.developerUid = "ay1505890926194NzgVK";
				this.$http
					.post('/api/industrymanage/adminusermanage/getAppIdByAccount', {
						developerUid: this.adminUserForm.developerUid,
					})
					.then((res) => {
						if (res.data.code == 100) {
							this.admin = res.data.result.username;
							this.password = res.data.result.password;
							this.appIds = res.data.result.appIds;
							if (this.appIds.length > 0) {
								callback();
							} else {
								callback(new Error('该账号没有绑定应用'));
							}
						} else {
							callback(new Error(res.data.msg));
						}
					});
			} else {
				callback(new Error('请输入开发者账号'));
			}
		};
		return {
			options: [
				{
					value: 'uid',
					label: '用户id',
				},
				{
					value: 'username',
					label: '用户账号',
				},
				{
					value: 'enterpriseName',
					label: '企业名称',
				},
			],
			countryCodes: [
				{
					value: '86-',
					label: '86-',
				},
				{
					value: '其他',
					label: '其他',
				},
			],

			option: '',
			appIds: [],
			userModelDOS: [],
			aid: '', // 序号
			uid: '', // 用户id
			username: '', // 管理员名字
			enterpriseName: '', // 企业名称
			isChild: '',
			bizType: '',

			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',

			val: '',
			showDetail: '',
			showDetailDialog: false, // 展示当前用户的详情
			showEdit: '',
			showEditDialog: false, // 展示编辑弹框

			showAddDialog: false,
			commitLoading: false, // 保存和确定编辑
			updateTitle: '',
			createTitle: '',
			addTitle: '',

			// 超级管理员的信息（用户详情）
			adminUserForm: {
				uid: '', // 用户id
				username: '', // 用户账号
				developerUid: '', // 开发者账号
				gmtCreate: '', // 注册日期
				enterpriseName: '', // 企业名称
				contactPerson: '', // 联系人
				mobile: '', // 联系人手机号
				creator: '', // 创建人
				modifier: '', // 修改人
				remark: '', // 备注

				appId: '', // 应用id
				countryCode: '', // 国家码
				admin: '', // 账号
				password: '', // 密码
				repassword: '', // 确认密码
				// contacter: "" //联系人
				modules: '',
			},
			// 超级管理员的信息（用户详情）
			showUserForm: {},
			checkAll: false,
			checkedModules: [],
			modules: moduleOptions,
			isIndeterminate: true,

			rules: {
				developerUid: [{ required: true, validator: validateDevelop, trigger: 'blur' }],
				appId: [{ required: true, message: '请选择应用id', trigger: 'blur' }],
				countryCode: [{ required: true, message: '请选择国家码', trigger: 'blur' }],
				admin: [{ required: true, message: '请输入用户账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
				repassword: [{ required: true, validator: validateRepassword, trigger: 'blur' }],
				mobile: [{ required: true, message: '请填写联系人手机号', trigger: 'blur' }],
				contactPerson: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
			},
		};
	},
	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {
		this.loadData();
	},

	methods: {
		handleCheckAllChange: function (val) {
			this.checkedModules = val ? moduleOptions : [];
			this.isIndeterminate = false;
		},
		handleCheckedModulesChange: function (value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.modules.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.modules.length;
		},

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
			this.loadData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadData();
		},

		// 显示支付配置列表数据(未搜索时)
		loadData: function () {
			this.$http
				.post('/api/industrymanage/adminusermanage/list', {
					uid: this.uid,
					type: this.option,
					bizType: this.bizType,
					userType: this.userType,
					isChild: this.isChild,
					username: this.username,
					enterpriseName: this.enterpriseName,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.tableData = res.data.result.pageInfo.list;
						for (let i = 0; i < this.tableData.length; i++) {
							// 排序依次显示
							this.tableData[i].aid = this.pageSize * (this.currentPage - 1) + (i + 1);
						}
						this.totalCount = res.data.result.pageInfo.total;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		// 在添加超级用户之前 回显该开发者账号下的appId
		getAppIds: function () {
			if (this.adminUserForm.developerUid) {
				// this.developerUid = "ay1505890926194NzgVK";
				this.$http
					.post('/api/industrymanage/adminusermanage/getAppIdByAccount', {
						developerUid: this.adminUserForm.developerUid,
					})
					.then((res) => {
						if (res.data.code == 100) {
							this.admin = res.data.result.username;
							this.password = res.data.result.password;
							this.appIds = res.data.result.appIds;
						} else {
							this.$message.error('程序异常！' + res.data.msg);
						}
					});
			}
		},

		search: function () {
			// 点击搜索后将页码重置
			this.currentPage = 1;
			this.loadData();
		},

		// 展示用户详情
		showAdminuserDetail: function (adminInfo) {
			this.showDetailDialog = true;
			adminInfo.gmtCreate = adminInfo.gmtCreate * 1000;
			adminInfo.gmtCreate = moment(adminInfo.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
			this.showUserForm = JSON.parse(JSON.stringify(adminInfo));
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.commitAdd();
				} else {
					return false;
				}
			});
		},
		// 提交 新增超级用户
		commitAdd: function () {
			this.adminUserForm.modules = this.checkedModules;
			this.$http
				.post('/api/industrymanage/adminusermanage/addAdminUser', this.adminUserForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.showAddDialog = false;
						this.loadData();
						this.$message.success('操作成功');
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showAddDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 新增超级用户，点击新增按钮的时候，将当前的用户账号和密码回显到新增框
		addAdminUser() {
			this.showAddDialog = true;
			this.getAppIds();
		},

		// 用户管理下的编辑功能，只是修改当前用户下的密码
		editAdminuserPWD(admin) {
			this.showEditDialog = true;
			this.showUserForm = JSON.parse(JSON.stringify(admin));
		},

		// 提交 编辑用户密码
		commitUpdate: function () {
			this.$http
				.post('/api/industrymanage/adminusermanage/updateAdminUser', this.showUserForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.showEditDialog = false;
						this.loadData();
						this.$message.success('操作成功');
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showEditDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.$message.error('unexpected request failed.');
				});
		},
	},
};
</script>
