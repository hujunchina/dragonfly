<template>
	<div class="container">
		<!--pms厂商信息-->
		<el-form
			label-width="100px"
			:model="permissionModule"
			:rules="permissionModuleRules"
			ref="permissionModule"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="权限组名称:" prop="moduleName">
				<el-input
					class="inputText"
					placeholder="请输入权限组名称"
					v-model="permissionModule.moduleName"
					clearable
				></el-input>
			</el-form-item>

			<el-form-item label="顺序:" prop="moduleName">
				<el-input
					class="inputText"
					placeholder="请输入顺序"
					v-model="permissionModule.sort"
					clearable
				></el-input>
			</el-form-item>
			<!--<el-form-item label="类型:">-->
			<!--<el-radio-group v-model="permissionModule.accessLevel" size="small">-->
			<!--<el-radio-button label="brand">品牌商</el-radio-button>-->
			<!--<el-radio-button label="agent">代理商</el-radio-button>-->
			<!--<el-radio-button label="hotel">酒店商</el-radio-button>-->
			<!--</el-radio-group>-->
			<!--</el-form-item>-->
			<el-form-item label="权限点:" prop="permissionIdList">
				<el-checkbox-group v-model="permissionModule.permissionIdList" size="small">
					<el-checkbox
						v-for="permission in permissionList"
						:label="permission.permissionId"
						:key="permission.permissionId"
						border
					>
						{{ permission.level }}-{{ permission.name }}
					</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="savePermissionModule()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnPermissionModuleManage()"
					>返 回</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			msg: '', // 提示
			commitLoading: false, // 保存和确定编辑
			permissionList: [], // 权限点列表
			permissionModule: {
				// 权限组
				moduleId: '', // 模块id
				moduleName: '', // 权限组名称
				permissionIdList: [], // 权限点id列表
				sort: '',
				accessLevel: 'snoopy', // 类型
			},

			permissionModuleRules: {
				moduleName: [{ required: true, message: '权限组名称必填', trigger: 'blur' }],
				accessLevel: [{ required: true, message: '类型必选', trigger: 'blur' }],
				permissionIdList: [{ required: true, message: '权限id至少选择一个', trigger: 'blur' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		// 加载权限组
		loadData: function () {
			const moduleId = this.$route.query.moduleId;
			if (moduleId) {
				this.$http.get('/api/snoopy/certainModule/permissions?moduleId=' + moduleId).then((res) => {
					if (res.data.code == 100) {
						this.permissionModule.moduleId = res.data.result.moduleId;
						this.permissionModule.moduleName = res.data.result.moduleName;
						this.permissionModule.accessLevel = res.data.result.accessLevel;
						this.permissionModule.sort = res.data.result.sort;
						for (const permission of res.data.result.permissionInfoRespList) {
							this.permissionModule.permissionIdList.push(permission.permissionId);
						}
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
			}
			// 加载所有权限点列表
			this.$http.get('/api/snoopy/permissions').then((res) => {
				if (res.data.code == 100) {
					this.permissionList = res.data.result;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 保存权限组
		savePermissionModule: function () {
			this.$refs.permissionModule.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/snoopy/module/permission', {
							moduleId: this.permissionModule.moduleId,
							moduleName: this.permissionModule.moduleName,
							permissionIdList: this.permissionModule.permissionIdList,
							sort: this.permissionModule.sort,
							accessLevel: this.permissionModule.accessLevel,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.returnPermissionModuleManage();
								this.$message.success('保存成功');
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							return;
						})
						.catch(() => {
							this.commitLoading = false;
							this.$message.error('unexpected request failed.');
						});
				} else {
					return false;
				}
			});
		},

		// 返回权限组管理界面
		returnPermissionModuleManage: function () {
			this.$router.push({ name: 'snoopyPermissionModuleManage' });
		},
	},
};
</script>
