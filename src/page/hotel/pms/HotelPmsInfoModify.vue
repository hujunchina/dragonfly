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
		<!--pms厂商信息-->
		<el-form
			label-width="100px"
			:model="pmsInfo"
			:rules="pmsInfoRules"
			ref="pmsInfo"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="厂商名称:" prop="pmsName">
				<el-input
					class="inputText"
					placeholder="请输入厂商名称"
					v-model="pmsInfo.pmsName"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="pms编码:" prop="pmsCode">
				<el-input
					class="inputText"
					placeholder="请输入pms编码"
					v-model="pmsInfo.pmsCode"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="uid:" prop="uid">
				<el-input
					class="inputText"
					placeholder="请输入uid"
					v-model="pmsInfo.uid"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="Logo:">
				<el-upload
					class="avatar-uploader"
					action="/api/hotel/fileUpload"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:data="paramsData"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="pmsInfo.image" :src="pmsInfo.image" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="描述:">
				<el-input
					type="textarea"
					rows="4"
					placeholder="请输入pms描述"
					v-model="pmsInfo.description"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="savePmsInfo()" :loading="commitLoading">保 存</el-button>
				<el-button style="margin-left: 20px;" @click="returnPmsInfoManage()">返 回</el-button>
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
			tmpFileId: '', // 临时存储id
			pmsInfo: {
				// 厂商信息
				id: null, // id
				pmsCode: '', // pms编码
				pmsName: '', // 厂商名称
				uid: '', // uid
				image: '', // 图片
				description: '', // 描述
			},
			paramsData: {
				subjectType: 'hotel_pms_logo_img',
			},

			pmsInfoRules: {
				pmsCode: [{ required: true, message: 'pms编码必填', trigger: 'blur' }],
				pmsName: [{ required: true, message: '厂商名称必填', trigger: 'blur' }],
				uid: [{ required: true, message: 'uid必填', trigger: 'blur' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		handleAvatarSuccess(res, file) {
			this.pmsInfo.image = URL.createObjectURL(file.raw);
			this.tmpFileId = res.result.result.tmp_file_id;
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},

		// 加载pms信息
		loadData: function () {
			const id = this.$route.query.id;
			if (id) {
				this.$http.get('/api/hotel/pms?id=' + id).then((res) => {
					if (res.data.code == 100) {
						this.pmsInfo = res.data.result;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
			}
		},

		// 保存pms信息
		savePmsInfo: function () {
			this.$refs.pmsInfo.validate((valid) => {
				if (valid) {
					this.$http
						.post('/api/hotel/pms', {
							id: this.pmsInfo.id,
							pmsCode: this.pmsInfo.pmsCode,
							pmsName: this.pmsInfo.pmsName,
							uid: this.pmsInfo.uid,
							tmpFileId: this.tmpFileId,
							description: this.pmsInfo.description,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result === true) {
								this.returnPmsInfoManage();
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

		// 返回pms列表界面
		returnPmsInfoManage: function () {
			this.$router.push({ name: 'hotelPmsInfoManage' });
		},
	},
};
</script>
