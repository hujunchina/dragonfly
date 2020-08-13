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
			<el-form ref="form" label-width="80px" :inline="true">
				<el-form-item>
					<el-select v-model="option" placeholder="请选择搜索类型">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-input
						v-if="option === 'uid'"
						class="inputText"
						placeholder="请输入用户UID，精确匹配"
						v-model="uid"
						style="width: 245px;"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						v-if="option === 'productId'"
						class="inputText"
						placeholder="请输入产品ID，精确匹配"
						v-model="productId"
						style="width: 245px;"
						clearable
					></el-input>
				</el-form-item>

				<el-button
					class="searchButton"
					type="primary"
					icon="el-icon-search"
					style="margin-left: 15px;"
					@click="search()"
					>搜索</el-button
				>
				<el-button style="margin-left: 15px;" type="primary" plain @click="createProduct(val)"
					>新增产品</el-button
				>
			</el-form>
		</div>

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
					<el-table-column prop="id" width="79px" label="序号"></el-table-column>
					<el-table-column prop="productId" label="产品ID"></el-table-column>
					<el-table-column prop="name" label="产品名称"></el-table-column>
					<el-table-column prop="category" label="产品类型"></el-table-column>
					<el-table-column prop="owner" label="开发者ID"></el-table-column>
					<el-table-column prop="serveDp" label="服务开关"></el-table-column>
					<el-table-column prop="serveTimeDp" label="服务时间"></el-table-column>
					<el-table-column prop="rentDp" label="租赁开关"></el-table-column>
					<el-table-column prop="qrCode" label="二维码"></el-table-column>
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

					<el-table-column fixed="right" prop="operate" label="操作">
						<template slot-scope="scope">
							<a href="javaScript:;" @click="product(scope.row)">编辑</a>
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

		<!-- 新增 或 者编辑产品 的弹窗 -->
		<el-dialog
			:title="createTitle"
			:visible.sync="showCreateDialog"
			center
			@close="$refs['productInfoForm'].resetFields()"
		>
			<el-form :model="productInfo" ref="productInfoForm" :rules="rules" label-width="183px">
				<el-form-item label="产品ID" prop="productId">
					<el-input v-model="productInfo.productId" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item label="租赁开关DP" prop="rentDp">
					<el-input v-model="productInfo.rentDp" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item label="服务开关DP" prop="serveDp">
					<el-input v-model="productInfo.serveDp" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item label="服务时间DP" prop="serveTimeDp">
					<el-input v-model="productInfo.serveTimeDp" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item label="二维码地址" prop="qrCode">
					<el-input v-model="productInfo.qrCode" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button
						@click="
							showCreateDialog = false;
							$refs['productInfoForm'].resetFields();
						"
						style="margin-left: 20px;"
						>取 消</el-button
					>
					<el-button type="primary" @click="submitForm('productInfoForm')" :loading="commitLoading"
						>保 存</el-button
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
			options: [
				{
					value: 'uid',
					label: '用户UID',
				},
				{
					value: 'productId',
					label: '产品ID',
				},
			],

			val: '',
			uid: '',
			productId: '',
			productIds: [],
			option: 'uid',

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

			// 新增支付配置表格
			productInfo: {
				productId: '',
				owner: '',
				serveDp: '',
				rentDp: '',
				serveTimeDp: '',
				qrCode: '',
				name: '',
			},
			rules: {
				productId: [{ required: true, message: '请输入产品ID', trigger: 'blur' }],
				serveDp: [{ required: true, message: '请输入服务开关DP', trigger: 'blur' }],
				serveTimeDp: [{ required: true, message: '请输入服务时间DP', trigger: 'blur' }],
				qrCode: [{ required: true, message: '请输入二维码地址', trigger: 'blur' }],
			},
		};
	},
	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {
		// this.loadData();
	},

	methods: {
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

		// 展示产品管理下的产品详情
		loadData: function () {
			this.$http
				.post('/api/industrymanage/productinfomanage/list', {
					uid: this.uid,
					productId: this.productId,
					type: this.option,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.data === null) {
							this.tableData = res.data.result;
						} else {
							this.tableData = res.data.result;
							for (let i = 0; i < this.tableData.length; i++) {
								// 排序依次显示
								this.tableData[i].tid = this.pageSize * (this.currentPage - 1) + (i + 1);
							}
						}
						this.totalCount = res.data.result.totalRecord;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		search: function () {
			this.loadData();
		},

		createProduct: function () {
			this.productInfo = {};
			this.showCreateDialog = true;
		},

		product(product) {
			if (product === undefined || product === '') {
				this.productInfo = {};
				this.showCreateDialog = true;
			} else {
				this.showCreateDialog = true;
				this.productInfo = {};
				this.productInfo = JSON.parse(JSON.stringify(product));
			}
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

		// 提交 编辑
		submitForm: function (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.showCreateDialog = true;
					this.$http
						.post('/api/industrymanage/productinfomanage/save', this.productInfo)
						.then((r) => {
							this.commitLoading = false;
							if (r.data.code == 100) {
								this.showUpdateDialog = false;
								this.showCreateDialog = false;
								this.loadData();
								this.$message.success('操作成功');
							} else {
								this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
								return;
							}
						})
						.catch(() => {
							this.commitLoading = false;
							this.$message.error('unexpected request failed.');
						});
				}
			});
		},
	},
};
</script>
