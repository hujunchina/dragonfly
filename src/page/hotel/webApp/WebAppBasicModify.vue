<style lang="scss" scoped>
.avatar-uploader .el-upload {
	position: relative;
	overflow: hidden;
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	width: 100px;
	height: 100px;
	color: #8c939d;
	font-size: 28px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	display: block;
	width: 100px;
	height: 100px;
}
</style>
<template>
	<div class="container">
		<el-form
			label-width="150px"
			:model="webAppInfo"
			:rules="webAppInfoRules"
			ref="webAppInfo"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="公版客控名称:" prop="name">
				<el-input
					class="inputText"
					placeholder="请输入公版h5客控名称"
					v-model="webAppInfo.name"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="公版客控域名:" prop="domain">
				<el-input
					class="inputText"
					placeholder="请输入公版h5客控域名"
					v-model="webAppInfo.domain"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="saveWebAppInfo()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnWebAppInfoManage()">返 回</el-button>
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
			webAppInfo: {
				id: null,
				name: '',
				domain: '',
			},

			webAppInfoRules: {
				name: [{ required: true, message: '公版h5客控名称必填', trigger: 'blur' }],
				domain: [{ required: true, message: '公版h5客控域名必填', trigger: 'blur' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		loadData: function () {
			const id = this.$route.query.id;
			if (id) {
				this.$http.get('/api/hotel/web-app?id=' + id).then((res) => {
					if (res.data.code == 100) {
						this.webAppInfo = res.data.result;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
			}
		},

		// 保存pms信息
		saveWebAppInfo: function () {
			this.$refs.webAppInfo.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/hotel/web-app', {
							id: this.webAppInfo.id,
							name: this.webAppInfo.name,
							domain: this.webAppInfo.domain,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.returnWebAppInfoManage();
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

		returnWebAppInfoManage: function () {
			this.$router.push({ name: 'webAppBasicManage' });
		},
	},
};
</script>
