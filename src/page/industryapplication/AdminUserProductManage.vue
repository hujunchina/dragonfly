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

<style scoped>
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
			<el-select v-model="option" placeholder="请选择搜索类型">
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
				v-if="option === 'productId'"
				class="inputText"
				placeholder="请输入产品id，精确匹配"
				v-model="username"
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
			<el-button style="margin-left: 15px;" type="primary" plain @click="createProduct(val)"
				>新增产品</el-button
			>
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
					<el-table-column prop="productId" label="产品key"></el-table-column>
					<el-table-column prop="name" label="产品名称"></el-table-column>
					<el-table-column prop="category" label="产品类型"></el-table-column>
					<el-table-column prop="owner" label="超级用户uid"></el-table-column>
					<el-table-column prop="serveDp" label="服务开关"></el-table-column>
					<el-table-column prop="serveTimeDp" label="服务时间"></el-table-column>
					<el-table-column prop="rentDp" label="租赁开关"></el-table-column>
					<el-table-column prop="qrCode" label="二维码"></el-table-column>
					<el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
					<el-table-column prop="gmtModified" label="修改时间"></el-table-column>

					<el-table-column fixed="right" prop="operate" label="操作">
						<template slot-scope="scope">
							<a
								target="_blank"
								href="javaScript:;"
								@click="productInfo(scope.row)"
								style="margin-right: 12px;"
								>详情</a
							>
							<a target="_blank" href="javaScript:;" @click="productInfo(scope.row)">编辑</a>
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
		<el-dialog :title="createTitle" :visible.sync="showCreateDialog" center>
			<el-form :model="productInfo" ref="productInfo" label-width="183px">
				<el-form-item label="产品id" prop="productId">
					<el-select
						v-model="productInfo.productId"
						clearable
						placeholder="请选择产品id"
						style="width: 360px; margin-left: 0;"
					>
						<el-option
							v-for="item in productIds"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="请输入服务开关" prop="serveDp">
					<el-input v-model="productInfo.serveDp" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item label="请输入服务时间(可选)" prop="serveTimeDp">
					<el-date-picker
						v-model="productInfo.serveTimeDp"
						type="datetime"
						placeholder="选择日期时间"
						style="width: 360px;"
					></el-date-picker>
				</el-form-item>

				<el-form-item label="请输入租赁dp(可选)" prop="rentDp">
					<el-input v-model="productInfo.rentDp" style="width: 360px;"></el-input>
				</el-form-item>
				<el-form-item label="请填写二维码地址" prop="qrCode">
					<el-input v-model="productInfo.qrCode" style="width: 360px;"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button @click="showDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-button type="primary" @click="commitAdd()" :loading="commitLoading">保 存</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			options: [
				{
					value: 'uid',
					label: '用户id',
				},
				{
					value: 'productId',
					label: '产品id',
				},
			],

			val: '',
			productIds: [], //
			option: '',
			developerUid: '', // 开发者UID

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
				uid: '',
				productId: '', // 产品id
				serveDp: '', // 服务开关
				serveTimeDp: '', // 服务时间
				rentDp: '', // 租赁dp
				qrCode: '', // 二维码地址
				developerUid: '', // 开发者UID
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

		// 展示当前开发者uid中的产品管理下的产品详情
		loadData: function () {
			this.$http
				.post('/api/industrymanage/productmanage/list', {
					uid: this.uid,
					developerUid: this.developerUid,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.data === null) {
							this.tableData = res.data.result.productModel;
						} else {
							this.tableData = res.data.result.productModel;
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

		// 得到当前用户的产品id列表
		geProductIds: function () {
			this.$http
				.post('/api/industrymanage/productmanage/productIdlist', this.productInfo)
				.then((res) => {
					this.productIds = res.data.productDOS.productIds;
				});
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
				this.productInfo = {};
				this.productInfo = JSON.parse(JSON.stringify(product));
				this.showCreateDialog = true;
			}
		},

		// 提交 编辑
		commitAdd: function () {
			this.showCreateDialog = true;
			this.$http
				.post('/api/industrymanage/productmanage/add', this.productInfo)
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
		},
	},
};
</script>
