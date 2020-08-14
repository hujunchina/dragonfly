<style scoped>
.select-industry {
	width: 200px;
	height: 30px;
	margin-top: 5px;
	margin-bottom: 5px;
	margin-left: 10px;
}
.search-container {
	margin-bottom: 15px;
}
.search-filter {
	margin-bottom: 15px;
	margin-left: 10px;
}
.margin-end-space {
	margin-bottom: 5px;
}
</style>

<template>
	<div class="container">
		<div class="search-container">
			<el-select v-model="industryTypeVal" class="select-industry" placeholder="请选择所属业务">
				<!-- option 的表格值是 value 属性 -->
				<el-option disabled value="">请选择所属业务</el-option>
				<el-option
					v-for="item in industryTypeList"
					v-bind:label="item.desc"
					v-bind:value="item.industryType"
					v-bind:key="item.industryType"
					>{{ item.desc }}</el-option
				>
			</el-select>
			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
				>查 询</el-button
			>
			<el-button style="margin-left: 15px;" type="primary" plain v-on:click="addPageResource()"
				>新 增</el-button
			>
		</div>

		<div class="search-filter">
			<el-input placeholder="请输入关键字进行过滤" v-model="filterText" class="margin-end-space" />
			<span class="margin-end-space"
				>提示：资源权限管理暂没有修改功能，如果添加错误请删除后重新添加</span
			>
			<el-tree
				class="filter-tree"
				:data="resourceData"
				:props="defaultProps"
				default-expand-all
				:filter-node-method="filterNode"
				ref="tree"
			>
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<el-tooltip class="item" effect="dark" v-bind:content="data.resourceUrl" placement="top">
						<span>{{ data.resourceName }}</span>
					</el-tooltip>
					<span>
						<el-button
							type="text"
							size="mini"
							v-on:click="addResourceWindow(data.resourceId, data.resourceName, data)"
						>
							添加子资源
						</el-button>
						<el-button
							type="text"
							size="mini"
							v-if="data.parentResourceId"
							v-on:click="removeResource(node, data)"
						>
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</div>

		<div class="resources-container">
			<el-dialog v-bind:title="resourcesWindowTitle" :visible.sync="dialogFormVisible">
				<el-form
					label-position="left"
					ref="resourcesForm"
					:model="resourcesForm"
					:rules="rules"
					label-width="100px"
				>
					<el-form-item label="资源名称" prop="resourceName">
						<el-input v-model="resourcesForm.resourceName" maxlength="64" placeholder="如项目中心">
						</el-input>
					</el-form-item>
					<el-form-item label="资源code" prop="resourceCode">
						<el-input
							v-model="resourcesForm.resourceCode"
							maxlength="48"
							placeholder="如house_page_09"
							clearable
						>
						</el-input>
					</el-form-item>
					<el-form-item label="资源URL" prop="resourceUrl">
						<el-input
							v-model="resourcesForm.resourceUrl"
							maxlength="64"
							placeholder="如/house_page_09"
							clearable
						>
						</el-input>
					</el-form-item>
					<el-form-item label="显示顺序" prop="sort">
						<el-input v-model="resourcesForm.sort" maxlength="3" placeholder="如9" clearable>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-breadcrumb label="请勾选页面操作资源" />
						<el-checkbox-group v-model="resourcesForm.resourceOperate" clearable>
							<!-- checkbox 提交的值是 label 属性值 -->
							<el-checkbox
								v-for="item in operateList"
								v-bind:key="item.code"
								v-bind:value="item.desc"
								v-bind:label="item.code"
								>{{ item.desc }}</el-checkbox
							>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" v-on:click="resourcesFormConfirm()">确 定</el-button>
					<el-button @click="resetForm('resourcesForm')">取 消</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	watch: {
		//
		filterText(val) {
			this.$refs.tree.filter(val);
		},
	},
	name: 'saasShieldResource',
	data() {
		// var checkNull = (rule, value, callback) => {
		// 	if (value != '') {
		// 		callback();
		// 	} else {
		// 		callback('该字段不能为空');
		// 	}
		// };
		return {
			industryType: '',
			industryTypeVal: '',
			dialogFormVisible: false,
			resourcesWindowTitle: '',
			industryTypeList: '',
			operateList: [],
			parentResourceId: '',
			treeData: [],
			// 资源树形结构
			filterText: '',
			resourceData: [],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
			industryTypeNULL: false,
			resourcesForm: {
				industryType: '', // web
				resourceName: '',
				resourceUrl: '',
				resourceCode: '',
				parentResourceId: '', // web
				sort: '',
				resourceOperate: [],
			},
			addresourcesForm: {
				industryName: '',
				industryCode: '',
				industrySort: '',
				industryURL: '',
				resourceOperate: [],
			},
			rules: {
				name: [
					{ required: true, message: '请输入资源名称', trigger: 'blur' },
					{ min: 1, message: '不能为空', trigger: 'blur' },
				],
				code: [{ required: true, message: '请输入资源code', trigger: 'change' }],
				url: [{ required: false, message: '请输入资源url', trigger: 'blur' }],
				sort: [{ required: true, message: '请输入排列顺序值，从1到99', trigger: 'blur' }],
			},
		};
	},
	methods: {
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogFormVisible = false;
		},
		// 加载页面后，立即获取业务类型
		getIndustryTypesList() {
			this.$http
				.get('/api/saasShield/industryType/list')
				.then((res) => {
					if (res.data.code == 100) {
						this.industryTypeList = res.data.result;
					} else {
						this.$message.error('业务数据获取失败');
					}
				})
				.catch(() => {
					this.$message.error('获取业务类型列表失败，请刷新重试');
				});
		},
		// 筛选节点
		filterNode(value, data) {
			if (!value) return true;
			return data.resourceName.indexOf(value) !== -1;
		},
		// 添加树节点
		append(data) {
			const newChild = { id: data.id++, label: data.resourceName, children: [] };
			if (!data.children) {
				this.$set(data, 'children', []);
			}
			data.children.push(newChild);
		},
		// 删除树节点
		remove(node, data) {
			const parent = node.parent;
			const children = parent.data.children || parent.data;
			const index = children.findIndex((d) => d.resourceId === data.resourceId);
			children.splice(index, 1);
		},
		// 删除资源
		removeResource(node, data) {
			this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.deleteResource(node, data);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 删除方法
		deleteResource: function (node, data) {
			this.$http
				.get('/api/saasShield/deleteResources', { params: { resourceId: data.resourceId } })
				.then((res) => {
					if (res.data.code == 100) {
						this.remove(node, data);
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
					} else {
						this.$message.info('该资源权限已关联角色，请先解除授权');
					}
				});
		},
		// 添加页面资源权限
		addPageResource: function () {
			if (this.industryTypeVal == '') {
				this.$message.error('请选择一个业务类型');
				return false;
			}
			this.resourcesWindowTitle = '添加「' + this.industryTypeVal + '」的资源权限';
			this.dialogFormVisible = true;
		},
		// 打开添加资源权限窗口
		addResourceWindow: function (resourceId, resourceName, data) {
			// 所有参数不加 this 在其他地方会替代全局变量，然后报错
			// 先获取操作权限
			this.$http
				.get('/api/saasShield/operateResources/list', { params: { resourceId: resourceId } })
				.then((res) => {
					if (res.data.code == 100) {
						this.operateList = res.data.result;
					} else {
						this.$message.info('该资源的操作权限加载失败');
					}
				});
			this.resourcesWindowTitle = '添加「' + resourceName + '」的子资源权限';
			this.dialogFormVisible = true;

			this.parentResourceId = resourceId;
			this.treeData = data;
		},
		// 点击查询按钮
		search: function () {
			if (this.industryTypeVal != '') {
				this.loadData();
			} else {
				this.$message.warning('请选择一个业务类型');
			}
		},
		loadData: function () {
			this.$http
				.get('/api/saasShield/industryResources/list', {
					params: { industryType: this.industryTypeVal },
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.$message.info('资源权限加载成功');
						var tempData = res.data.result;
						// 直接加入chilren中！！
						for (let item of tempData) {
							if (item.parentResourceId != '') {
								var pid = item.parentResourceId;
								for (let itemP of tempData) {
									if (itemP.resourceId == pid) {
										if (!itemP.children) {
											this.$set(itemP, 'children', []);
										}
										itemP.children.push(item);
									}
								}
							}
						}
						this.resourceData = [];
						for (var i = 0; i < tempData.length; i++) {
							if (tempData[i].parentResourceId == '') {
								this.resourceData.push(tempData[i]);
							}
						}
					} else {
						this.$message.error('数据加载失败');
					}
				});
		},
		// 添加资源 表格
		resourcesFormConfirm: function () {
			this.dialogFormVisible = false;
			if (!this.checkIndustryVal()) {
				return;
			}
			this.$refs['resourcesForm'].validate((valid) => {
				if (!valid) {
					this.$message.warning('表单验证失败');
					return false;
				}
			});
			let operateIndex = [];
			this.operateList.forEach((item) => {
				operateIndex[item.code] = item.desc;
			});
			let operateStr = '';
			this.resourcesForm.resourceOperate.forEach((item) => {
				operateStr += this.resourcesForm.resourceCode + '_' + item;
				operateStr += ',';
				operateStr += operateIndex[item];
				operateStr += ',';
			});
			let params = {
				resourceCode: this.resourcesForm.resourceCode,
				parentResourceId: this.parentResourceId,
				resourceName: this.resourcesForm.resourceName,
				resourceUrl: this.resourcesForm.resourceUrl,
				sort: this.resourcesForm.sort,
				operateStr: operateStr,
				industryType: this.industryTypeVal,
			};
			this.$http.get('/api/saasShield/addPageResource', { params: params }).then((res) => {
				if (res.data.code == 100) {
					this.$message.info('表单提交成功，请刷新页面显示');
					this.append(this.treeData);
				} else {
					this.$message.error('表单提交失败，请重新提交');
				}
			});
		},
		checkIndustryVal: function () {
			if (this.industryTypeVal == '') {
				this.$message.warning('请选择一个业务类型');
				return false;
			} else {
				return true;
			}
		},
	},
	mounted() {
		this.getIndustryTypesList();
	},
};
</script>
