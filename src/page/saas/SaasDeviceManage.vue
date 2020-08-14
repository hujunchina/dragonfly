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
			<el-input class="inputText" placeholder="请输入uuid" v-model="uuid" clearable></el-input>
			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
			>
				搜索
			</el-button>
			<el-button style="margin-left: 15px;" type="primary" plain @click="uuidInfo()"
				>登记UUID</el-button
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
						prop="uuid"
						label="设备uuid"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="clientEntryId"
						label="客户接入Id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="mac"
						label="设备mac地址"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="isOnline" label="是否在线">
						<template slot-scope="scope">
							{{ scope.row.isOnline == false ? '否' : '是' }}
						</template>
					</el-table-column>
					<el-table-column prop="bizType" label="业务类型"></el-table-column>
					<el-table-column prop="creator" label="创建者"></el-table-column>
					<el-table-column prop="modifier" label="修改者"></el-table-column>
					<el-table-column
						prop="gmtModified"
						label="最后修改时间"
						:formatter="dateFormat"
						:show-overflow-tooltip="true"
					></el-table-column>
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
			<el-form :model="deviceForm" :rules="rules" ref="deviceForm" label-width="183px">
				<el-form-item label="设备uuid" prop="uuid">
					<el-input v-model="deviceForm.uuid" style="width: 360px; margin-left: 20px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showCreateDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-button type="primary" @click="commitAdd()" :loading="commitLoading">保 存</el-button>
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
			commitLoading: false, // 保存和确定编辑
			createTitle: '',
			uuid: '',

			deviceForm: {
				id: '',
				uuid: '',
				clientEntryId: '',
				isOnline: '',
				bizType: '',
				creator: '',
				modifier: '',
				gmtModified: '',
			},

			rules: {
				uuid: [{ required: true, message: 'uuid不能为空，请输入...', trigger: 'blur' }],
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
				.post('/api/saas/devicemanage/list', {
					uuid: this.uuid || null,
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

		commitAdd: function () {
			this.$http
				.post('/api/saas/devicemanage/init', this.deviceForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('登记成功');
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

		uuidInfo(device) {
			if (device === undefined || device === '') {
				this.deviceForm = {};
				this.showCreateDialog = true;
			}
		},
	},
};
</script>
