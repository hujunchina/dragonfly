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
						<el-form-item label="pms编码:">
							<el-input
								class="inputText"
								placeholder="请输入pms编码"
								v-model="pmsCode"
								clearable
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="厂商名称:">
							<el-input
								class="inputText"
								placeholder="请输入厂商名称"
								v-model="pmsName"
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
					<el-col :span="2">
						<el-button type="success" style="margin-left: 15px;" @click="addPmsInfo()">
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
						prop="pmsCode"
						label="pms编码"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="pmsName"
						label="厂商名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="creator" label="创建人"></el-table-column>
					<el-table-column
						prop="gmtCreate"
						label="创建时间"
						:formatter="dateFormat"
						width="161px"
					></el-table-column>
					<el-table-column
						prop="gmtModified"
						label="修改时间"
						:formatter="dateFormat"
						width="161px"
					></el-table-column>
					<el-table-column fixed="right" prop="operate" width="200px" label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="primary"
								@click="modifyPmsInfo(scope.row.id)"
								style="margin-right: 5px;"
							>
								修改
							</el-button>
							<el-button
								size="mini"
								type="danger"
								@click="deletePmsInfo(scope.row)"
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
			pmsCode: '', // 搜索条件:pms编码
			pmsName: '', // 搜索条件:厂商名称
			uid: '', // 搜索条件:uid
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

		// 加载pms厂商列表
		loadData: function () {
			this.$http
				.post('/api/hotel/pms/page', {
					pmsCode: this.pmsCode,
					pmsName: this.pmsName,
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
			this.pmsCode = '';
			this.pmsName = '';
			this.uid = '';
		},

		// 跳转pms信息编辑界面
		modifyPmsInfo: function (id) {
			this.$router.push({ name: 'hotelPmsInfoModify', query: { id: id } });
		},

		// 跳转pms信息新增界面
		addPmsInfo: function () {
			this.$router.push({ name: 'hotelPmsInfoModify' });
		},

		// 删除pms信息
		deletePmsInfo: function (pmsInfo) {
			this.$confirm('是否确认删除' + pmsInfo.pmsName, {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
			})
				.then(() => {
					this.$http
						.delete('/api/hotel/pms?id=' + pmsInfo.id)
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
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
