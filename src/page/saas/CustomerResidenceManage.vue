<style lang="scss" scoped>
.inputText {
	width: 180px;
	margin-left: 20px;
	text-overflow: ellipsis;
}

.el-select {
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #eff869;
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

<template>
	<div class="container">
		<div>
			<el-input
				class="inputText"
				placeholder="请输入企业名称"
				v-model="industryCompanyName"
				clearable
			></el-input>
			<el-input
				class="inputText"
				placeholder="请输入行业入驻id"
				v-model="clientEntryId"
				clearable
			></el-input>
			<el-select
				v-model="industryType"
				clearable
				placeholder="请输入行业类型"
				style="width: 180px;"
			>
				<el-option
					v-for="item in industryTypes"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-input
				class="inputText"
				placeholder="请输入开发者uid"
				v-model="developerUid"
				clearable
			></el-input>
			<el-input
				class="inputText"
				placeholder="请输入开发者biz-type"
				v-model="developerBizType"
				clearable
			></el-input>
			<el-input
				class="inputText"
				placeholder="请输入命名空间"
				v-model="namespace"
				clearable
			></el-input>

			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
			>
				搜索
			</el-button>
			<el-button style="margin-left: 15px;" type="primary" plain @click="clientInfo()"
				>新 增</el-button
			>
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
					<el-table-column prop="id" width="66px" label="序号"></el-table-column>
					<el-table-column
						prop="clientEntryId"
						label="入驻id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="namespace"
						label="命名空间"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="industryCompanyName"
						label="企业名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="developerUid"
						label="开发者uid"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="developerBizType"
						label="开发者bizType"
						:show-overflow-tooltip="true"
					></el-table-column>

					<el-table-column fixed="right" prop="operate" label="操作">
						<template slot-scope="scope">
							<a href="javaScript:;" @click="clientInfo(scope.row)" style="margin-right: 11px;"
								>编辑</a
							>
							<a href="javaScript:;" @click="showDetail(scope.row)" style="margin-right: 11px;"
								>详情</a
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

		<!-- 新增  -->
		<el-dialog :title="createTitle" :visible.sync="showDialog" center>
			<el-form :model="clientForm" :rules="rules" ref="clientForm" label-width="193px">
				<el-form-item label="行业类型" prop="industryType">
					<el-select
						v-model="clientForm.industryType"
						clearable
						placeholder="请选择行业类型"
						style="width: 360px; margin-left: 20px;"
					>
						<el-option
							v-for="item in industryTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业名称" prop="industryCompanyName">
					<el-input
						v-model="clientForm.industryCompanyName"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="域名链接" prop="industryUri">
					<el-input
						v-model="clientForm.industryUri"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="营业执照" prop="industryCompanyBuslicense">
					<el-input
						v-model="clientForm.industryCompanyBuslicense"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="公司logo" prop="industryLogo">
					<el-input
						v-model="clientForm.industryLogo"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者uid" prop="developerUid">
					<el-input
						v-model="clientForm.developerUid"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者bizType" prop="developerBizType">
					<el-input
						v-model="clientForm.developerBizType"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="管理员密码" prop="password">
					<el-input
						v-model="clientForm.password"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="repassword">
					<el-input
						v-model="clientForm.repassword"
						placeholder="请确认密码"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="接入备注" prop="remark">
					<el-input v-model="clientForm.remark" style="width: 360px; margin-left: 20px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-button type="primary" @click="commitCURD()" :loading="commitLoading">保 存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 更新  -->
		<el-dialog :title="updateTitle" :visible.sync="showUpdateDialog" center>
			<el-form :model="clientForm" :rules="rules" ref="clientForm" label-width="193px">
				<el-form-item label="行业入驻id" prop="clientEntryId">
					<el-input
						v-model="clientForm.clientEntryId"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="行业类型" prop="industryType">
					<el-select
						v-model="clientForm.industryType"
						clearable
						placeholder="请选择行业类型"
						style="width: 360px; margin-bottom: 0; margin-left: 20px;"
					>
						<el-option
							v-for="item in industryTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业名称" prop="industryCompanyName">
					<el-input
						v-model="clientForm.industryCompanyName"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="域名链接" prop="industryUri">
					<el-input
						v-model="clientForm.industryUri"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="营业执照" prop="industryCompanyBuslicense">
					<el-input
						v-model="clientForm.industryCompanyBuslicense"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="公司logo" prop="industryLogo">
					<el-input
						v-model="clientForm.industryLogo"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者uid" prop="developerUid">
					<el-input
						v-model="clientForm.developerUid"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者bizType" prop="developerBizType">
					<el-input
						v-model="clientForm.developerBizType"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="命名空间" prop="namespace">
					<el-input
						v-model="clientForm.namespace"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="接入备注" prop="remark">
					<el-input v-model="clientForm.remark" style="width: 360px; margin-left: 20px;"></el-input>
				</el-form-item>
				<el-form-item label="入驻时间" prop="gmtCreate">
					<el-input
						v-model="clientForm.gmtCreate"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="修改时间" prop="gmtModified">
					<el-input
						v-model="clientForm.gmtModified"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="创建者" prop="creator">
					<el-input
						v-model="clientForm.creator"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="修改者" prop="modifier">
					<el-input
						v-model="clientForm.modifier"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showUpdateDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-button type="primary" @click="commitUpdate()" :loading="commitLoading"
						>保 存</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!--展示详情-->
		<el-dialog :title="showDetailTitle" :visible.sync="showDetailDialog" center>
			<el-form :model="clientForm" ref="clientForm" label-width="193px">
				<el-form-item label="行业入驻id" prop="clientEntryId" style="color: cornflowerblue;">
					<el-input
						v-model="clientForm.clientEntryId"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="行业类型" prop="industryType">
					<el-input
						v-model="clientForm.industryType"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="企业名称" prop="industryCompanyName">
					<el-input
						v-model="clientForm.industryCompanyName"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="域名链接" prop="industryUri">
					<el-input
						v-model="clientForm.industryUri"
						style="width: 360px; margin-left: 20px;"
						:show-overflow-tooltip="true"
					></el-input>
				</el-form-item>
				<el-form-item label="营业执照" prop="industryCompanyBuslicense">
					<el-input
						v-model="clientForm.industryCompanyBuslicense"
						style="width: 360px; margin-left: 20px;"
						:show-overflow-tooltip="true"
					></el-input>
				</el-form-item>
				<el-form-item label="公司logo" prop="industryLogo">
					<el-input
						v-model="clientForm.industryLogo"
						style="width: 360px; margin-left: 20px;"
						:show-overflow-tooltip="true"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者uid" prop="developerUid">
					<el-input
						v-model="clientForm.developerUid"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="开发者bizType" prop="developerBizType">
					<el-input
						v-model="clientForm.developerBizType"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="命名空间" prop="namespace">
					<el-input
						v-model="clientForm.namespace"
						style="width: 360px; margin-left: 20px;"
						:show-overflow-tooltip="true"
					></el-input>
				</el-form-item>
				<el-form-item label="接入备注" prop="remark">
					<el-input
						v-model="clientForm.remark"
						style="width: 360px; margin-left: 20px;"
						:show-overflow-tooltip="true"
					></el-input>
				</el-form-item>
				<el-form-item label="入驻时间" prop="gmtCreate">
					<el-input
						v-model="clientForm.gmtCreate"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="修改时间" prop="gmtModified">
					<el-input
						v-model="clientForm.gmtModified"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="创建者" prop="creator">
					<el-input
						v-model="clientForm.creator"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="修改者" prop="modifier">
					<el-input
						v-model="clientForm.modifier"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		const validateRepassword = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.clientForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			id: '',
			industryCompanyName: null, // 公司名称
			developerUid: null, // 开发者uid
			industryType: null, // 行业类型
			developerBizType: null, // 开发者业务类型
			clientEntryId: null, // 客户接入id
			namespace: null, // 命名空间

			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			showDialog: false, // 新增项目
			showUpdateDialog: false, // 编辑
			showDetailDialog: false, // 展示详情
			commitLoading: false, // 保存和确定编辑
			createTitle: '',
			updateTitle: '',
			showDetailTitle: '',
			industryTypes: [],

			// 新增
			clientForm: {
				id: '', // "序号"
				clientEntryId: '', // 客户接入id
				industryType: '', // 行业类型
				developerBizType: '', // 开发者业务类型
				developerUid: '', // 开发者uid
				loginTuya: '', // 是否打通涂鸦
				namespace: '', // 命名空间
				clientCode: '', // 客户接入code
				industryLogo: '', // 公司logo
				industryUri: '', // 域名链接
				industryCompanyName: '', // 公司名称
				industryCompanyBuslicense: '', // 公司营业执照
				password: '', // 密码
				repassword: '', // 确认密码
				// countryCode: "",  //国家码
				remark: '', // 备注
				status: '', // 接入状态
				gmtCreate: '', // 入驻时间
				gmtModified: '', // 修改时间
				creator: '', // 创建者
				modifier: '', // 修改者
			},

			rules: {
				industryType: [
					{
						required: true,
						message: '行业类型不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				industryCompanyName: [
					{
						required: true,
						message: '企业名称不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				industryUri: [
					{
						required: true,
						message: '域名链接不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				industryCompanyBuslicense: [
					{
						required: true,
						message: '营业执照不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				industryLogo: [
					{
						required: true,
						message: '公司logo不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				developerUid: [
					{
						required: true,
						message: '开发者uid不能为空，请输入...',
						trigger: 'blur',
						min: 1,
					},
				],
				developerBizType: [
					{
						required: true,
						message: '开发者bizType不能为空，请选择...',
						trigger: 'blur',
						min: 1,
					},
				],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				repassword: [{ required: true, validator: validateRepassword, trigger: 'blur' }],
			},
		};
	},
	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {
		this.getEnumData();
		// this.loadData();
	},

	methods: {
		// 时间戳转换日期
		dateFormat: function (row, column) {
			const date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return date.format('YYYY-MM-DD HH:mm:ss');
		},

		formatDate(date) {
			const now = new Date(date);
			const year = now.getFullYear();
			const month = now.getMonth() + 1;
			const dateF = now.getDate();
			const hour = now.getHours();
			const minute = now.getMinutes();
			const second = now.getSeconds();
			return year + '-' + month + '-' + dateF + ' ' + hour + ':' + minute + ':' + second;
		},
		formatDateMod(row) {
			return this.formatDate(row.gmtModified);
		},
		formatDateCreate(row) {
			return this.formatDate(row.gmtCreate);
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

		// 先从接口获得对应的枚举数据
		getEnumData() {
			const Data = [];
			this.$http.post('/api/clientEntry/getEnum', {}).then((res) => {
				const objects = res.data.industryTypes;
				for (let i = 0; i < objects.length; i++) {
					const obj = {};
					obj.value = objects[i].value;
					obj.key = objects[i].value;
					Data[i] = obj;
				}
				this.industryTypes = Data;
			});
		},

		// 显示支付配置列表数据(未搜索时)
		loadData: function () {
			this.$http
				.post('/api/clientEntry/clientList', {
					clientEntryId: this.clientEntryId || null,
					industryCompanyName: this.industryCompanyName || null,
					developerUid: this.developerUid || null,
					industryType: this.industryType || null,
					developerBizType: this.developerBizType || null,
					namespace: this.namespace || null,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.data === null) {
							this.tableData = res.data.result.data;
						} else {
							this.tableData = res.data.result.data;
							for (let i = 0; i < res.data.result.data.length; i++) {
								const gmtCreate = this.formatDate(res.data.result.data[i].gmtCreate);
								this.tableData[i].gmtCreate = gmtCreate;
								const gmtModified = this.formatDate(res.data.result.data[i].gmtModified);
								this.tableData[i].gmtModified = gmtModified;
							}
							for (let i = 0; i < this.tableData.length; i++) {
								this.tableData[i].id = this.pageSize * (this.currentPage - 1) + (i + 1);
							}
						}
						this.totalCount = res.data.result.pageInfo.recordsCount;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		search: function () {
			this.currentPage = 1;
			this.loadData();
		},

		// 提交按钮，新增或者更新
		commitCURD: function () {
			this.$http
				.post('/api/clientEntry/addClientEntry', this.clientForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('操作成功');
						this.showDialog = false;
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.showDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 编辑
		commitUpdate: function () {
			this.$http
				.post('/api/clientEntry/updateClientEntry', this.clientForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('操作成功');
						this.showUpdateDialog = false;
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showUpdateDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.showUpdateDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 展示编辑弹窗
		clientInfo(client) {
			if (client === undefined || client === '') {
				this.clientForm = {};
				this.showDialog = true;
			} else {
				this.showUpdateDialog = true;
				this.clientForm = JSON.parse(JSON.stringify(client));
			}
		},

		// 展示详情
		showDetail(clientInfo) {
			this.showDetailDialog = true;
			this.clientForm = JSON.parse(JSON.stringify(clientInfo));
		},
	},
};
</script>
