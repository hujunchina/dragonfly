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
				placeholder="请输入saas产品id"
				v-model="productId"
				clearable
			></el-input>
			<el-input
				class="inputText"
				placeholder="请输入IOT-pid"
				v-model="devicePid"
				clearable
			></el-input>
			<el-input class="inputText" placeholder="请输入产品名称" v-model="name" clearable></el-input>
			<el-input
				class="inputText"
				placeholder="请输入客户接入Id"
				v-model="clientEntryId"
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
			<el-button style="margin-left: 15px;" type="primary" plain @click="productInfo()"
				>新增产品</el-button
			>
			<a
				:href="goToDeviceManage()"
				style="margin-left: 15px; color: #e6a23c; font-weight: bold; font-size: 15px;"
			>
				初始化设备UUID
			</a>
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
						prop="productId"
						label="saas产品id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="devicePid"
						label="IOT-pid"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="name"
						label="产品名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="clientEntryId"
						label="客户接入Id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="pidOwner"
						label="设备产品owner"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="creator"
						label="创建者"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="modifier" label="修改者"></el-table-column>
					<el-table-column
						prop="gmtModified"
						label="最后修改时间"
						:formatter="dateFormat"
						width="161px"
					></el-table-column>

					<el-table-column fixed="right" prop="operate" label="操作">
						<template slot-scope="scope">
							<a @click="productInfo(scope.row)" style="margin-right: 11px;">编辑</a>
							<br />
							<a :href="goToDpManage(scope.row.productId, scope.row.clientEntryId)">维护dp点</a>
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

		<!-- 新增 -->
		<el-dialog :title="createTitle" :visible.sync="showCreateDialog" center>
			<el-form :model="proForm" :rules="rules" ref="proForm" label-width="183px">
				<el-form-item label="IOT-pid" prop="devicePid">
					<el-input v-model="proForm.devicePid" style="width: 360px; margin-left: 20px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showCreateDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-tooltip effect="dark" content="新增前请确认你的输入">
						<el-button type="primary" @click="commitAdd()" :loading="commitLoading"
							>保 存</el-button
						>
					</el-tooltip>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 更新 -->
		<el-dialog :title="updateTitle" :visible.sync="showUpdateDialog" center>
			<el-form :model="proForm" :rules="rules" ref="proForm" label-width="183px">
				<el-form-item label="IOT-pid" prop="devicePid">
					<el-input
						v-model="proForm.devicePid"
						style="width: 360px; margin-left: 20px;"
						disabled
					></el-input>
				</el-form-item>
				<el-form-item label="产品名称" prop="name">
					<el-input v-model="proForm.name" style="width: 360px; margin-left: 20px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showUpdateDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-tooltip effect="dark" content="更新前请确认你的输入">
						<el-button type="primary" @click="commitUpdate()" :loading="commitLoading"
							>保 存</el-button
						>
					</el-tooltip>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
// 引入时间戳转换工具
import moment from 'moment';

export default {
	data() {
		return {
			id: '',
			productId: '',
			devicePid: '',
			name: '',
			clientEntryId: '',
			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			showCreateDialog: false,
			showUpdateDialog: false,
			commitLoading: false, // 保存和确定编辑
			createTitle: '',
			updateTitle: '',

			proForm: {
				id: '',
				productId: '',
				clientEntryId: '',
				devicePid: '',
				pidOwner: '',
				name: '',
				icon: '',
				type: '',
				category: '',
				qrCode: '',
				creator: '',
				modifier: '',
				gmtModified: '',
				status: '',
			},

			rules: {
				devicePid: [{ required: true, message: 'iot-pid不能为空，请输入...', trigger: 'blur' }],
				name: [{ required: true, message: '产品名称不能为空，请输入...', trigger: 'blur' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {},

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

		// 显示支付配置列表数据
		loadData: function () {
			this.$http
				.post('/api/saas/productmanage/list', {
					productId: this.productId || null,
					devicePid: this.devicePid || null,
					name: this.name || null,
					clientEntryId: this.clientEntryId || null,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.data === null) {
							this.tableData = res.data.result.data;
						} else {
							this.tableData = res.data.result.data;
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

		goToDeviceManage: function () {
			return '#/page/saas/SaasDeviceManage';
		},

		goToDpManage: function (val, val2) {
			return '#/page/saas/SaasDpManage?productId=' + val + '&clientEntryid=' + val2;
		},

		// 新增产品
		commitAdd: function () {
			this.$http
				.post('/api/saas/productmanage/add', this.proForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('新增成功');
						this.showCreateDialog = false;
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showCreateDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.showCreateDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		commitUpdate: function () {
			this.$http
				.post('/api/saas/productmanage/update', this.proForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('更新成功');
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

		productInfo(production) {
			if (production === undefined || production === '') {
				this.proForm = {};
				this.showCreateDialog = true;
			} else {
				this.showUpdateDialog = true;
				this.proForm = JSON.parse(JSON.stringify(production));
			}
		},
	},
};
</script>
