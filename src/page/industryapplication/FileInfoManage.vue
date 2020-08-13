<template>
	<div class="inner">
		<template>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="替换用户logo" name="first"></el-tab-pane>
				<el-tab-pane label="替换域名logo" name="second"></el-tab-pane>
				<el-tab-pane label="替换coin" name="third"></el-tab-pane>
			</el-tabs>
		</template>
		<el-row>
			<el-col :span="8" :offset="5">
				<div id="upload">
					<el-form ref="form" :model="form" label-width="80px">
						<!--            <el-form-item label="uid">-->
						<!--              <el-input v-model="form.name" name="names" style="width:360px;"></el-input>-->
						<!--            </el-form-item>-->
						<el-form-item label="userName" v-show="userNameShowFlag">
							<el-input v-model="form.userName" name="userName" style="width: 360px;"></el-input>
						</el-form-item>
						<el-form-item label="bizType" v-show="bizTypeShowFlag">
							<el-input v-model="form.bizType" name="bizType" style="width: 360px;"></el-input>
						</el-form-item>
						<el-form-item label="域名" v-show="signShowFlag">
							<el-input v-model="form.fileSign" name="fileSign" style="width: 360px;"></el-input>
						</el-form-item>
						<el-form-item label="coin标签" v-show="coinShowFlag">
							<el-input v-model="form.textContent" name="coin" style="width: 360px;"></el-input>
						</el-form-item>
						<!-- 多语言下拉框 -->
						<el-form-item label="多语言" v-show="langShowFlag">
							<template>
								<el-select v-model="form.lang" placeholder="请选择">
									<el-option
										v-for="item in options"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									>
									</el-option>
								</el-select>
							</template>
							<!--              <el-input v-model="form.lang" name="lang" style="width:360px;"></el-input>-->
						</el-form-item>
						<el-upload
							class="upload-demo"
							:auto-upload="false"
							:on-change="onchange"
							:on-remove="handleRemove"
							:limit="1"
							drag
							action=""
							style="margin-left: 80px;"
						>
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">点击上传</div>
							<div class="el-upload__tip" slot="tip">
								这里只能上传一张,如需更换请先手动删除列表中的！<br />
								文件名称小于15字符！
							</div>
						</el-upload>

						<el-form-item style="padding-top: 20px;">
							<el-button type="primary" @click="onSubmit">立即创建</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				// form里面的参数
				name: '',
				fileSign: '',
				lang: '',
				textContent: '',
				userName: '',
				bizType: '',
			},
			activeName: 'first', // 上传选项卡name
			param: '', // 表单要提交的参数
			src: '', // 展示图片的地址
			updatePic: '', // 上传图片对象
			options: [
				{
					value: 'zh',
					label: '中文',
				},
				{
					value: 'en',
					label: '英文',
				},
			],
			fileType: 1,
			coinShowFlag: false,
			signShowFlag: false,
			langShowFlag: false,
			userNameShowFlag: true,
			bizTypeShowFlag: true,
		};
	},
	methods: {
		handleClick() {
			this.coinShowFlag = this.activeName === 'third';
			this.signShowFlag = this.activeName !== 'first';
			this.langShowFlag = this.activeName !== 'first';
			this.userNameShowFlag = this.activeName === 'first';
			this.bizTypeShowFlag = this.activeName === 'first';

			// 第一个为默认选项卡
			if (this.activeName === 'first') {
				this.fileType = 1;
			}
			// 第二中为域名上传
			if (this.activeName === 'second') {
				this.fileType = 5;
			}
			// 第三种为coin上传
			if (this.activeName === 'third') {
				this.fileType = 6;
			}
		},
		onchange(file) {
			this.updatePic = file;
			// 创建临时的路径来展示图片
			const windowURL = window.URL || window.webkitURL;
			this.src = windowURL.createObjectURL(file.raw);
			// 重新写一个表单上传的方法
			this.param = new FormData();
			this.param.append('file', file.raw, file.name);
		},
		handleRemove() {
			this.param.delete('file');
			this.updatePic = undefined;
		},
		onSubmit() {
			// 判断图片是否存在
			if (this.param === '' || this.updatePic === undefined) {
				this.$message.warning('请选择图片!');
				return;
			}
			// 表单提交的事件
			const names = this.form.name;
			const fileSign = this.form.fileSign;
			const lang = this.form.lang;
			const userName = this.form.userName;
			const bizType = this.form.bizType;
			const textContent = this.form.textContent;
			const fileType = this.fileType;

			this.param.append('uid', names);
			this.param.append('fileSign', fileSign);
			this.param.append('lang', lang);
			this.param.append('userName', userName);
			this.param.append('bizType', bizType);
			this.param.append('textContent', textContent);
			this.param.append('fileType', fileType);

			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};
			this.$http.post('/api/industryfile/operatemanage/save', this.param, config).then((res) => {
				// 回调函数
				if (res.data.code === '100') {
					this.$message({
						message: '上传成功',
						type: 'success',
					});
					this.param = '';
					this.form.name = '';
					this.form.fileSign = '';
					this.form.lang = '';
					this.form.userName = '';
					this.form.bizType = '';
					this.form.textContent = '';
					this.updatePic = undefined;
				} else {
					this.param = '';
					this.form.name = '';
					this.form.fileSign = '';
					this.form.lang = '';
					this.form.userName = '';
					this.form.bizType = '';
					this.form.textContent = '';
					this.updatePic = undefined;
					this.$message.error('上传失败！' + res.data.msg);
				}
			});
		},
	},
};
</script>
