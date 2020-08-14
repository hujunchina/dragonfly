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
						label="客户saasId"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="propertyId"
						label="属性id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="productId"
						label="产品id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="dpId"
						label="功能点Id"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="valueDesc"
						label="展示值描述"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="property"
						label="dp属性值定义"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="type" label="类型" :show-overflow-tooltip="true"></el-table-column>
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
				</el-table>
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
			id: '',
			productId: '',
			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			commitLoading: false, // 保存和确定编辑

			dpForm: {
				id: '',
				propertyId: '',
				productId: '',
				schemaId: '',
				dpId: '',
				code: '',
				type: '',
				name: '',
				valueDesc: '',
				property: '',
				defaultValue: '',
				displayName: '',
				creator: '',
				modifier: '',
				gmtModified: '',
				status: '',
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
			const productId = this.$route.query.productId;
			this.productId = productId;
			this.$http
				.post('/api/saas/productmanage/property/list', {
					productId: this.productId || null,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.productPropertyList === null) {
							this.tableData = res.data.result.productPropertyList;
						} else {
							this.tableData = res.data.result.productPropertyList;
							for (let i = 0; i < this.tableData.length; i++) {
								this.tableData[i].productId = res.data.result.productId;
								this.tableData[i].clientEntryId = res.data.result.clientEntryId;
								this.tableData[i].id = this.pageSize * (this.currentPage - 1) + (i + 1);
							}
						}
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		search: function () {
			this.currentPage = 1;
			this.loadData();
		},
	},
};
</script>
