<template>
	<div>
		<el-row>
			<el-button @click="showAddCategory()" style="float: left;">新增品类</el-button>

			<el-button
				type="primary"
				@click="loadData"
				style="float: right; margin-right: 1%;"
				icon="el-icon-search"
				circle
			></el-button>
			<el-input v-model="codeInput" placeholder="请输入Code" class="id-input"></el-input>
		</el-row>

		<el-table :data="categoryList" border style="width: 100%;">
			<el-table-column prop="id" v-if="false"></el-table-column>
			<el-table-column prop="uid" label="用户id"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="parentCode" label="父类名"></el-table-column>
			<el-table-column prop="categoryCode" label="code"></el-table-column>
			<el-table-column prop="categoryLevel" label="类型"></el-table-column>
			<el-table-column prop="env" label="环境"></el-table-column>
			<el-table-column prop="schemaId" label="schema"></el-table-column>
			<el-table-column prop="action" label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="showUpdateCategory(scope.row)">修改</el-button>
					<el-button type="text" @click="deleteCategory(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom-page" align="center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
			></el-pagination>
		</div>

		<!-- 修改模版dialog -->
		<el-dialog :title="'修改品类配置'" :visible.sync="showCategoryDialog" center>
			<el-form ref="updateCategoryForm" :model="updateCategoryForm" label-width="100px">
				<el-form-item prop="id" v-if="false">
					<el-input v-model="updateCategoryForm.id"></el-input>
				</el-form-item>
				<el-form-item prop="uid" label="用户id">
					<el-input v-model="updateCategoryForm.uid" />
				</el-form-item>
				<el-form-item prop="name" label="名称">
					<el-input v-model="updateCategoryForm.name" />
				</el-form-item>
				<el-form-item prop="parentCode" label="父类名">
					<el-input v-model="updateCategoryForm.parentCode" />
				</el-form-item>
				<el-form-item prop="categoryCode" label="code">
					<el-input v-model="updateCategoryForm.categoryCode" />
				</el-form-item>
				<el-form-item prop="categoryLevel" label="类型">
					<el-select
						class="sec-sel-opt"
						v-model="updateCategoryForm.categoryLevel"
						placeholder="请选择环境"
					>
						<el-option
							v-for="item in categoryLevelList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="env" label="环境">
					<el-select class="sec-sel-opt" v-model="updateCategoryForm.env" placeholder="请选择环境">
						<el-option
							v-for="item in envList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="name" label="schema">
					<el-input v-model="updateCategoryForm.schemaId" />
				</el-form-item>

				<el-form-item>
					<el-button @click="showCategoryDialog = false">取 消</el-button>
					<el-button type="primary" @click="saveCategory()" :loading="commitAddLoading"
						>确 定</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 新增模版dialog -->
		<el-dialog :title="'新增品类配置'" :visible.sync="showAddDialog" center>
			<el-form ref="addCategoryForm" :model="addCategoryForm" label-width="100px">
				<el-form-item prop="id" v-if="false">
					<el-input v-model="addCategoryForm.id"></el-input>
				</el-form-item>
				<el-form-item prop="uid" label="用户id">
					<el-input v-model="addCategoryForm.uid" />
				</el-form-item>
				<el-form-item prop="name" label="名称">
					<el-input v-model="addCategoryForm.name" />
				</el-form-item>
				<el-form-item prop="parentCode" label="父类名">
					<el-input v-model="addCategoryForm.parentCode" />
				</el-form-item>
				<el-form-item
					prop="categoryCode"
					label="code"
					:rules="[{ required: true, message: '请输入code', trigger: 'blur' }]"
				>
					<el-input v-model="addCategoryForm.categoryCode" />
				</el-form-item>
				<el-form-item prop="categoryLevel" label="类型">
					<el-select
						class="sec-sel-opt"
						v-model="addCategoryForm.categoryLevel"
						placeholder="请选择环境"
					>
						<el-option
							v-for="item in categoryLevelList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="env" label="环境">
					<el-select class="sec-sel-opt" v-model="addCategoryForm.env" placeholder="请选择环境">
						<el-option
							v-for="item in envList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="name" label="schema">
					<el-input v-model="addCategoryForm.schemaId" />
				</el-form-item>

				<el-form-item>
					<el-button @click="showAddDialog = false">取 消</el-button>
					<el-button type="primary" @click="saveCategory(1)" :loading="commitAddLoading"
						>确 定</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.id-input {
	float: right;
	width: 250px;
	margin-right: 10px;
	margin-bottom: 30px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}

