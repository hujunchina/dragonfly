<style lang="scss" scoped>
.el-date-editor--datetimerange.el-input__inner {
	width: 90%;
}

.el-select {
	width: 90%;
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #eff869;
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
		<el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="自定义域名管理" name="customizeDomainManage">
				<div>
					<el-form label-width="20%">
						<el-row>
							<el-col :span="8">
								<el-form-item label="H5客控id:">
									<el-input
										class="inputText"
										placeholder="请输入H5客控id"
										v-model="appId"
										clearable
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="域名:">
									<el-input
										class="inputText"
										placeholder="请输入域名"
										v-model="domain"
										clearable
									></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="审核状态:">
									<el-select v-model="auditStatus" placeholder="请选择审核状态">
										<el-option
											v-for="item in auditStatusOptions"
											:key="item.value"
											:label="item.label"
											:value="item.value"
										></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<br />
						<el-row>
							<el-col :span="4" :offset="18">
								<el-button
									class="searchButton"
									type="primary"
									icon="el-icon-search"
									style="margin-left: 10px;"
									@click="search()"
								>
									搜索
								</el-button>
								<el-button style="margin-left: 15px;" type="primary" plain @click="reset()"
									>重置</el-button
								>
							</el-col>
						</el-row>
					</el-form>
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
							<el-table-column width="40" prop="id" label="id" :v-show="false"></el-table-column>
							<el-table-column
								width="180"
								prop="appId"
								label="H5客控Id"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								width="180"
								prop="name"
								label="H5客控名称"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								width="200"
								prop="domain"
								label="域名"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column width="150" prop="domainPem" label="自定义域名pem文件">
								<template slot-scope="scope">
									<el-link
										target="_blank"
										:href="scope.row.domainPem"
										:underline="false"
										style="margin-left: 15px;"
										download
									>
										<el-button size="mini" type="primary" style="margin-right: 5px;"
											>点击下载</el-button
										>
									</el-link>
								</template>
							</el-table-column>
							<el-table-column width="150" prop="domainKey" label="自定义域名key文件">
								<template slot-scope="scope">
									<el-link
										target="_blank"
										:href="scope.row.domainKey"
										:underline="false"
										style="margin-left: 15px;"
										download
									>
										<el-button size="mini" type="primary" style="margin-right: 5px;"
											>点击下载</el-button
										>
									</el-link>
								</template>
							</el-table-column>
							<el-table-column prop="auditStatus" label="自定义域名状态">
								<template slot-scope="scope">
									<span>
										{{
											scope.row.auditStatus === '0'
												? '审核失败'
												: scope.row.auditStatus === '1'
												? '审核成功'
												: '审核中'
										}}
									</span>
								</template>
							</el-table-column>
							<el-table-column fixed="right" prop="operate" width="150px" label="操作">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										@click="modifyHotelWebAppDomain(scope.row.id)"
										style="margin-right: 5px;"
									>
										审核
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="bottom-page" align="center">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[10, 20, 30, 40, 50]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
						></el-pagination>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="公版域名管理" name="webAppBasicManage">
				<div>
					<el-form label-width="20%">
						<el-row>
							<el-col :span="2">
								<el-button type="success" style="margin-left: 15px;" @click="addBasicWebApp()"
									>新增</el-button
								>
							</el-col>
						</el-row>
					</el-form>
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
							<el-table-column
								prop="appId"
								label="公版H5客控id"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="name"
								label="公版H5客控名称"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="domain"
								label="域名"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column fixed="right" prop="operate" width="200px" label="操作">
								<template slot-scope="scope">
									<el-button
										size="mini"
										type="primary"
										@click="modifyBasicWebApp(scope.row.appId)"
										style="margin-right: 5px;"
									>
										编辑
									</el-button>
									<el-button
										size="mini"
										type="danger"
										@click="deleteBasicWebApp(scope.row)"
										style="margin-right: 5px;"
									>
										删除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeName: 'customizeDomainManage',

			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1, // 页码
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '', // 提示

			appId: '', // 搜索条件:h5客控id
			domain: '', // 搜索条件:h5自定义域名
			auditStatus: '', // 搜索条件:审核状态

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
	created() {
		this.loadCustomizeDomainData();
	},

	methods: {
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

		handleClick(tab) {
			if (tab.name == 'webAppBasicManage') {
				this.loadWebAppBasicData();
			} else if (tab.name == 'customizeDomainManage') {
				this.loadCustomizeDomainData();
			}
		},

		// 自定义域名方法

		// 加载自定义域名列表
		loadCustomizeDomainData: function () {
			this.$http
				.post('/api/hotel/web-app/domain/page', {
					appId: this.appId,
					domain: this.domain,
					domainPem: this.domainPem,
					domainKey: this.domainKey,
					auditStatus: this.auditStatus,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.tableData = res.data.result.data;
						this.totalCount = res.data.result.total;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		// 改变当前点击的行的class，高亮当前行
		// eslint-disable-next-line no-dupe-keys
		tableRowClassName: function (row) {
			if (row.appId == this.highlightId) {
				return 'info-row';
			}
		},

		// 每页显示数据量变更
		handleSizeChange: function (val) {
			this.pageSize = val;
			this.loadCustomizeDomainData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadCustomizeDomainData();
		},

		search: function () {
			this.currentPage = 1;
			this.loadCustomizeDomainData();
		},

		reset: function () {
			this.appId = '';
			this.domain = '';
			this.auditStatus = '';
		},

		// 公版客控方法

		// 加载公版客控列表
		loadWebAppBasicData: function () {
			this.$http
				.post('/api/hotel/web-app/page', {
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.tableData = res.data.result.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		// 跳转自定义域名信息编辑界面
		modifyHotelWebAppDomain: function (id) {
			this.$router.push({ name: 'hotelWebAppDomainModify', query: { id: id } });
		},

		// 跳转公版信息新增界面
		addBasicWebApp: function () {
			this.$router.push({ name: 'webAppBasicModify' });
		},

		// 删除公版h5信息
		deleteBasicWebApp: function (webAppInfo) {
			this.$confirm('是否确认删除' + webAppInfo.name, {
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				type: 'warning',
				center: true,
			})
				.then(() => {
					this.$http
						.delete('/api/hotel/web-app?id=' + webAppInfo.appId)
						.then((res) => {
							this.commitLoading = false;
							if (res.data.code == 100 && res.data.result == true) {
								this.$message.success('删除成功');
								this.loadWebAppBasicData();
							} else {
								this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
							}
							return;
						})
						.catch(() => {
							this.$message.error('unexpected request failed.');
						});
				})
				.catch(() => {
					/**
					 * 点击了取消按钮
					 */
				});
		},

		// 跳转自定义域名信息编辑界面
		modifyBasicWebApp: function (id) {
			this.$router.push({ name: 'webAppBasicModify', query: { id: id } });
		},
	},
};
</script>
