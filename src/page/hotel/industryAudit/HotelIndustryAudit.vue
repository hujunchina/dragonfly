<style lang="scss" scoped>
.inputText {
	width: 90%;
	margin-left: 20px;
	text-overflow: ellipsis;
}

.datePicker {
	margin-left: 20px;
}

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

.el-dialog {
	width: 40%;
}
</style>
<template>
	<div class="container">
		<div>
			<el-form label-width="20%">
				<el-row>
					<el-col :span="8">
						<el-form-item label="审核编号:">
							<el-input
								class="inputText"
								placeholder="请输入审核编号"
								v-model="id"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="企业名称:">
							<el-input
								class="inputText"
								placeholder="请输入企业名称"
								v-model="enterpriseName"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核人:">
							<el-input
								class="inputText"
								placeholder="请输入审核人"
								v-model="auditor"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<br />
				<el-row>
					<el-col :span="8">
						<el-form-item label="审核状态:">
							<el-select v-model="auditStatus" placeholder="请选择审核状态">
								<el-option label="全部" value=""></el-option>
								<el-option label="待审核" value="0"></el-option>
								<el-option label="审核通过" value="1"></el-option>
								<el-option label="审核不通过" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="提交时间:">
							<el-date-picker
								class="datePicker"
								v-model="gmtCreateTime"
								type="datetimerange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="信用代码:">
							<el-input
								class="inputText"
								placeholder="统一社会信用代码"
								v-model="businessLicenseNo"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<br />
				</el-row>
				<el-row justify="end">
					<el-col :span="4" :offset="20">
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
					<el-table-column prop="id" label="审核编号" width="150px"></el-table-column>
					<el-table-column
						prop="businessLicenseNo"
						label="统一社会信用代码"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="enterpriseName"
						label="企业名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="auditor" label="审核人"></el-table-column>
					<el-table-column
						prop="gmtCreate"
						label="提交时间"
						:formatter="dateFormat"
						width="161px"
					></el-table-column>
					<el-table-column
						prop="auditStatus"
						label="审核状态"
						:formatter="auditStatusFormat"
					></el-table-column>
					<el-table-column fixed="right" prop="operate" width="300px" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="viewIndustryInfo(scope.row.id)"
								style="margin-right: 5px;"
							>
								查看
							</el-button>
							<el-button
								size="mini"
								type="success"
								@click="auditIndustryInfo(scope.row, 1)"
								style="margin-right: 5px;"
								v-if="scope.row.auditStatus === 0"
								v-has="'/hotel/industry/audit'"
							>
								审核通过
							</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="auditIndustryInfo(scope.row, 2)"
								v-if="scope.row.auditStatus === 0"
								v-has="'/hotel/industry/audit'"
							>
								审核不通过
							</el-button>
							<el-button
								size="mini"
								type="warning"
								@click="testMarking(scope.row)"
								v-if="scope.row.auditStatus === 1 || scope.row.auditStatus === 2"
							>
								测试打标
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
		<!-- 审核通过确认框 -->
		<el-dialog title="审核" :visible.sync="showPassConfirmDialog">
			<el-form :model="industryInfo" ref="industryInfo" label-width="80px">
				<el-form-item label="企业名称:">
					<span>{{ industryInfo.enterpriseName }}</span>
				</el-form-item>
				<el-form-item label="审核类型:">
					<span>
						<font color="red">通过</font>
					</span>
				</el-form-item>
				<el-form-item label="审核备注:">
					<el-input type="textarea" v-model="auditRemarks"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="commitAuditIndustryInfo(industryInfo.id, 1)"
						:loading="commitLoading"
					>
						确 认
					</el-button>
					<el-button @click="showPassConfirmDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 审核不通过确认框 -->
		<el-dialog title="审核" :visible.sync="showNoPassConfirmDialog">
			<el-form :model="industryInfo" ref="industryInfo" label-width="80px">
				<el-form-item label="企业名称:">
					<span>{{ industryInfo.enterpriseName }}</span>
				</el-form-item>
				<el-form-item label="审核类型:">
					<span>
						<font color="red">不通过</font>
					</span>
				</el-form-item>
				<el-form-item label="审核备注:">
					<el-input type="textarea" v-model="auditRemarks"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="commitAuditIndustryInfo(industryInfo.id, 2)"
						:loading="commitLoading"
					>
						确 认
					</el-button>
					<el-button @click="showNoPassConfirmDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 测试打标确认框 -->
		<el-dialog title="测试打标" :visible.sync="showTestMarkingConfirmDialog">
			<el-form :model="industryInfo" ref="industryInfo" label-width="80px">
				<el-form-item label="企业名称:">
					<span>{{ industryInfo.enterpriseName }}</span>
				</el-form-item>
				<el-form-item>
					<el-button
						type="danger"
						@click="commitTestMarking(industryInfo.id, true)"
						:loading="commitLoading"
					>
						测 试
					</el-button>
					<el-button
						type="warning"
						@click="commitTestMarking(industryInfo.id, false)"
						:loading="commitLoading"
					>
						非测试
					</el-button>
					<el-button @click="showTestMarkingConfirmDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
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
			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1, // 页码
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '', // 提示
			showPassConfirmDialog: false, // 显示审核通过提示框
			showNoPassConfirmDialog: false, // 显示审核通过提示框
			showTestMarkingConfirmDialog: false, // 显示测试打标确认提示框
			commitLoading: false, // 保存和确定编辑
			industryInfo: '', // 行业信息
			id: '', // 搜索条件:审核编号
			enterpriseName: '', // 搜索条件:企业名称
			auditor: '', // 搜索条件:审核人
			auditStatus: null, // 搜索条件:审核状态
			gmtCreateTime: '', // 搜索条件:提交时间
			businessLicenseNo: '', // 搜索条件:营业执照号
			auditRemarks: '', // 审核备注
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

		// 审核状态
		auditStatusFormat: function (row, column) {
			const auditStatus = row[column.property];
			if (auditStatus == undefined) {
				return '';
			}
			if (auditStatus == 0) {
				return '待审核';
			}
			if (auditStatus == 1) {
				return '审核通过';
			}
			if (auditStatus == 2) {
				return '审核不通过';
			}
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

		// 加载行业审核记录列表
		loadData: function () {
			let gmtCreateBeginTime;
			let gmtCreateEndTime;
			if (this.gmtCreateTime) {
				gmtCreateBeginTime = Date.parse(this.gmtCreateTime[0]);
				gmtCreateEndTime = Date.parse(this.gmtCreateTime[1]);
			}
			this.$http
				.post('/api/hotel/industry/audit/records', {
					id: this.id,
					enterpriseName: this.enterpriseName,
					auditor: this.auditor,
					auditStatus: this.auditStatus,
					businessLicenseNo: this.businessLicenseNo,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
					gmtCreateBeginTime: gmtCreateBeginTime,
					gmtCreateEndTime: gmtCreateEndTime,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.tableData = res.data.result.data;
						this.totalCount = res.data.result.total;
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
			this.id = '';
			this.enterpriseName = '';
			this.auditor = '';
			this.auditStatus = null;
			this.gmtCreateTime = '';
			this.businessLicenseNo = '';
		},

		// 审核行业信息确认框
		auditIndustryInfo(industryInfo, auditStatus) {
			this.industryInfo = industryInfo;
			if (auditStatus === 1) {
				this.showPassConfirmDialog = true;
			} else {
				this.showNoPassConfirmDialog = true;
			}
		},

		// 测试打标确认框
		testMarking(industryInfo) {
			this.industryInfo = industryInfo;
			this.showTestMarkingConfirmDialog = true;
		},

		// 确认提交行业审核
		commitAuditIndustryInfo: function (id, auditStatus) {
			this.$http
				.post('/api/hotel/industry/audit', {
					id: id,
					auditStatus: auditStatus,
					auditRemarks: this.auditRemarks,
				})
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100 && res.data.result === true) {
						this.$message.success('审核成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					}
					this.loadData();
					this.showPassConfirmDialog = false;
					this.showNoPassConfirmDialog = false;
					this.industryInfo = {};
					this.auditRemarks = '';
					return;
				})
				.catch(() => {
					this.commitLoading = false;
					this.showPassConfirmDialog = false;
					this.showNoPassConfirmDialog = false;
					this.industryInfo = {};
					this.auditRemarks = '';
					this.$message.error('unexpected request failed.');
				});
		},

		// 测试打标
		commitTestMarking: function (id, testFlag) {
			this.$http
				.post('/api/hotel/industry/test/marking', {
					id: id,
					testFlag: testFlag,
				})
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100 && res.data.result === true) {
						this.$message.success('打标成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					}
					this.showTestMarkingConfirmDialog = false;
					this.industryInfo = {};
					return;
				})
				.catch(() => {
					this.commitLoading = false;
					this.showTestMarkingConfirmDialog = false;
					this.industryInfo = {};
					this.$message.error('unexpected request failed.');
				});
		},

		// 跳转行业审核详情界面
		viewIndustryInfo: function (id) {
			this.$router.push({ name: 'hotelIndustryAuditDetail', query: { id: id } });
		},
	},
};
</script>