.sec-sel-opt {
	width: 70%;
}
</style>

<script>
export default {
	data() {
		return {
			commitAddLoading: false,

			// 默认每页数据量
			pageSize: 10,
			// 当前页码
			currentPage: 1,
			// 查询的页码
			start: 1,
			// 默认数据总数
			totalCount: 0,

			// 修改
			showCategoryDialog: false,
			updateCategoryForm: {},

			// add
			showAddDialog: false,
			addCategoryForm: {},

			// 搜索输入框
			codeInput: '',

			categoryList: [],
			envList: [
				{
					label: '开发',
					value: 1,
				},
				{
					label: '日常',
					value: 2,
				},
				{
					label: '预发',
					value: 3,
				},
				{
					label: '线上',
					value: 4,
				},
			],
			categoryLevelList: [
				{
					label: '大类',
					value: 1,
				},
				{
					label: '小类',
					value: 3,
				},
			],
		};
	},

	components: {},

	mounted() {
		this.loadData();
	},

	methods: {
		loadData() {
			const url = `/api/security/product/category/list/get`;
			this.$http
				.get(url, {
					params: {
						categoryCode: this.codeInput,
						offset: this.pageSize * (this.currentPage - 1),
						limit: this.pageSize,
					},
				})
				.then((res) => {
					const resData = res.data;
					if (resData.code == '101') {
						this.$message.error('服务器繁忙');
						return false;
					}
					this.totalCount = resData.rows;
					this.categoryList = resData.result;
				});
		},

		// 添加 || 修改
		saveCategory(val) {
			let param = {};
			let res = false;
			if (val == 1) {
				this.$refs['addCategoryForm'].validate((valid) => {
					if (valid) {
						param = this.addCategoryForm;
						res = true;
					} else {
						res = false;
					}
				});
			} else {
				param = this.updateCategoryForm;
			}

			if (res) {
				if (param.env == '开发') {
					param.env = '1';
				} else if (param.env == '日常') {
					param.env = '2';
				} else if (param.env == '预发') {
					param.env = '3';
				} else if (param.env == '线上') {
					param.env = '4';
				}

				if (param.categoryLevel == '大类') {
					param.categoryLevel = '1';
				} else if (param.categoryLevel == '小类') {
					param.categoryLevel = '3';
				}

				this.$confirm('确定提交？', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					cancelButtonClass: 'm-cancel-button',
					confirmButtonClass: 'm-confirm-button',
					type: 'warning',
				}).then(() => {
					this.$http
						.post(
							'/api/security/product/category/save',
							{},
							{
								params: param,
							},
						)
						.then((res) => {
							if (res.data && res.data.code == 100) {
								this.loadData();
								if (val == 1) {
									this.showAddDialog = false;
								} else {
									this.showCategoryDialog = false;
								}
								this.$message.success('保存成功');
							} else {
								this.$message.error(res.msg);
							}
						});
				});
			}
		},

		// 删除
		deleteCategory(row) {
			const data = {
				id: row.id,
			};
			this.$confirm('确定删除？', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				cancelButtonClass: 'm-cancel-button',
				confirmButtonClass: 'm-confirm-button',
				type: 'warning',
			}).then(() => {
				this.$http.post('/api/security/product/category/delete', data).then((res) => {
					if (res.data && res.data.code == 100) {
						this.loadData();
						this.showAddDialog = false;
						this.$message.success('删除成功');
					} else {
						this.$message.error(res.msg);
					}
				});
			});
		},
		// 每页显示数据量变更
		handleSizeChange(val) {
			this.pageSize = val;
			this.loadData();
		},
		// 页码变更
		handleCurrentChange(val) {
			this.currentPage = val;
			this.loadData();
		},
		showAddCategory() {
			this.$nextTick(() => {
				if (this.$refs['addCategoryForm']) {
					this.$refs['addCategoryForm'].resetFields();
				}
			});
			this.addCategoryForm = {};
			this.showAddDialog = true;
		},
		showUpdateCategory(row) {
			this.$nextTick(() => {
				if (this.$refs['updateCategoryForm']) {
					this.$refs['updateCategoryForm'].resetFields();
				}
			});
			this.updateCategoryForm = row;

			this.showCategoryDialog = true;
		},
	},
};
</script>
