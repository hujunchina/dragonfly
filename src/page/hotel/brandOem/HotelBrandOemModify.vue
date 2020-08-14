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
		<!--品牌商OEM信息-->
		<el-form
			label-width="100px"
			:model="brandOemInfo"
			:rules="brandOemInfoRules"
			ref="brandOemInfo"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<el-form-item label="企业名称:" prop="enterpriseName">
				<el-input
					class="inputText"
					v-model="brandOemInfo.enterpriseName"
					:disabled="true"
				></el-input>
			</el-form-item>
			<el-form-item label="认证状态:" prop="authStatus">
				<el-input class="inputText" v-model="brandOemInfo.authStatus" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="行业域名:" prop="domainName">
				<el-input
					class="inputText"
					placeholder="请输入行业域名"
					v-model="brandOemInfo.domainName"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="标题:" prop="title">
				<el-input
					class="inputText"
					placeholder="请输入标题"
					v-model="brandOemInfo.title"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="英文标题:" prop="englishTitle">
				<el-input
					class="inputText"
					placeholder="请输入英文标题"
					v-model="brandOemInfo.englishTitle"
					clearable
				></el-input>
			</el-form-item>
			<el-form-item label="Logo:">
				<el-upload
					class="avatar-uploader"
					action="/api/hotel/fileUpload"
					:show-file-list="false"
					:on-success="handleLogoAvatarSuccess"
					:data="paramsData"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="brandOemInfo.logoUrl" :src="brandOemInfo.logoUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="icon:">
				<el-upload
					class="avatar-uploader"
					action="/api/hotel/fileUpload"
					:show-file-list="false"
					:on-success="handleIconAvatarSuccess"
					:data="paramsData"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="brandOemInfo.iconUrl" :src="brandOemInfo.iconUrl" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="服务条款:">
				<quill-editor
					v-model="serviceTermContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item label="法律声明:">
				<quill-editor
					v-model="legalStatementContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item label="隐私政策:">
				<quill-editor
					v-model="privacyPolicyContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item label="英文服务条款:">
				<quill-editor
					v-model="englishServiceTermContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item label="英文法律声明:">
				<quill-editor
					v-model="englishLegalStatementContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item label="英文隐私政策:">
				<quill-editor
					v-model="englishPrivacyPolicyContent"
					ref="myQuillEditor"
					:options="editorOption"
					@blur="onEditorBlur($event)"
					@focus="onEditorFocus($event)"
					@change="onEditorChange($event)"
				></quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="saveBrandOemInfo()" :loading="commitLoading"
					>保 存</el-button
				>
				<el-button style="margin-left: 20px;" @click="returnBrandOemManage()">返 回</el-button>
				<el-link
					type="primary"
					style="margin-left: 20px;"
					target="_blank"
					:href="'https://' + brandOemInfo.domainName + '/userAgreement?type=1'"
				>
					预览服务条款
				</el-link>
				<el-link
					type="primary"
					style="margin-left: 20px;"
					target="_blank"
					:href="'https://' + brandOemInfo.domainName + '/userAgreement?type=2'"
				>
					预览法律声明
				</el-link>
				<el-link
					type="primary"
					style="margin-left: 20px;"
					target="_blank"
					:href="'https://' + brandOemInfo.domainName + '/userAgreement?type=3'"
				>
					预览隐私政策
				</el-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
