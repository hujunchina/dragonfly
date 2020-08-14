<template>
	<div class="dubboToolContainer" v-loading.fullscreen.lock="fullscreenLoading">
		<el-row :gutter="20">
			<el-col :span="8">
				<el-input
					placeholder="请输入应用名称"
					v-model="appname"
					clearable
					class="input-with-select"
				>
					<template slot="prepend">
						应用名称
					</template>
					<el-button slot="append" icon="el-icon-search" @click="searchMethodConfig"></el-button>
				</el-input>
			</el-col>
			<el-col :span="8">
				<el-input
					placeholder="请输入方法名称"
					v-model="methodName"
					clearable
					class="input-with-select"
				>
					<template slot="prepend">
						方法名称
					</template>
					<el-button slot="append" icon="el-icon-search" @click="searchMethodConfig"></el-button>
				</el-input>
			</el-col>
		</el-row>

		<el-table :data="tableData" highlight-current-row v-loading="loading" style="width: 100%;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="名称">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="描述">
							<span>{{ props.row.desc }}</span>
						</el-form-item>
						<el-form-item label="应用名称">
							<span>{{ props.row.appname }}</span>
						</el-form-item>
						<el-form-item label="接口全路径">
							<span>{{ props.row.interfaceFullpath }}</span>
						</el-form-item>
						<el-form-item label="方法参数">
							<el-tag type="danger"
								>说明: 点击编辑按钮，更改其中参数来获取不同的结果，注意数据格式不要改动</el-tag
							>
							<el-button @click="handleEditClick(props.row)" type="primary" size="small"
								>编辑</el-button
							>
							<json-viewer :value="props.row.paramsJSON" :expand-depth="5"></json-viewer>
						</el-form-item>
						<el-form-item label="method">
							<span>{{ props.row.method }}</span>
							<div>
								<!-- <el-button @click="handleClick(props.row)" type="warning" size="small">调用</el-button> -->
								<el-popover placement="top" width="160" v-model="visiblepop">
									<p>接口调用需谨慎，生产环境需敬畏。</p>
									<div style="margin: 0; text-align: right;">
										<el-button size="mini" type="text" @click="visiblepop = false">取消</el-button>
										<el-button type="danger" size="mini" @click="handleClick(props.row)"
											>调用</el-button
										>
									</div>
									<el-button slot="reference" type="warning" size="small">调用</el-button>
								</el-popover>
							</div>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip prop="name" label="名称" width="150"></el-table-column>
			<el-table-column prop="desc" label="描述" show-overflow-tooltip width="120"></el-table-column>
			<el-table-column
				prop="appname"
				label="应用名称"
				show-overflow-tooltip
				width="120"
			></el-table-column>
			<el-table-column
				prop="interfaceFullpath"
				label="接口全路径"
				show-overflow-tooltip
				width="120"
			></el-table-column>
			<el-table-column
				prop="method"
				label="方法名"
				show-overflow-tooltip
				width="120"
			></el-table-column>
			<el-table-column
				prop="paramTypes"
				label="方法参数类型"
				show-overflow-tooltip
				width="120"
			></el-table-column>
			<el-table-column
				prop="params"
				label="请求参数"
				show-overflow-tooltip
				width="180"
			></el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			@current-change="handleCurrentChange"
			:page-count="totalPage"
		></el-pagination>

		<el-dialog title="请求参数" :visible.sync="dialogFormVisible">
			<div>
				<v-jsoneditor
					v-model="editorParam"
					:options="options"
					:plus="false"
					height="400px"
					@error="onError"
				></v-jsoneditor>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
			</div>
		</el-dialog>
		<div>
			<h3>结果：</h3>
			<json-viewer :value="resultData" :expand-depth="5" copyable boxed></json-viewer>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import JsonViewer from 'vue-json-viewer';
