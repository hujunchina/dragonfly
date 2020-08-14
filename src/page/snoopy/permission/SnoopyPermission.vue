<template>
	<div class="container">
		<!--pms厂商信息-->
		<el-form
			label-width="100px"
			:model="permission"
			:rules="permissionRules"
			ref="permission"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="权限名称:" prop="name">
				<el-input
					class="inputText"
					placeholder="请输入权限名称"
					v-model="permission.name"
					clearable
				></el-input>
			</el-form-item>
			<!--<el-form-item label="类型:">-->
			<!--<el-radio-group v-model="permission.level" size="small">-->
			<!--<el-radio-button label="brand">品牌商</el-radio-button>-->
			<!--<el-radio-button label="agent">代理商</el-radio-button>-->
			<!--<el-radio-button label="hotel">酒店商</el-radio-button>-->
			<!--</el-radio-group>-->
			<!--</el-form-item>-->
			<el-form-item label="权限类型:" prop="type">
				<el-input
					class="inputText"
					placeholder="请输入权限类型"
					v-model="permission.type"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="权限编码:" prop="path">
				<el-input
					class="inputText"
					placeholder="请输入权限编码"
					v-model="permission.path"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="顺序:" prop="sort">
				<el-input
					class="inputText"
					placeholder="请输入顺序"
					v-model="permission.sort"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="savePermission()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnPermissionManage()">返 回</el-button>
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
			permission: {
				// 权限信息
				permissionId: '', // id
				name: '', // 权限点名称
				type: '', // 权限点类型
				sort: '', // 权限点顺序
				path: '', // 权限点资源
				level: 'snoopy', // 类型
			},

			permissionRules: {
				name: [{ required: true, message: '权限名称必填', trigger: 'blur' }],
				type: [{ required: true, message: '权限类型必填', trigger: 'blur' }],
				path: [{ required: true, message: '权限编码必填', trigger: 'blur' }],
				level: [{ required: true, message: '类型必选', trigger: 'blur' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		// 加载权限信息
		loadData: function () {
			const permissionId = this.$route.query.permissionId;
			if (permissionId) {
				this.$http
					.get('/api/snoopy/permission/detailInfo?permissionId=' + permissionId)
					.then((res) => {
						if (res.data.code == 100) {
							this.permission = res.data.result;
						} else {
							this.$message.error('程序异常！' + res.data.msg);
						}
					});
			}
		},

		// 保存权限信息
		savePermission: function () {
			this.$refs.permission.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/snoopy/permission', {
							permissionId: this.permission.permissionId,
							path: this.permission.path,
							name: this.permission.name,
							type: this.permission.type,
							sort: this.permission.sort,
							level: this.permission.level,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100) {
								this.returnPermissionManage();
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

		// 返回权限列表界面
		returnPermissionManage: function () {
			this.$router.push({ name: 'snoopyPermissionManage' });
		},
	},
};
</script>