// 引入时间戳转换工具
import { quillEditor } from 'vue-quill-editor'; // 调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
	components: {
		quillEditor,
	},
	data() {
		return {
			msg: '', // 提示
			commitLoading: false, // 保存和确定编辑
			fileToken: '', // 文件上传令牌
			logoTmpFileId: '', // logo临时存储id
			iconTmpFileId: '', // icon临时存储id
			brandOemInfo: {
				// 品牌商OEM信息
				uid: '', // uid
				enterpriseName: '', // 企业名称
				authStatus: '', // 认证状态
				domainName: '', // 行业域名
				title: '', // 标题
				englishTitle: '', // 英文标题
				logoUrl: '', // logo图片路径
				iconUrl: '', // icon图片路径
			},

			paramsData: {
				subjectType: 'hotel_brand_oem_logo_img',
			},

			brandOemInfoRules: {
				domainName: [{ required: true, message: '行业域名必填', trigger: 'blur' }],
			},

			// 富文本内容
			serviceTermContent: '',
			legalStatementContent: '',
			privacyPolicyContent: '',
			englishServiceTermContent: '',
			englishLegalStatementContent: '',
			englishPrivacyPolicyContent: '',
			editorOption: {},
		};
	},

	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill;
		},
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		handleLogoAvatarSuccess(res, file) {
			this.brandOemInfo.logoUrl = URL.createObjectURL(file.raw);
			this.logoTmpFileId = res.result.result.tmp_file_id;
		},
		handleIconAvatarSuccess(res, file) {
			this.brandOemInfo.iconUrl = URL.createObjectURL(file.raw);
			this.iconTmpFileId = res.result.result.tmp_file_id;
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},

		onEditorReady() {}, // 准备编辑器
		onEditorBlur() {}, // 失去焦点事件
		onEditorFocus() {}, // 获得焦点事件
		onEditorChange() {}, // 内容改变事件
		// 转码
		escapeStringHTML(str) {
			str = str.replace(/&lt;/g, '<');
			str = str.replace(/&gt;/g, '>');
			return str;
		},

		// 加载品牌商OEM信息
		loadData: function () {
			const uid = this.$route.query.uid;
			if (uid) {
				this.$http.get('/api/hotel/brand/oem-info?uid=' + uid).then((res) => {
					if (res.data.code == 100) {
						this.brandOemInfo = res.data.result;
						if (this.brandOemInfo.authStatus == 90 || this.brandOemInfo.authStatus == 100) {
							this.brandOemInfo.authStatus = '认证完成';
						}
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
			}
		},

		// 保存品牌商OEM信息
		saveBrandOemInfo: function () {
			this.$refs.brandOemInfo.validate((valid) => {
				if (valid) {
					if (this.serviceTermContent != '') {
						this.serviceTermContent = this.escapeStringHTML(this.serviceTermContent);
					}
					if (this.legalStatementContent != '') {
						this.legalStatementContent = this.escapeStringHTML(this.legalStatementContent);
					}
					if (this.privacyPolicyContent != '') {
						this.privacyPolicyContent = this.escapeStringHTML(this.privacyPolicyContent);
					}
					if (this.englishServiceTermContent != '') {
						this.englishServiceTermContent = this.escapeStringHTML(this.englishServiceTermContent);
					}
					if (this.englishLegalStatementContent != '') {
						this.englishLegalStatementContent = this.escapeStringHTML(
							this.englishLegalStatementContent,
						);
					}
					if (this.englishPrivacyPolicyContent != '') {
						this.englishPrivacyPolicyContent = this.escapeStringHTML(
							this.englishPrivacyPolicyContent,
						);
					}
					this.$http
						.post('/api/hotel/brand/oem-info', {
							uid: this.brandOemInfo.uid,
							domainName: this.brandOemInfo.domainName,
							title: this.brandOemInfo.title,
							englishTitle: this.brandOemInfo.englishTitle,
							logoTmpFileId: this.logoTmpFileId,
							iconTmpFileId: this.iconTmpFileId,
							serviceTermContent: this.serviceTermContent,
							legalStatementContent: this.legalStatementContent,
							privacyPolicyContent: this.privacyPolicyContent,
							englishServiceTermContent: this.englishServiceTermContent,
							englishLegalStatementContent: this.englishLegalStatementContent,
							englishPrivacyPolicyContent: this.englishPrivacyPolicyContent,
						})
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result == true) {
								this.returnBrandOemManage();
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

		// 返回品牌商OEM列表界面
		returnBrandOemManage: function () {
			this.$router.push({ name: 'hotelBrandOemManage' });
		},
	},
};
</script>
