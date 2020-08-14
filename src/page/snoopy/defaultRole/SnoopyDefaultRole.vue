<template>
	<div class="container">
		<!--pms厂商信息-->
		<el-form
			label-width="100px"
			:model="roleDetail"
			:rules="roleDetailRules"
			ref="roleDetail"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="角色名称:" prop="roleName">
				<el-input
					class="inputText"
					placeholder="请输入角色名称"
					v-model="roleDetail.roleName"
					clearable
				></el-input>
			</el-form-item>
			<!--<el-form-item label="类型:">-->
			<!--<el-radio-group v-model="roleDetail.level" size="small">-->
			<!--<el-radio-button label="brand">品牌商</el-radio-button>-->
			<!--<el-radio-button label="agent">代理商</el-radio-button>-->
			<!--<el-radio-button label="hotel">酒店商</el-radio-button>-->
			<!--</el-radio-group>-->
			<!--</el-form-item>-->
			<el-form-item label="描述:">
				<el-input
					type="textarea"
					rows="4"
					placeholder="请输入角色描述"
					v-model="roleDetail.description"
				></el-input>
			</el-form-item>
			<el-form-item label="权限点:" prop="permissionIdList">
				<el-checkbox-group v-model="roleDetail.permissionIdList" size="small">
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
				<el-button type="success" @click="saveDefaultRole()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnDefaultRoleManage()">返 回</el-button>
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
			roleDetail: {
				// 角色详情
				roleId: '', // 角色id
				roleName: '', // 角色名称
				level: 'snoopy', // 类型
				description: '', // 角色描述
				permissionIdList: [], // 权限点id列表
			},

			roleDetailRules: {
				roleName: [{ required: true, message: '角色名称必填', trigger: 'blur' }],
				level: [{ required: true, message: '类型必选', trigger: 'blur' }],
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
			if (this.$route.query.roleDetail) {
				this.roleDetail.roleId = this.$route.query.roleDetail.roleId;
				this.roleDetail.roleName = this.$route.query.roleDetail.roleName;
				this.roleDetail.description = this.$route.query.roleDetail.remark;
				this.roleDetail.level = this.$route.query.roleDetail.level;
			}
			if (this.roleDetail) {
				this.$http
					.get('/api/snoopy/role/permissionList?roleId=' + this.roleDetail.roleId)
					.then((res) => {
						if (res.data.code == 100) {
							for (const permission of res.data.result) {
								this.roleDetail.permissionIdList.push(permission.permissionId);
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

		// 保存默认角色
		saveDefaultRole: function () {
			this.$refs.roleDetail.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/snoopy/role/save', {
							roleId: this.roleDetail.roleId,
							roleName: this.roleDetail.roleName,
							description: this.roleDetail.description,
							permissionIds: this.roleDetail.permissionIdList,
							level: this.roleDetail.level,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.returnDefaultRoleManage();
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

		// 返回默认角色管理界面
		returnDefaultRoleManage: function () {
			this.$router.push({ name: 'snoopyDefaultRoleManage' });
		},
	},
};
</script>
