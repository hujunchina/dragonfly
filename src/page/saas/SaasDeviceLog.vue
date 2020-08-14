<template>
	<div>
		<el-tag type="success">第一步获取日志：</el-tag>
		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
			<el-form-item label="日志时间段" prop="piketime">
				<el-date-picker
					v-model="form.piketime"
					type="datetimerange"
					format="yyyy-MM-dd HH"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="网关id" prop="gatewayId">
				<el-input v-model="form.gatewayId"></el-input>
			</el-form-item>
			<el-form-item label="uid" prop="uid">
				<el-input v-model="form.uid"></el-input>
			</el-form-item>
			<el-form-item label="日志类型" prop="type">
				<el-radio-group v-model="form.type">
					<el-radio label="info">info</el-radio>
					<el-radio label="warn">warn</el-radio>
					<el-radio label="error">error</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">立即获取</el-button>
			</el-form-item>
		</el-form>
		<div>
			<el-card class="box-card">
				<div>gatewayId: {{ gatewayId }}</div>
				<div>sn: {{ sn }}</div>
			</el-card>
		</div>
		<el-divider></el-divider>
		<el-tag type="success">第二步获取结果：</el-tag>
		<div>
			<div class="input-suffix">
				<div class="input-margin"></div>
				<el-input placeholder="网关id: " v-model="gatewayId" clearable> </el-input>
				<div class="input-margin"></div>
				<el-input placeholder="指令sn: " clearable v-model="sn"> </el-input>
			</div>
			<div class="input-margin"></div>
			<div class="logTable">
				<el-table v-loading="loading" :data="tableData" border style="width: 100%;">
					<el-table-column fixed prop="date" label="日志时间" show-overflow-tooltip width="200">
					</el-table-column>
					<el-table-column prop="sn" label="sn" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="gatewayId" label="网关id" show-overflow-tooltip width="120">
					</el-table-column>
					<el-table-column prop="downloadUrl" label="下载地址" show-overflow-tooltip width="130">
					</el-table-column>
					<el-table-column prop="status" label="status" show-overflow-tooltip width="80">
					</el-table-column>
					<el-table-column prop="msg" label="msg" show-overflow-tooltip width="80">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="downloadCodeImg(scope.row)" type="text" size="small"
								>下载</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="input-margin"></div>
			<el-pagination
				background
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				:page-count="totalPage"
			></el-pagination>
			<el-button type="primary" :loading="false" @click="queryLogResult">查看结果</el-button>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
export default {
	data() {
		return {
			form: {
				piketime: [new Date(), new Date()],
				gatewayId: '',
				uid: 'uid1234',
				type: 'info',
			},
			rules: {
				gatewayId: [{ required: true, message: '请输入gatewayId', trigger: 'blur' }],
				uid: [{ required: true, message: '请输入uid', trigger: 'blur' }],
			},
			gatewayId: '',
			sn: '',
			tableData: [],
			loading: false,
			totalPage: 0,
			currentPage: 1,
			limit: 10,
		};
		// [{
		//         "sn": "sn",
		//         "gatewayId": "gatewayId",
		//         "date": "2019-02-02 1 - 4",
		//         "msg": "msg",
		//         "status": 1,
		//         "downloadUrl": "qweqwewqeqweqweqwewqeqwewqeqweqweqwe"
		//     }]
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$message({
						message: '日志获取请求已发出',
						type: 'success',
					});
				} else {
					return false;
				}
			});

			if (this.form.gatewayId == '' || this.form.gatewayId == null) {
				return;
			}
			var yearMonthDayParam = moment(this.form.piketime[0]).format('YYYY-MM-DD');
			var beginHourParam = moment(this.form.piketime[0]).format('H');
			var endHourParam = moment(this.form.piketime[1]).format('H');

			this.$http
				.post('/api/saas/devicemanage/devicelog/cmd', {
					uid: this.form.uid || null,
					yearMonthDay: yearMonthDayParam || null,
					beginHour: beginHourParam || null,
					endHour: endHourParam || null,
					gatewayId: this.form.gatewayId || null,
					type: this.form.type || 'info',
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.logUploadRes = res.data.result.data;
					}
				});
		},
		queryLogResult() {
			if ((this.sn == null || this.sn == '') && (this.gatewayId == null || this.gatewayId == '')) {
				this.$message({
					message: '请至少输入gatewayId 或 sn',
					type: 'error',
				});
				return;
			}
			this.loading = true;
			this.$http
				.post('/api/saas/devicemanage/devicelog/list', {
					gatewayId: this.gatewayId || null,
					sn: this.sn || null,
					pageIndex: this.currentPage,
					limit: this.limit,
				})
				.then((res) => {
					this.loading = false;
					if (res.data.code == 100) {
						var data = res.data.result.data;
						this.tableData = [];
						this.totalPage = this.calcPageSize(this.limit, data.total);
						data.content.forEach((item) => {
							var status = this.formatStatus(item);
							this.tableData.push({
								sn: item.sn + '',
								gatewayId: item.gatewayId,
								date: item.timeBegin + ' & ' + item.timeEnd,
								msg: item.msg,
								status: status,
								downloadUrl: item.downloadUrl,
								fileName: item.fileName,
							});
						});
					}
				});
		},
		calcPageSize(limit, total) {
			if (limit == 0) {
				return 10;
			}
			return Math.ceil(total / limit);
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.loading = true;
			this.$http
				.post('/api/saas/devicemanage/devicelog/list', {
					gatewayId: this.gatewayId || null,
					sn: this.sn || null,
					pageIndex: this.currentPage,
					limit: this.limit,
				})
				.then((res) => {
					this.loading = false;
					if (res.data.code == 100) {
						var data = res.data.result.data;
						this.tableData = [];
						this.totalPage = this.calcPageSize(this.limit, data.total);
						data.content.forEach((item) => {
							var status = this.formatStatus(item);
							this.tableData.push({
								sn: item.sn + '',
								gatewayId: item.gatewayId,
								date: item.timeBegin + '-' + item.timeEnd,
								msg: item.msg,
								status: status,
								downloadUrl: item.downloadUrl,
								fileName: item.fileName,
							});
						});
					}
				});
		},
		downloadCodeImg(row) {
			var a = document.createElement('a');
			a.download = row.fileName || 'gatewaylog'; // 设置图片地址
			a.href = row.downloadUrl;
			a.click();
		},
		formatStatus(status) {
			if (status == 0) {
				return '删除';
			} else if (status == 1) {
				return '发送失败';
			} else if (status == 2) {
				return '发送成功';
			} else if (status == 3) {
				return '响应失败';
			} else if (status == 4) {
				return '响应成功';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.input-margin {
	margin: 10px 0 0 0;
}
.logTable {
	width: 90%;
}
</style>
