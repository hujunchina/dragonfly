<style lang="scss" scoped>
.el-dialog {
	width: 40%;
}
.el-cascader-node.in-active-path,
.el-cascader-node.is-active {
	color: #606266;
	font-weight: 400;
	font-size: 14px;
}
.el-cascader-node__prefix {
	visibility: hidden;
}
.el-scrollbar {
	width: 50%;
}
</style>
<template>
	<div class="container">
		<div>
			<el-row>
				<el-col :span="12" style="padding-right: 5px;">
					<div>
						<strong><font size="5px">补充物品:</font></strong>
						<br />
						<br />
						<el-row>
							<el-col :span="12">
								<el-col :span="3">
									<strong><font size="4px">分类:</font></strong>
								</el-col>
								<el-col :span="21">
									<el-button
										type="primary"
										size="mini"
										@click="openAddSuppliesCategoryDialog(1)"
										plain
										>新增</el-button
									>
									<el-button
										type="success"
										size="mini"
										@click="openModifySuppliesCategoryDialog(1)"
										plain
									>
										修改
									</el-button>
									<el-button
										type="danger"
										size="mini"
										@click="openDeleteSuppliesCategoryDialog(1)"
										plain
									>
										删除
									</el-button>
								</el-col>
							</el-col>
							<el-col :span="12">
								<el-col :span="3">
									<strong><font size="4px">物品:</font></strong>
								</el-col>
								<el-col :span="21">
									<el-button type="primary" size="mini" @click="openAddSuppliesDialog(1)" plain
										>新增</el-button
									>
									<el-button type="success" size="mini" @click="openModifySuppliesDialog(1)" plain
										>修改</el-button
									>
									<el-button type="danger" size="mini" @click="openDeleteSuppliesDialog(1)" plain
										>删除</el-button
									>
								</el-col>
							</el-col>
						</el-row>
					</div>
					<div>
						<el-cascader-panel
							:options="supplementOptions"
							:props="supplementProps"
							@change="handleSupplementChange"
						></el-cascader-panel>
					</div>
				</el-col>
				<el-col :span="12" style="padding-left: 5px;">
					<div>
						<strong><font size="5px">维修物品:</font></strong>
						<br />
						<br />
						<el-row>
							<el-col :span="12">
								<el-col :span="3">
									<strong><font size="4px">分类:</font></strong>
								</el-col>
								<el-col :span="21">
									<el-button
										type="primary"
										size="mini"
										@click="openAddSuppliesCategoryDialog(2)"
										plain
										>新增</el-button
									>
									<el-button
										type="success"
										size="mini"
										@click="openModifySuppliesCategoryDialog(2)"
										plain
									>
										修改
									</el-button>
									<el-button
										type="danger"
										size="mini"
										@click="openDeleteSuppliesCategoryDialog(2)"
										plain
									>
										删除
									</el-button>
								</el-col>
							</el-col>
							<el-col :span="12">
								<el-col :span="3">
									<strong><font size="4px">物品:</font></strong>
								</el-col>
								<el-col :span="21">
									<el-button type="primary" size="mini" @click="openAddSuppliesDialog(2)" plain
										>新增</el-button
									>
									<el-button type="success" size="mini" @click="openModifySuppliesDialog(2)" plain
										>修改</el-button
									>
									<el-button type="danger" size="mini" @click="openDeleteSuppliesDialog(2)" plain
										>删除</el-button
									>
								</el-col>
							</el-col>
						</el-row>
					</div>
					<div>
						<el-cascader-panel
							:options="maintainOptions"
							:props="maintainProps"
							@change="handleMaintainChange"
						></el-cascader-panel>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-dialog title="新增物品类型" :visible.sync="showAddSuppliesCategoryDialog">
			<el-form
				:model="suppliesCategory"
				ref="suppliesCategory"
				:rules="suppliesCategoryRules"
				label-width="100px"
			>
				<el-form-item label="语言词条:" prop="itemName">
					<el-input
						class="inputText"
						placeholder="请输入词条名称"
						v-model="suppliesCategory.itemName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="中文名称:" prop="chineseName">
					<el-input
						class="inputText"
						placeholder="请输入中文名称"
						v-model="suppliesCategory.chineseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="英文名称:" prop="englishName">
					<el-input
						class="inputText"
						placeholder="请输入英文名称"
						v-model="suppliesCategory.englishName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="日文名称:" prop="japaneseName">
					<el-input
						class="inputText"
						placeholder="请输入日文名称"
						v-model="suppliesCategory.japaneseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="韩文名称:" prop="koreanName">
					<el-input
						class="inputText"
						placeholder="请输入韩文名称"
						v-model="suppliesCategory.koreanName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addSuppliesCategory()" :loading="commitLoading">
						保 存
					</el-button>
					<el-button @click="showAddSuppliesCategoryDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="修改物品类型" :visible.sync="showModifySuppliesCategoryDialog">
			<el-form
				:model="suppliesCategory"
				ref="suppliesCategory"
				:rules="suppliesCategoryRules"
				label-width="100px"
			>
				<el-form-item label="中文名称:" prop="chineseName">
					<el-input
						class="inputText"
						placeholder="请输入中文名称"
						v-model="suppliesCategory.chineseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="英文名称:" prop="englishName">
					<el-input
						class="inputText"
						placeholder="请输入英文名称"
						v-model="suppliesCategory.englishName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="日文名称:" prop="japaneseName">
					<el-input
						class="inputText"
						placeholder="请输入日文名称"
						v-model="suppliesCategory.japaneseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="韩文名称:" prop="koreanName">
					<el-input
						class="inputText"
						placeholder="请输入韩文名称"
						v-model="suppliesCategory.koreanName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="modifySuppliesCategory()" :loading="commitLoading">
						保 存
					</el-button>
					<el-button @click="closeModifySuppliesCategoryDialog()" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="删除物品类型" :visible.sync="showDeleteSuppliesCategoryDialog">
			<el-form :model="suppliesCategory" ref="suppliesCategory" label-width="100px">
				<el-form-item label=""
					>请确认是否删除物品类型:{{ suppliesCategory.chineseName }}</el-form-item
				>
				<el-form-item>
					<el-button type="primary" @click="deleteSuppliesCategory()" :loading="commitLoading">
						确 认
					</el-button>
					<el-button @click="closeDeleteSuppliesCategoryDialog()" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="新增物品" :visible.sync="showAddSuppliesDialog">
			<el-form :model="supplies" ref="supplies" :rules="suppliesRules" label-width="100px">
				<el-form-item label="语言词条:" prop="itemName">
					<el-input
						class="inputText"
						placeholder="请输入词条名称"
						v-model="supplies.itemName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="中文名称:" prop="chineseName">
					<el-input
						class="inputText"
						placeholder="请输入中文名称"
						v-model="supplies.chineseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="英文名称:" prop="englishName">
					<el-input
						class="inputText"
						placeholder="请输入英文名称"
						v-model="supplies.englishName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="日文名称:" prop="japaneseName">
					<el-input
						class="inputText"
						placeholder="请输入日文名称"
						v-model="supplies.japaneseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="韩文名称:" prop="koreanName">
					<el-input
						class="inputText"
						placeholder="请输入韩文名称"
						v-model="supplies.koreanName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addSupplies()" :loading="commitLoading">
						保 存
					</el-button>
					<el-button @click="showAddSuppliesDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="修改物品" :visible.sync="showModifySuppliesDialog">
			<el-form :model="supplies" ref="supplies" :rules="suppliesRules" label-width="100px">
				<el-form-item label="中文名称:" prop="chineseName">
					<el-input
						class="inputText"
						placeholder="请输入中文名称"
						v-model="supplies.chineseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="英文名称:" prop="englishName">
					<el-input
						class="inputText"
						placeholder="请输入英文名称"
						v-model="supplies.englishName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="日文名称:" prop="japaneseName">
					<el-input
						class="inputText"
						placeholder="请输入日文名称"
						v-model="supplies.japaneseName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="韩文名称:" prop="koreanName">
					<el-input
						class="inputText"
						placeholder="请输入韩文名称"
						v-model="supplies.koreanName"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="modifySupplies()" :loading="commitLoading">
						保 存
					</el-button>
					<el-button @click="closeModifySuppliesDialog()" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="删除物品" :visible.sync="showDeleteSuppliesDialog">
			<el-form :model="supplies" ref="supplies" label-width="100px">
				<el-form-item label="">请确认是否删除物品:{{ supplies.chineseName }}</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="deleteSupplies()" :loading="commitLoading">
						确 认
					</el-button>
					<el-button @click="closeDeleteSuppliesDialog()" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		const self = this;
		return {
			showAddSuppliesCategoryDialog: false, // 显示新增物品类型弹出框
			showModifySuppliesCategoryDialog: false, // 显示修改物品类型弹出框
			showDeleteSuppliesCategoryDialog: false, // 显示删除物品类型弹出框
			showAddSuppliesDialog: false, // 显示新增物品弹出框
			showModifySuppliesDialog: false, // 显示修改物品弹出框
			showDeleteSuppliesDialog: false, // 显示删除物品弹出框
			commitLoading: false, // 保存和确定编辑
			supplementCategoryId: null, // 补充物品类型id
			supplementSuppliesId: null, // 补充物品id
			maintainCategoryId: null, // 维修物品类型id
			maintainSuppliesId: null, // 维修物品id
			suppliesType: null, // 当前选择的类型:1补充 2维修
			suppliesCategory: {
				suppliesCategoryId: null,
				itemName: '',
				chineseName: '',
				englishName: '',
				japaneseName: '',
				koreanName: '',
				suppliesType: null,
			},
			supplies: {
				suppliesId: null,
				categoryId: null,
				suppliesType: null,
				itemName: '',
				chineseName: '',
				englishName: '',
				japaneseName: '',
				koreanName: '',
			},
			suppliesCategoryRules: {
				itemName: [
					{ required: true, message: '词条名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 45 个字符', trigger: 'blur' },
				],
				chineseName: [
					{ required: true, message: '中文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				englishName: [
					{ required: true, message: '英文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				japaneseName: [
					{ required: true, message: '日文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				koreanName: [
					{ required: true, message: '韩文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
			},
			suppliesRules: {
				itemName: [
					{ required: true, message: '词条名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 45 个字符', trigger: 'blur' },
				],
				chineseName: [
					{ required: true, message: '中文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				englishName: [
					{ required: true, message: '英文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				japaneseName: [
					{ required: true, message: '日文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
				koreanName: [
					{ required: true, message: '韩文名称必填', trigger: 'blur' },
					{ min: 1, max: 50, message: '长度在 1 到 70 个字符', trigger: 'blur' },
				],
			},
			supplementOptions: [],
			maintainOptions: [],
			supplementProps: {
				lazy: true,
				checkStrictly: true,
				lazyLoad(node, resolve) {
					if (node.level == 0 || node.level == 2) {
						return;
					}
					setTimeout(() => {
						const nodes = [];
						self.$http
							.get('/api/hotel/voice/category/supplies?suppliesType=1&categoryId=' + node.value)
							.then((res) => {
								if (res.data.code == 100) {
									for (const supplies of res.data.result) {
										const item = {};
										item.value = supplies.suppliesId;
										item.label = supplies.chineseName;
										item.leaf = true;
										nodes.push(item);
									}
								} else {
									this.$message.error('程序异常！' + res.data.msg);
									resolve(null);
									return;
								}
								// 通过调用resolve将子节点数据返回，通知组件数据加载完成
								if (nodes.length > 0) {
									resolve(nodes);
								} else {
									resolve(null);
								}
							});
					}, 1000);
				},
			},
			maintainProps: {
				lazy: true,
				checkStrictly: true,
				lazyLoad(node, resolve) {
					if (node.level == 0 || node.level == 2) {
						return;
					}
					setTimeout(() => {
						const nodes = [];
						self.$http
							.get('/api/hotel/voice/category/supplies?suppliesType=2&categoryId=' + node.value)
							.then((res) => {
								if (res.data.code == 100) {
									for (const supplies of res.data.result) {
										const item = {};
										item.value = supplies.suppliesId;
										item.label = supplies.chineseName;
										item.leaf = true;
										nodes.push(item);
									}
								} else {
									this.$message.error('程序异常！' + res.data.msg);
									resolve(null);
									return;
								}
								// 通过调用resolve将子节点数据返回，通知组件数据加载完成
								if (nodes.length > 0) {
									resolve(nodes);
								} else {
									resolve(null);
								}
							});
					}, 1000);
				},
			},
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadSupplementData();
		this.loadMaintainData();
	},

	methods: {
		// 补充物品级联选项发生变化触发
		handleSupplementChange(value) {
			if (value[1] != null) {
				this.supplementSuppliesId = value[1];
				return;
			}
			if (value[0] != null) {
				this.supplementCategoryId = value[0];
				this.suppliesType = 1;
			}
		},

		// 维修物品级联选项发生变化触发
		handleMaintainChange(value) {
			if (value[1] != null) {
				this.maintainSuppliesId = value[1];
				return;
			}
			if (value[0] != null) {
				this.maintainCategoryId = value[0];
				this.suppliesType = 2;
			}
		},

		// 打开新增物品类型弹出框
		openAddSuppliesCategoryDialog(suppliesType) {
			this.suppliesCategory.suppliesType = suppliesType;
			this.showAddSuppliesCategoryDialog = true;
		},

		// 获取物品类型详情
		getSuppliesCategory() {
			let categoryId = null;
			if (this.suppliesType == 1) {
				categoryId = this.supplementCategoryId;
			}
			if (this.suppliesType == 2) {
				categoryId = this.maintainCategoryId;
			}
			this.$http
				.get('/api/hotel/voice/supplies/category?suppliesCategoryId=' + categoryId)
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result == null) {
							this.$message.error('暂无该分类信息');
							return;
						}
						this.suppliesCategory.suppliesCategoryId = res.data.result.suppliesCategoryId;
						this.suppliesCategory.chineseName = res.data.result.chineseName;
						this.suppliesCategory.englishName = res.data.result.englishName;
						this.suppliesCategory.japaneseName = res.data.result.japaneseName;
						this.suppliesCategory.koreanName = res.data.result.koreanName;
						this.suppliesCategory.suppliesType = res.data.result.suppliesType;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
						return;
					}
				});
		},

		// 打开修改物品类型弹出框
		openModifySuppliesCategoryDialog(suppliesType) {
			this.suppliesType = suppliesType;
			let isNull = true;
			if (suppliesType == 1) {
				isNull = this.supplementCategoryId == null;
			}
			if (suppliesType == 2) {
				isNull = this.maintainCategoryId == null;
			}
			if (isNull) {
				this.$message.error('请先选择分类');
				return;
			}
			this.getSuppliesCategory();
			this.showModifySuppliesCategoryDialog = true;
		},

		// 关闭修改物品类型弹出框
		closeModifySuppliesCategoryDialog() {
			Object.keys(this.suppliesCategory).forEach((key) => (this.suppliesCategory[key] = ''));
			this.showModifySuppliesCategoryDialog = false;
		},

		// 打开删除物品类型弹出框
		openDeleteSuppliesCategoryDialog(suppliesType) {
			this.suppliesType = suppliesType;
			let isNull = true;
			if (suppliesType == 1) {
				isNull = this.supplementCategoryId == null;
			}
			if (suppliesType == 2) {
				isNull = this.maintainCategoryId == null;
			}
			if (isNull) {
				this.$message.error('请先选择分类');
				return;
			}
			this.getSuppliesCategory();
			this.showDeleteSuppliesCategoryDialog = true;
		},

		// 关闭删除物品类型弹出框
		closeDeleteSuppliesCategoryDialog() {
			Object.keys(this.suppliesCategory).forEach((key) => (this.suppliesCategory[key] = ''));
			this.showDeleteSuppliesCategoryDialog = false;
		},

		// 打开新增物品弹出框
		openAddSuppliesDialog(suppliesType) {
			this.suppliesType = suppliesType;
			let isNull = true;
			if (suppliesType == 1) {
				isNull = this.supplementCategoryId == null;
			}
			if (suppliesType == 2) {
				isNull = this.maintainCategoryId == null;
			}
			if (isNull) {
				this.$message.error('请先选择分类');
				return;
			}
			this.supplies.suppliesType = suppliesType;
			this.showAddSuppliesDialog = true;
		},

		// 获取物品详情
		getSupplies() {
			let suppliesId = null;
			if (this.suppliesType == 1) {
				suppliesId = this.supplementSuppliesId;
			}
			if (this.suppliesType == 2) {
				suppliesId = this.maintainSuppliesId;
			}
			this.$http.get('/api/hotel/voice/supplies?suppliesId=' + suppliesId).then((res) => {
				if (res.data.code == 100) {
					if (res.data.result == null) {
						this.$message.error('暂无该物品信息');
						return;
					}
					this.supplies.suppliesId = res.data.result.suppliesId;
					this.supplies.categoryId = res.data.result.categoryId;
					this.supplies.chineseName = res.data.result.chineseName;
					this.supplies.englishName = res.data.result.englishName;
					this.supplies.japaneseName = res.data.result.japaneseName;
					this.supplies.koreanName = res.data.result.koreanName;
					this.supplies.suppliesType = res.data.result.suppliesType;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
					return;
				}
			});
		},

		// 打开修改物品弹出框
		openModifySuppliesDialog(suppliesType) {
			this.suppliesType = suppliesType;
			let isNull = true;
			if (suppliesType == 1) {
				isNull = this.supplementSuppliesId == null;
			}
			if (suppliesType == 2) {
				isNull = this.maintainSuppliesId == null;
			}
			if (isNull) {
				this.$message.error('请先选择物品');
				return;
			}
			this.getSupplies();
			this.showModifySuppliesDialog = true;
		},

		// 关闭修改物品弹出框
		closeModifySuppliesDialog() {
			Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
			this.showModifySuppliesDialog = false;
		},

		// 打开删除物品弹出框
		openDeleteSuppliesDialog(suppliesType) {
			this.suppliesType = suppliesType;
			let isNull = true;
			if (suppliesType == 1) {
				isNull = this.supplementSuppliesId == null;
			}
			if (suppliesType == 2) {
				isNull = this.maintainSuppliesId == null;
			}
			if (isNull) {
				this.$message.error('请先选择物品');
				return;
			}
			this.getSupplies();
			this.showDeleteSuppliesDialog = true;
		},

		// 关闭删除物品弹出框
		closeDeleteSuppliesDialog() {
			Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
			this.showDeleteSuppliesDialog = false;
		},

		// 新增物品类型
		addSuppliesCategory() {
			this.$refs.suppliesCategory.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/hotel/voice/supplies/category', {
							itemName: 'HSC_' + this.suppliesCategory.itemName,
							chineseName: this.suppliesCategory.chineseName,
							englishName: this.suppliesCategory.englishName,
							japaneseName: this.suppliesCategory.japaneseName,
							koreanName: this.suppliesCategory.koreanName,
							suppliesType: this.suppliesCategory.suppliesType,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.$message.success('处理成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							if (this.suppliesType == 1) {
								this.loadSupplementData();
							} else if (this.suppliesType == 2) {
								this.loadMaintainData();
							} else {
								this.loadSupplementData();
								this.loadMaintainData();
							}
							this.showAddSuppliesCategoryDialog = false;
							Object.keys(this.suppliesCategory).forEach(
								(key) => (this.suppliesCategory[key] = ''),
							);
							return;
						})
						.catch(() => {
							this.commitLoading = false;
							this.showAddSuppliesCategoryDialog = false;
							Object.keys(this.suppliesCategory).forEach(
								(key) => (this.suppliesCategory[key] = ''),
							);
							this.$message.error('unexpected request failed.');
						});
				} else {
					return false;
				}
			});
		},

		// 修改物品类型
		modifySuppliesCategory() {
			this.$refs.suppliesCategory.validate((valid) => {
				if (valid) {
					this.$http
						.put('/api/hotel/voice/supplies/category', {
							suppliesCategoryId: this.suppliesCategory.suppliesCategoryId,
							chineseName: this.suppliesCategory.chineseName,
							englishName: this.suppliesCategory.englishName,
							japaneseName: this.suppliesCategory.japaneseName,
							koreanName: this.suppliesCategory.koreanName,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.$message.success('处理成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							if (this.suppliesType == 1) {
								this.loadSupplementData();
							} else if (this.suppliesType == 2) {
								this.loadMaintainData();
							} else {
								this.loadSupplementData();
								this.loadMaintainData();
							}
							this.showModifySuppliesCategoryDialog = false;
							this.supplementCategoryId = null;
							this.maintainCategoryId = null;
							Object.keys(this.suppliesCategory).forEach(
								(key) => (this.suppliesCategory[key] = ''),
							);
							return;
						})
						.catch(() => {
							this.commitLoading = false;
							this.showModifySuppliesCategoryDialog = false;
							this.supplementCategoryId = null;
							this.maintainCategoryId = null;
							Object.keys(this.suppliesCategory).forEach(
								(key) => (this.suppliesCategory[key] = ''),
							);
							this.$message.error('unexpected request failed.');
						});
				} else {
					return false;
				}
			});
		},

		// 删除物品类型
		deleteSuppliesCategory() {
			this.$http
				.delete(
					'/api/hotel/voice/supplies/category?suppliesCategoryId=' +
						this.suppliesCategory.suppliesCategoryId,
				)
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100 && res.data.result === true) {
						this.$message.success('处理成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					}
					if (this.suppliesType == 1) {
						this.loadSupplementData();
					} else if (this.suppliesType == 2) {
						this.loadMaintainData();
					} else {
						this.loadSupplementData();
						this.loadMaintainData();
					}
					this.showDeleteSuppliesCategoryDialog = false;
					this.supplementCategoryId = null;
					this.maintainCategoryId = null;
					Object.keys(this.suppliesCategory).forEach((key) => (this.suppliesCategory[key] = ''));
					return;
				})
				.catch(() => {
					this.commitLoading = false;
					this.showDeleteSuppliesCategoryDialog = false;
					this.supplementCategoryId = null;
					this.maintainCategoryId = null;
					Object.keys(this.suppliesCategory).forEach((key) => (this.suppliesCategory[key] = ''));
					this.$message.error('unexpected request failed.');
				});
		},

		// 新增物品
		addSupplies() {
			let categoryId = null;
			if (this.suppliesType == 1) {
				categoryId = this.supplementCategoryId;
			}
			if (this.suppliesType == 2) {
				categoryId = this.maintainCategoryId;
			}
			this.$refs.supplies.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/hotel/voice/supplies', {
							categoryId: categoryId,
							itemName: 'HS_' + this.supplies.itemName,
							chineseName: this.supplies.chineseName,
							englishName: this.supplies.englishName,
							japaneseName: this.supplies.japaneseName,
							koreanName: this.supplies.koreanName,
							suppliesType: this.supplies.suppliesType,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.$message.success('处理成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							if (this.suppliesType == 1) {
								this.loadSupplementData();
							} else if (this.suppliesType == 2) {
								this.loadMaintainData();
							} else {
								this.loadSupplementData();
								this.loadMaintainData();
							}
							this.showAddSuppliesDialog = false;
							Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
							return;
						})
						.catch(() => {
							this.commitLoading = false;
							this.showAddSuppliesDialog = false;
							Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
							this.$message.error('unexpected request failed.');
						});
				} else {
					return false;
				}
			});
		},

		// 修改物品
		modifySupplies() {
			this.$refs.supplies.validate((valid) => {
				if (valid) {
					this.$http
						.put('/api/hotel/voice/supplies', {
							suppliesId: this.supplies.suppliesId,
							chineseName: this.supplies.chineseName,
							englishName: this.supplies.englishName,
							japaneseName: this.supplies.japaneseName,
							koreanName: this.supplies.koreanName,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.$message.success('处理成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							if (this.suppliesType == 1) {
								this.loadSupplementData();
							} else if (this.suppliesType == 2) {
								this.loadMaintainData();
							} else {
								this.loadSupplementData();
								this.loadMaintainData();
							}
							this.showModifySuppliesDialog = false;
							this.supplementSuppliesId = null;
							this.maintainSuppliesId = null;
							Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
							return;
						})
						.catch(() => {
							this.commitLoading = false;
							this.showModifySuppliesDialog = false;
							this.supplementSuppliesId = null;
							this.maintainSuppliesId = null;
							Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
							this.$message.error('unexpected request failed.');
						});
				} else {
					return false;
				}
			});
		},

		// 删除物品
		deleteSupplies() {
			this.$http
				.delete('/api/hotel/voice/supplies?suppliesId=' + this.supplies.suppliesId)
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100 && res.data.result === true) {
						this.$message.success('处理成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					}
					if (this.suppliesType == 1) {
						this.loadSupplementData();
					} else if (this.suppliesType == 2) {
						this.loadMaintainData();
					} else {
						this.loadSupplementData();
						this.loadMaintainData();
					}
					this.showDeleteSuppliesDialog = false;
					this.supplementSuppliesId = null;
					this.maintainSuppliesId = null;
					Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
					return;
				})
				.catch(() => {
					this.commitLoading = false;
					this.showDeleteSuppliesDialog = false;
					this.supplementSuppliesId = null;
					this.maintainSuppliesId = null;
					Object.keys(this.supplies).forEach((key) => (this.supplies[key] = ''));
					this.$message.error('unexpected request failed.');
				});
		},

		// 加载补充物品类型列表
		loadSupplementData: function () {
			this.supplementOptions = [];
			this.$http.get('/api/hotel/voice/supplies/categories?suppliesType=1').then((res) => {
				if (res.data.code == 100) {
					for (const suppliesCategory of res.data.result) {
						const item = {};
						item.value = suppliesCategory.suppliesCategoryId;
						item.label = suppliesCategory.chineseName;
						item.leaf = false;
						this.supplementOptions.push(item);
					}
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 加载维修物品类型列表
		loadMaintainData: function () {
			this.maintainOptions = [];
			this.$http.get('/api/hotel/voice/supplies/categories?suppliesType=2').then((res) => {
				if (res.data.code == 100) {
					for (const suppliesCategory of res.data.result) {
						const item = {};
						item.value = suppliesCategory.suppliesCategoryId;
						item.label = suppliesCategory.chineseName;
						item.leaf = false;
						this.maintainOptions.push(item);
					}
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},
	},
};
</script>
