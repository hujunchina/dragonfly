<style lang="scss" scoped>
.inputText {
	width: 180px;
	margin-left: 20px;
	text-overflow: ellipsis;
}

.el-select {
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #eff869;
}

#top {
	padding: 5px;
	overflow: hidden;
	background: #20a0ff;
}

.createTime {
	margin-bottom: 40px;
	margin-left: 20px;
}

.el-tag {
	margin-right: 20px;
	margin-left: 20px;
}

.mod-login-wrapper {
	margin-bottom: 20px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>

<template>
	<div class="container">
		<div>
			<el-input
				class="inputText"
				placeholder="请输入服务名"
				v-model="serviceName"
				clearable
			></el-input>
			<el-input class="inputText" placeholder="请输入版本号" v-model="version" clearable></el-input>
			<el-select class="inputText" placeholder="请输入服务状态" v-model="status" clearable>
				<el-option
					v-for="item in status_"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-input
				class="inputText"
				placeholder="请输入接口名称"
				v-model="serviceInf"
				clearable
			></el-input>
			<el-input
				class="inputText"
				placeholder="请输入方法名"
				v-model="serviceMtd"
				clearable
			></el-input>
			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
			>
				搜索
			</el-button>
			<el-button style="margin-left: 15px;" type="primary" plain @click="saasServiceInfo(val)"
				>新 增</el-button
			>
		</div>
		<br />
		<div>
			<div>
				<el-table
					class="mod-login-wrapper"
					ref="tableData"
					:data="tableData"
					border
					style="width: 100%;"
					:show-overflow-tooltip="true"
				>
					<el-table-column prop="id" width="66px" label="序号"></el-table-column>
					<el-table-column
						prop="serviceName"
						width="314px"
						label="服务名"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="version" width="66px" label="版本号"></el-table-column>
					<el-table-column prop="status" width="88px" label="服务状态">
						<template slot-scope="scope">
							<P v-if="scope.row.status == 1">启用</P>
							<P v-else-if="scope.row.status == 0">禁用</P>
							<P v-else-if="scope.row.status == -1">已下线</P>
						</template>
					</el-table-column>

					<el-table-column
						prop="serviceInf"
						label="接口名"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="serviceMtd"
						label="方法名"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="serviceRemark"
						label="接口说明"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="modifier"
						label="最后操作人"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="gmtModified"
						label="最后操作时间"
						:formatter="dateFormat"
						:show-overflow-tooltip="true"
					></el-table-column>

					<el-table-column fixed="right" prop="operate" label="操作">
						<template slot-scope="scope">
							<template>
								<el-button
									type="text"
									@click="upService(scope.row)"
									v-has="'/saasService/upService'"
								>
									上线
								</el-button>
							</template>
							<template>
								<el-button
									type="text"
									@click="downService(scope.row)"
									v-has="'/saasService/downService'"
								>
									下线
								</el-button>
							</template>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div class="bottom-page" align="center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
				></el-pagination>
			</div>
		</div>

		<!-- 新增 SaaS服务的弹窗 -->
		<el-dialog :title="createTitle" :visible.sync="showDialog" center>
			<el-form :model="saasServiceForm" :rules="rules" ref="saasServiceForm" label-width="193px">
				<el-form-item label="服务名" prop="serviceName">
					<el-input
						v-model="saasServiceForm.serviceName"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="版本号" prop="version">
					<el-input
						v-model="saasServiceForm.version"
						placeholder="1.0/2.0"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="接口名称" prop="serviceInf">
					<el-input
						v-model="saasServiceForm.serviceInf"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="方法名" prop="serviceMtd">
					<el-input
						v-model="saasServiceForm.serviceMtd"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item label="接口说明" prop="serviceInf">
					<el-input
						v-model="saasServiceForm.serviceRemark"
						style="width: 360px; margin-left: 20px;"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showDialog = false" style="margin-left: 20px;">取 消</el-button>
					<el-button type="primary" @click="commitCURD()" :loading="commitLoading">发 布</el-button>
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
			id: '',
			serviceName: null, // 服务名
			version: null, // 版本号
			serviceInf: null, // 接口名
			serviceMtd: null, // 接口方法
			status: null, // 服务状态

			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			showDialog: false, // 编辑和新增项目
			commitLoading: false, // 保存和确定编辑
			createTitle: '',

			// 状态
			status_: [
				{ value: '1', label: '启用' },
				{ value: '0', label: '禁用' },
				{ value: '-1', label: '已下线' },
			],

			// 新增saas服务的表格
			saasServiceForm: {
				id: '',
				serviceId: '',
				serviceName: '', // 服务名
				version: '', // 版本号
				serviceInf: '', // 接口名
				serviceMtd: '', // 接口方法
				serviceRemark: '', // 接口说明
				status: '',
				modifier: '',
				gmtModified: '',
			},

			rules: {
				serviceName: [
					{ required: true, message: '服务名不能为空，请输入...', trigger: 'blur' },
					{ min: 1, message: '不能为空', trigger: 'blur' },
				],
				version: [
					{ required: true, message: '版本号不能为空，请输入...', trigger: 'blur' },
					{ min: 1, message: '不能为空', trigger: 'blur' },
				],
				serviceInf: [
					{ required: true, message: '接口名不能为空，请输入...', trigger: 'blur' },
					{ min: 1, message: '不能为空', trigger: 'blur' },
				],
				serviceMtd: [
					{ required: true, message: '接口方法不能为空，请输入...', trigger: 'blur' },
					{ min: 1, message: '不能为空', trigger: 'blur' },
				],
				serviceRemark: [
					{ required: true, message: '接口说明不能为空，请输入...', trigger: 'blur' },
				],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {
		this.loadData();
	},

	methods: {
		// 时间戳转换日期
		dateFormat: function (row, column) {
			const date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},

		// 点击行响应
		handleclick: function (row) {
			this.highlightId = row.id;
		},

		// 改变当前点击的行的class，高亮当前行
		tableRowClassName: function (row) {
			if (row.id == this.highlightId) {
				return 'info-row';
			}
		},

		// 每页显示数据量变更
		handleSizeChange: function (val) {
			this.pageSize = val;
			this.loadData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadData();
		},

		// 显示支付配置列表数据(未搜索时)
		loadData: function () {
			this.$http
				.post('/api/saasService/serviceList', {
					serviceName: this.serviceName || null,
					version: this.version || null,
					status: this.status || null,
					serviceInf: this.serviceInf || null,
					serviceMtd: this.serviceMtd || null,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						if (res.data.result.data === null) {
							this.tableData = res.data.result.data;
						} else {
							this.tableData = res.data.result.data;
							for (let i = 0; i < this.tableData.length; i++) {
								this.tableData[i].id = this.pageSize * (this.currentPage - 1) + (i + 1);
							}
						}
						this.totalCount = res.data.result.pageInfo.recordsCount;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		search: function () {
			this.currentPage = 1;
			this.loadData();
		},

		// 提交按钮，新增
		commitCURD: function () {
			this.$http
				.post('/api/saasService/addService', this.saasServiceForm)
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('操作成功');
						this.showDialog = false;
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						this.showDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.showDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 展示编辑弹窗
		saasServiceInfo(saasService) {
			if (saasService === undefined || saasService === '') {
				this.saasServiceForm = {};
				this.showDialog = true;
			} else {
				this.showDialog = true;
				this.saasServiceForm = JSON.parse(JSON.stringify(saasService));
			}
		},

		// 上线服务
		upService(saasService) {
			if (saasService.status == 0 || saasService.status == -1) {
				saasService.status = 1;
			}
			this.$http
				.post('/api/saasService/upService', {
					serviceId: saasService.serviceId,
					status: saasService.status,
				})
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('上线成功');
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 下线服务
		downService(saasService) {
			if (saasService.status == 1) {
				saasService.status = -1;
			}
			this.$http
				.post('/api/saasService/downService', {
					serviceId: saasService.serviceId,
					status: saasService.status,
				})
				.then((r) => {
					this.commitLoading = false;
					if (r.data.code == 100) {
						this.loadData();
						this.$message.success('下线成功');
					} else {
						this.$message.error(r.data.msg ? r.data.msg : 'request failed.');
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.$message.error('unexpected request failed.');
				});
		},
	},
};
</script>
