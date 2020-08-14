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
		<!--用户自定义域名信息-->
		<el-form
			label-width="100px"
			:model="webAppDomainInfo"
			:rules="webAppDomainInfoRules"
			ref="webAppDomainInfo"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="审核状态:" prop="auditStatus">
				<el-select placeholder="请选择审核状态" v-model="webAppDomainInfo.auditStatus">
					<el-option
						v-for="item in auditStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="审核状态描述:" prop="auditDescription">
				<el-input
					type="textarea"
					rows="4"
					placeholder="请输入审核状态描述"
					v-model="webAppDomainInfo.auditDescription"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="saveWebAppDomainInfo()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnWebAppDomainManage()">返 回</el-button>
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
			webAppDomainInfo: {
				// 自定义域名信息
				id: null, // id
				auditStatus: '', // 审核状态
				auditDescription: '', // 审核状态描述
			},

			webAppDomainInfoRules: {
				auditStatus: [{ required: true, message: '审核状态必填', trigger: 'blur' }],
			},
			auditStatusOptions: [
				{
					value: '1',
					label: '审核成功',
				},
				{
					value: '0',
					label: '审核失败',
				},
				{
					value: '2',
					label: '审核中',
				},
			],
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		// 加载自定义域名信息
		loadData: function () {
			const id = this.$route.query.id;
			if (id) {
				this.$http.get('/api/hotel/web-app/domain/?id=' + id).then((res) => {
					if (res.data.code == 100) {
						this.webAppDomainInfo = res.data.result;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
			}
		},

		// 保存自定义域名信息
		saveWebAppDomainInfo: function () {
			this.$refs.webAppDomainInfo.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/hotel/web-app/domain', {
							id: this.webAppDomainInfo.id,
							auditStatus: this.webAppDomainInfo.auditStatus,
							auditDescription: this.webAppDomainInfo.auditDescription,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.returnWebAppDomainManage();
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

		// 返回自定义域名列表界面
		returnWebAppDomainManage: function () {
			this.$router.push({ name: 'webAppBasicManage' });
		},
	},
};
</script>