import VJsoneditor from 'v-jsoneditor';
Vue.use(VJsoneditor);
Vue.use(JsonViewer);
export default {
	name: 'SaasDubboTool',
	data() {
		return {
			totalPage: 0,
			currentPage: 1,
			limit: 5,
			appname: '',
			methodName: '',
			dialogFormVisible: false,
			loading: false,
			chooseRow: -1,
			options: {
				mode: 'code',
				search: true,
			},
			queryParam: null,
			tableData: [],
			resultData: [],
			editorParam: null,
			fullscreenLoading: false,
			visiblepop: false,
		};
	},
	// {"id":1,"name":"name","appname":"edge-gateway-proxy","desc":"desc","interfaceFullpath":"com.tuya.edgegateway.client.IDeviceService","method":"queryDevice","paramTypes":"[\"java.lang.String\"]","params":"[\"d5ec0ad3a22709e567kpvu\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":2,"name":"设备绑定","appname":"kunlun","desc":"设备绑定工具","interfaceFullpath":"com.tuya.kunlun.facade.tools.IDeviceToolsFacade","method":"bindDevices","paramTypes":"[\"java.util.List\",\"java.lang.String\"]","params":"[[\"d5ec0ad3a22709e567kpvu\"],\"d5ec0ad3a22709e567kpvu\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742}
	methods: {
		handleCurrentChange(val) {
			this.currentPage = val;
			this.loading = true;
			this.$http
				.get('/api/invokeconfig/list', {
					params: {
						methodName: this.methodName,
						appname: this.appname,
						offset: this.currentPage,
						limit: this.limit,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						const result = res.data.result;
						this.totalPage = result.pageSize;
						this.currentPage = 1;
						this.tableData = result.invokeConfigDTOList;
						for (const temp of this.tableData) {
							temp.paramsJSON = JSON.parse(temp.params);
						}
					}
				});
		},
		searchMethodConfig() {
			this.loading = true;
			this.$http
				.get('/api/invokeconfig/list', {
					params: {
						methodName: this.methodName,
						appname: this.appname,
						offset: this.currentPage,
						limit: this.limit,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						const result = res.data.result;
						this.totalPage = result.pageSize;
						this.currentPage = 1;
						this.tableData = result.invokeConfigDTOList;
						for (const temp of this.tableData) {
							temp.paramsJSON = JSON.parse(temp.params);
						}
					}
				});
			// let res = {"code":"100","msg":"执行成功","flag":true,"result":{"invokeConfigDTOList":[{"id":2,"name":"设备查询","appname":"edge-gateway-proxy","desc":"根据设备id查询设备信息","interfaceFullpath":"com.tuya.edgegateway.client.IDeviceService","method":"queryDevice","paramTypes":"[\"java.lang.String\"]","params":"[\"6cd9c939af127d811fisyp\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":6,"name":"房源迁移","appname":"kunlun","desc":"desc","interfaceFullpath":"com.tuya.kunlun.facade.open.spacetree.ITreeMigrationFacade","method":"migrationByProjectIds","paramTypes":"[\"com.tuya.kunlun.facade.domains.spacetree.TreeMigrationRequest\"]","params":"[\"d5ec0ad3a22709e567kpvu\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":10,"name":"设备绑定","appname":"kunlun","desc":"设备绑定小工具","interfaceFullpath":"com.tuya.kunlun.facade.tools.IDeviceToolsFacade","method":"bindDevices","paramTypes":"[\"java.util.List\",\"java.lang.String\"]","params":"[[\"6cf9dabed09555d97aefeo\",\"6cfa564d706624d8f7m4hc\",\"6cff1801526ca2c59dgymr\",\"6ce5f4cc8d239a27e2ildi\",\"6c39869573acb19311an4n\",\"6c316d2de93dd899e3dh0d\",\"6c9b5f6d247776f872ossh\",\"6cde592dd8ff694218klm0\",\"6cd41e3393c134d71f2m6b\"],\"6cd41e3393c134d71f2m6b\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":14,"name":"加密","appname":"kunlun","desc":"获取加密后的字段","interfaceFullpath":"com.tuya.kunlun.facade.internal.admin.IEncryptFacade","method":"encrypt","paramTypes":"[\"java.lang.String\"]","params":"[\"51644520\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":18,"name":"生成订正sql","appname":"kunlun","desc":"生成订正sql","interfaceFullpath":"com.tuya.kunlun.facade.internal.admin.IEncryptFacade","method":"getMobileEmailEncryptSql","paramTypes":"[\"java.lang.String\"]","params":"[\"1239828462756241408\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":22,"name":"获取用户的邮箱","appname":"kunlun","desc":"获取用户的邮箱,通过adminId","interfaceFullpath":"com.tuya.kunlun.facade.internal.admin.IEncryptFacade","method":"getEmail","paramTypes":"[\"java.lang.String\"]","params":"[\"2\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":26,"name":"获取用户的手机号","appname":"kunlun","desc":"获取用户的手机号,通过adminId","interfaceFullpath":"com.tuya.kunlun.facade.internal.admin.IEncryptFacade","method":"getMobile","paramTypes":"[\"java.lang.String\"]","params":"[\"1150941309331058688\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":30,"name":"用于订正adminProps的数据","appname":"kunlun","desc":"用于订正adminProps的数据","interfaceFullpath":"com.tuya.kunlun.facade.internal.admin.IEncryptFacade","method":"getAdminPropsEncryptSql","paramTypes":"[\"java.lang.String\"]","params":"[\"1242016624299569154\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742},{"id":34,"name":"根据uid或者adminId查询所有账号","appname":"kunlun","desc":"查询账号","interfaceFullpath":"com.tuya.kunlun.facade.open.admin.IAdminFacade","method":"getAdminResponseListByParentId","paramTypes":"[\"java.lang.String\",\"java.lang.String\"]","params":"[\"ay1565014201439ZgGJp\",\"Au5CZpIyraXP1541045YMLLNSZDCsY1\"]","status":1,"gmtCreate":0,"gmtModified":0},{"id":38,"name":"已激活网关查询","appname":"edge-gateway-proxy","desc":"已激活网关查询","interfaceFullpath":"com.tuya.edgegateway.client.IGatewayDeviceService","method":"gatewayOfType","paramTypes":"[\"java.lang.String\", \"java.lang.String\"]","params":"[\"1240105198093877248\",\"car_parking_fujica\"]","status":1,"gmtCreate":20200221054742,"gmtModified":20200221054742}],"pageCount":10,"pageSize":2,"current":1},"rows":0,"backendUrl":"","throwable":null};
			// let result = res.result;
			// this.totalPage = result.pageSize;
			// this.currentPage = 1;
			// this.tableData = result.invokeConfigDTOList;
			// for (let temp of this.tableData) {
			//     temp.paramsJSON = JSON.parse(temp.params);
			// }
		},
		handleClick(row) {
			this.chooseRow = row.id;
			this.visiblepop = false;
			this.fullscreenLoading = true;
			this.$http
				.get('/api/invoke/domethod', {
					params: {
						id: row.id,
						paramData: row.params,
					},
				})
				.then((res) => {
					this.fullscreenLoading = false;
					this.resultData = res.data;
				});
		},
		dialogConfirmClick() {
			this.dialogFormVisible = false;
			const now = this.chooseRow;
			for (const val of this.tableData) {
				if (val.id == now) {
					this.fullscreenLoading = true;
					val.params = JSON.stringify(this.editorParam);
					val.paramsJSON = this.editorParam;
					this.$http
						.get('/api/invoke/update', {
							params: {
								id: val.id,
								paramData: val.params,
							},
						})
						.then(() => {
							this.fullscreenLoading = false;
						});
				}
			}
		},
		sleepFunc(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		handleEditClick(row) {
			this.editorParam = JSON.parse(row.params);
			this.chooseRow = row.id;
			this.dialogFormVisible = true;
		},
		onError() {
			this.$message.error('错了哦，格式不正确..');
		},
	},
	created() {
		this.$http
			.get('/api/invokeconfig/list', {
				params: {
					methodName: this.methodName,
					appname: this.appname,
					offset: this.currentPage,
					limit: this.limit,
				},
			})
			.then((res) => {
				this.loading = false;
				if (res.data.result) {
					const result = res.data.result;
					this.totalPage = result.pageSize;
					this.currentPage = 1;
					this.tableData = result.invokeConfigDTOList;
					for (const temp of this.tableData) {
						temp.paramsJSON = JSON.parse(temp.params);
					}
				}
			});
	},
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
	font-size: 0;
}
.demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}
.demo-table-expand .el-form-item {
	width: 50%;
	margin-right: 0;
	margin-bottom: 0;
}
</style>
