<style lang="scss" scoped>
.el-dialog {
	width: 40%;
}
</style>
<template>
	<div class="container">
		<!--行业审核信息-->
		<el-form
			ref="industryInfo"
			:model="industryInfo"
			label-width="100px"
			style="width: 60%; min-width: 600px; margin: 20px;"
		>
			<h2>&nbsp;&nbsp;行业信息:</h2>
			<br />
			<el-form-item label="企业名称:">
				<span>{{ industryInfo.enterpriseName }}</span>
			</el-form-item>
			<el-form-item label="企业类型:">
				<el-checkbox-group v-model="enterpriseTypes">
					<el-checkbox label="酒店" name="enterpriseType" :disabled="true"></el-checkbox>
					<el-checkbox label="品牌商" name="enterpriseType" :disabled="true"></el-checkbox>
					<el-checkbox label="服务商" name="enterpriseType" :disabled="true"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="信用代码:">
				<span>{{ industryInfo.businessLicenseNo }}</span>
			</el-form-item>
			<el-form-item label="营业执照图片:">
				<el-image
					v-for="imageUrl in industryInfo.businessLicenseImages"
					:key="imageUrl"
					style="width: 100px; height: 100px; margin: 20px;"
					:src="imageUrl"
					:preview-src-list="industryInfo.businessLicenseImages"
				></el-image>
			</el-form-item>
			<el-form-item label="注册地址:">
				<span>{{ industryInfo.address }}</span>
			</el-form-item>
			<el-form-item label="备注:" v-if="industryInfo.remarks !== ''">
				<span>{{ industryInfo.remarks }}</span>
			</el-form-item>
			<el-form-item label="提交认证时间:">
				<span>{{ industryInfo.gmtCreate }}</span>
			</el-form-item>
			<br />
			<h2>&nbsp;&nbsp;审核信息:</h2>
			<br />
			<el-form-item label="审核状态:">
				<span>{{ industryInfo.auditStatus === 0 ? '待审核' : '已审核' }}</span>
			</el-form-item>
			<el-form-item label="审核结果:">
				<span>
					{{
						industryInfo.auditStatus === 0
							? '待审核'
							: industryInfo.auditStatus === 1
							? '审核通过'
							: '审核不通过'
					}}
				</span>
			</el-form-item>
			<el-form-item label="审核人:" v-if="industryInfo.auditStatus !== 0">
				<span>{{ industryInfo.auditor }}</span>
			</el-form-item>
			<el-form-item label="审核时间:" v-if="industryInfo.auditStatus !== 0">
				<span>{{ industryInfo.gmtAudit }}</span>
			</el-form-item>
			<el-form-item label="审核备注:" v-if="industryInfo.auditStatus !== 0">
				<span>{{ industryInfo.auditRemarks }}</span>
			</el-form-item>
			<el-form-item>
				<el-button
					type="success"
					v-if="industryInfo.auditStatus === 0"
					@click="auditIndustryInfo(1)"
					v-has="'/hotel/industry/audit'"
				>
					审核通过
				</el-button>
				<el-button
					type="danger"
					v-if="industryInfo.auditStatus === 0"
					@click="auditIndustryInfo(2)"
					v-has="'/hotel/industry/audit'"
				>
					审核不通过
				</el-button>
				<el-button @click="goHotleIndustryAudit()">返回</el-button>
			</el-form-item>
		</el-form>
		<!-- 审核通过确认框 -->
		<el-dialog title="审核" :visible.sync="showPassConfirmDialog">
			<el-form :model="industryInfo" ref="industryInfo" label-width="80px">
				<el-form-item label="企业名称:">
					<span>{{ industryInfo.enterpriseName }}</span>
				</el-form-item>
				<el-form-item label="审核类型:">
					<span>
						<font color="red">通过</font>
					</span>
				</el-form-item>
				<el-form-item label="审核备注:">
					<el-input type="textarea" v-model="auditRemarks"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="commitAuditIndustryInfo(industryInfo.id, 1)"
						:loading="commitLoading"
					>
						确 认
					</el-button>
					<el-button @click="showPassConfirmDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 审核不通过确认框 -->
		<el-dialog title="审核" :visible.sync="showNoPassConfirmDialog">
			<el-form :model="industryInfo" ref="industryInfo" label-width="80px">
				<el-form-item label="企业名称:">
					<span>{{ industryInfo.enterpriseName }}</span>
				</el-form-item>
				<el-form-item label="审核类型:">
					<span>
						<font color="red">不通过</font>
					</span>
				</el-form-item>
				<el-form-item label="审核备注:">
					<el-input type="textarea" v-model="auditRemarks"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="commitAuditIndustryInfo(industryInfo.id, 2)"
						:loading="commitLoading"
					>
						确 认
					</el-button>
					<el-button @click="showNoPassConfirmDialog = false" style="margin-left: 20px;"
						>取 消</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
// 引入时间戳转换工具
import moment from 'moment';

export default {
	data() {
		return {
			msg: '', // 提示
			showPassConfirmDialog: false, // 是否显示审核通过确认框
			showNoPassConfirmDialog: false, // 是否显示审核不通过确认框
			commitLoading: false, // 保存和确定编辑
			industryInfo: {}, // 行业信息
			enterpriseTypes: [], // 企业类型数组
			auditRemarks: '', // 审核备注
		};
	},

	// 页面加载时直接返回所有的数据
	mounted() {
		this.loadData();
	},

	methods: {
		// 时间戳转换日期
		dateFormat: function (date) {
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},

		// 加载行业审核记录详情
		loadData: function () {
			const id = this.$route.query.id;
			this.$http.get('/api/hotel/industry/audit/record?id=' + id).then((res) => {
				if (res.data.code == 100) {
					this.industryInfo = res.data.result;
					this.industryInfo.address =
						this.industryInfo.fullLocationName + this.industryInfo.address;
					this.industryInfo.gmtAudit = this.dateFormat(this.industryInfo.gmtAudit);
					this.industryInfo.gmtCreate = this.dateFormat(this.industryInfo.gmtCreate);
					if (this.industryInfo.enterpriseTypes[0] === '1') {
						this.enterpriseTypes.push('酒店');
					}
					if (this.industryInfo.enterpriseTypes[1] === '1') {
						this.enterpriseTypes.push('品牌商');
					}
					if (this.industryInfo.enterpriseTypes[2] === '1') {
						this.enterpriseTypes.push('服务商');
					}
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 审核行业信息确认框
		auditIndustryInfo(auditStatus) {
			if (auditStatus === 1) {
				this.showPassConfirmDialog = true;
			} else {
				this.showNoPassConfirmDialog = true;
			}
		},

		// 确认提交行业审核
		commitAuditIndustryInfo: function (id, auditStatus) {
			this.$http
				.post('/api/hotel/industry/audit', {
					id: id,
					auditStatus: auditStatus,
					auditRemarks: this.auditRemarks,
				})
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100 && res.data.result === true) {
						this.$message.success('审核成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					}
					this.loadData();
					this.showPassConfirmDialog = false;
					this.showNoPassConfirmDialog = false;
					this.auditRemarks = '';
					return;
				})
				.catch(() => {
					this.commitLoading = false;
					this.showPassConfirmDialog = false;
					this.showNoPassConfirmDialog = false;
					this.auditRemarks = '';
					this.$message.error('unexpected request failed.');
				});
		},

		// 跳转行业审核列表界面
		goHotleIndustryAudit: function () {
			this.$router.push({ name: 'hotelIndustryAudit' });
		},
	},
};
</script>
