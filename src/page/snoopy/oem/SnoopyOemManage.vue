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
						<el-form-item label="域名:">
							<el-input
								class="inputText"
								placeholder="请输入域名"
								v-model="domainName"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="uid:">
							<el-input
								class="inputText"
								placeholder="请输入uid"
								v-model="uid"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<br />
				<el-row>
					<el-col :span="20">
						客户cname成功后才能进行修改域名。
					</el-col>
					<el-col :span="4">
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
						prop="enterpriseName"
						label="企业名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="domainName" label="行业域名"></el-table-column>
					<el-table-column prop="title" label="标题"></el-table-column>
					<el-table-column
						prop="authStatus"
						label="认证状态"
						:formatter="authStatusFormat"
					></el-table-column>
					<el-table-column fixed="right" prop="operate" width="200px" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="modifyOemInfo(scope.row.uid)"
								style="margin-right: 5px;"
							>
								修改
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
			enterpriseName: '', // 搜索条件:企业名称
			domainName: '', // 搜索条件:行业域名
			uid: '', // 搜索条件:uid
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},

	methods: {
		// 认证状态转换
		authStatusFormat: function (row, column) {
			const authStatus = row[column.property];
			if (authStatus == undefined) {
				return '';
			}
			if (authStatus == 90 || authStatus == 100) {
				return '认证完成';
			} else {
				return authStatus;
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

		// 加载品牌商OEM信息列表
		loadData: function () {
			this.$http
				.post('/api/snoopy/oem/oem-info/page', {
					enterpriseName: this.enterpriseName,
					domainName: this.domainName,
					uid: this.uid,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
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
			this.enterpriseName = '';
			this.domainName = '';
			this.uid = '';
		},

		// 跳转品牌商OEM信息编辑界面
		modifyOemInfo: function (uid) {
			this.$router.push({ name: 'snoopyOemModify', query: { uid: uid } });
		},
	},
};
</script>
