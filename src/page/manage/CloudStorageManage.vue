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
<style>
.app {
	position: relative;
	right: 50px;
	left: 50px;
	font-size: 25px;
}
</style>
<template>
	<div class="container">
		<br />
		<div>
			<span style="color: green; font-size: 15px;">产品id:</span>
			<el-input
				type="text"
				v-model="productId"
				style="width: 190px;"
				:show-overflow-tooltip="true"
				disabled
			></el-input>
			<span style="margin-left: 11px; color: green; font-size: 15px;">产品名称:</span>
			<el-input type="text" v-model="productName" style="width: 270px;" disabled></el-input>
			<br />
			<br />
			<el-select v-model="zone" placeholder="中国区" @change="loadData" style="margin-left: 0;">
				<el-option
					v-for="item in regions"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<!-- 新增服务类型下拉框 -->
			<el-select v-model="serveType" @change="loadData" clearable>
				<el-option
					v-for="item in serveTypes"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-button
				class="addButton"
				style="margin-left: 15px;"
				type="primary"
				plain
				@click="showCommodityInfo(obj)"
				v-if="region == 'AY' || region == 'SH'"
				>新 增
			</el-button>
			<el-button
				class="batchAddButton"
				style="margin-left: 15px;"
				type="primary"
				plain
				@click="batchAddCommodity()"
				v-if="region == 'AY' || region == 'SH'"
				>一键批量增加商品
			</el-button>
		</div>
		<br />
		<div>
			<div>
				<el-table
					v-loading="loading"
					element-loading-text="正在为您加载数据..."
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0.5, 0.5, 0.5, 0.6)"
					class="mod-login-wrapper"
					ref="tableData"
					:data="tableData"
					border
					style="width: 100%;"
					:show-overflow-tooltip="true"
				>
					<el-table-column prop="tid" width="79px" label="序号"></el-table-column>
					<el-table-column
						prop="commodityCode"
						label="商品code"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="commodityName"
						label="商品名称"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column
						prop="rootCommodityCode"
						label="绑定业务"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="unitQuantity" label="服务时效"></el-table-column>
					<el-table-column prop="zone" label="区域"></el-table-column>
					<el-table-column
						prop="unitPrice"
						label="终端售价(现价)"
						:show-overflow-tooltip="true"
					></el-table-column>
					<el-table-column prop="cost" label="客户承包价"></el-table-column>
					<el-table-column prop="supportBuyOnce" label="是否为体验商品"></el-table-column>
					<el-table-column prop="serveType" label="商品服务类型"></el-table-column>
					<el-table-column prop="displayClientStatus" label="状态"></el-table-column>
					<el-table-column fixed="right" prop="operate" label="操作" width="200">
						<template slot-scope="scope">
							<el-button
								:loading="scope.row.loading"
								type="primary"
								href="javaScript:;"
								@click="showCommodityInfo(scope.row)"
								plain
								v-if="region == 'AY' || region == 'SH'"
								>编辑
							</el-button>
							<el-button
								v-if="
									scope.row.displayClientStatus == '已下线' && (region == 'AY' || region == 'SH')
								"
								type="primary"
								target="_blank"
								href="javaScript:;"
								plain
								@click="enableButton(scope.row)"
								:loading="scope.row.loading1"
								>启用
							</el-button>
							<el-button
								v-if="
									scope.row.displayClientStatus == '使用中' && (region == 'AY' || region == 'SH')
								"
								target="_blank"
								href="javaScript:;"
								type="primary"
								plain
								@click="enableButton(scope.row)"
								:loading="scope.row.loading1"
								>下线
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
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
				></el-pagination>
			</div>
		</div>
		<!-- 新增的弹框展示 -->
		<el-dialog :title="createTitle" :visible.sync="createDialog" center>
			<el-form :model="commodityInfo" :rules="rules" ref="commodityInfo" label-width="183px">
				<!-- 如果是新增商品，则对应产品id；如果是编辑按钮，对应的则是商品code，对商品进行编辑 -->
				<el-form-item v-if="show" label="产品id" prop="productId">
					<el-input v-model="commodityInfo.productId" disabled></el-input>
				</el-form-item>
				<el-form-item v-else label="商品code" prop="commodityCode">
					<el-input v-model="commodityInfo.commodityCode" disabled></el-input>
				</el-form-item>
				<el-form-item label="商品中文名称" prop="commodityName">
					<el-input v-model="commodityInfo.commodityName"></el-input>
				</el-form-item>
				<el-form-item label="商品中文描述" prop="commodityDescCn">
					<el-input v-model="commodityInfo.commodityDescCn"></el-input>
				</el-form-item>
				<el-form-item label="商品英文名称" prop="commodityNameEn">
					<el-input v-model="commodityInfo.commodityNameEn"></el-input>
				</el-form-item>
				<el-form-item label="商品英文描述" prop="commodityDescEn">
					<el-input v-model="commodityInfo.commodityDescEn"></el-input>
				</el-form-item>
				<el-form-item label="绑定业务" prop="rootCommodityCode">
					<el-select v-model="commodityInfo.rootCommodityCode" style="margin-left: 0;">
						<el-option
							v-for="item in bindServiceEnums"
							:key="item.value"
							:value="item.value"
							:label="item.label"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="体验商品" prop="supportBuyOnce">
					<!--<el-input v-model="commodityInfo.supportBuyOnce" type="number"></el-input>-->
					<el-checkbox v-model="commodityInfo.supportBuyOnce"></el-checkbox>
				</el-form-item>
				<el-form-item label="订阅时效" prop="unitQuantity">
					<el-input v-model="commodityInfo.unitQuantity" type="number"></el-input>
				</el-form-item>
				<el-form-item label="商品成本(客户承包价)" prop="cost">
					<el-input v-model="commodityInfo.cost" type="number"></el-input>
				</el-form-item>
				<el-form-item label="关联支付信息配置" prop="payCode">
					<el-select
						v-model="commodityInfo.payCode"
						style="margin-left: 0;"
						placeholder="涂鸦默认支付"
					>
						<el-option
							v-for="item in payList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<!-- 规格配置的表格 -->
				<el-form-item label="货币/单价" prop="specificationList">
					<div v-for="(i, index) in commodityInfo.specificationList" :key="index">
						<span prop="currency" style="margin-right: 0; color: green;">
							币种
							<el-select v-model="i.currency" style="width: 119px; margin-left: 0;">
								<el-option
									v-for="item in currencys"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</span>
						<span prop="unitCostPrice" style="color: green;">
							原价
							<el-input v-model="i.unitCostPrice" style="width: 79px;" type="number"></el-input>
						</span>
						<span prop="unitPrice" style="color: green;">
							现价(终端售价)
							<el-input v-model="i.unitPrice" style="width: 79px;" type="number"></el-input>
						</span>
						<!-- <a target="_blank" href="javaScript:;" @click="removeSpec($index)">删除</a> -->
					</div>
					<el-form-item>
						<a target="_blank" href="javaScript:;" @click="addSpec()">添加</a>
					</el-form-item>
				</el-form-item>
				<el-form-item label="备注" prop="remark">
					<el-input v-model="commodityInfo.remark"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="createDialog = false">取 消</el-button>
					<!-- 如果是添加执行add，编辑执行edit -->
					<el-button
						v-if="show"
						type="primary"
						@click="commitAddCommodity()"
						:loading="commitLoading"
						rules
						>保 存
					</el-button>
					<el-button
						v-else
						type="primary"
						@click="commitEditCommodity()"
						:loading="commitLoading"
						rules
						>保 存
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tid: '',
			productId: '',
			productName: '',
			commodityCode: '',
			commodityName: '',
			clientStatus: '',
			displayClientStatus: '',
			rootCommodityCode: '',
			serveType: '',
			obj: '', // 当前数据
			show: true,
			tableData: [],
			createForm: [],
			bindServiceEnums: [], // 绑定业务的枚举
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNo: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			createDialog: false,
			commitLoading: false, // 保存和确定编辑
			createTitle: '',
			editTitle: '',
			loading: true,
			loading1: true,
			index: '',
			dataLoading: true,
			flag: true,
			zone: 'AY',

			region: '',
			payCode: 'ra9tUkLgf8wtcH6i-06713wTn',
			regions: [
				{
					value: 'AY',
					label: '中国区',
				},
				{
					value: 'EU',
					label: '欧洲区',
				},
				{
					value: 'AZ',
					label: '美国区',
				},
				{
					value: 'IN',
					label: '印度区',
				},
			],

			currencys: [
				{
					value: 'CNY',
					label: '人民币',
				},
				{
					value: 'USD',
					label: '美元',
				},
				{
					value: 'GBP',
					label: '英镑',
				},
				{
					value: 'RUB',
					label: '卢布',
				},
				{
					value: 'BRL',
					label: '巴西雷亚尔',
				},
			],

			// 关联支付配置信息
			payList: [
				{
					value: 'ra9tUkLgf8wtcH6i-06713wTn',
					label: '涂鸦默认支付',
				},
			],

			// 商品服务类型
			serveTypes: [
				{
					value: 'cloud_storage',
					label: '视频云存储服务',
				},
				{
					value: 'ai_vision',
					label: 'AI智能侦测服务',
				},
			],

			// 规格参数表
			specificationList: [
				{
					id: '',
					currency: '',
					unitCostPrice: '',
					unitPrice: '',
				},
			],

			// 商品信息
			commodityInfo: {
				productId: '', // 产品id
				productName: '',
				commodityCode: '', // 商品code
				commodityName: '', // 列表展示的商品名称
				// commodityNameCn: "", //商品中文名称
				commodityDescCn: '', // 商品中文描述
				commodityNameEn: '', // 商品英文名称
				commodityDescEn: '', // 商品英文描述
				rootCommodityCode: '', // 绑定业务
				cost: '', // 商品成本
				payCode: '', // 关联支付信息配置
				zone: '', // 区域===中国区、美国区、欧洲区
				specificationList: [],
				unitQuantity: '', // 订阅时效
				supportBuyOnce: '', // 是否是体验商品
				remark: '', // 备注
				clientStatus: '',
				displayClientStatus: '',
				instanceType: '',
				serveType: '',
			},

			rules: {
				commodityName: [{ required: true, message: '商品中文名称不能为空', trigger: 'blur' }],
				commodityDescCn: [{ required: true, message: '商品中文描述不能为空', trigger: 'blur' }],
				rootCommodityCode: [{ required: true, message: '绑定业务不能为空', trigger: 'change' }],
				unitQuantity: [{ required: true, message: '订阅时效不能为空', trigger: 'blur' }],
				cost: [{ required: true, message: '商品成本不能为空', trigger: 'blur' }],
				currency: [{ required: true, message: '币种不能为空', trigger: 'blur' }],
				unitCostPrice: [{ required: true, message: '原价不能为空', trigger: 'change' }],
				unitPrice: [{ required: true, message: '现价不能为空', trigger: 'change' }],
			},
		};
	},

	// 页面加载时直接返回所有的数据
	created() {
		this.$message.warning(
			'如需查询产品，请在地址栏加上后缀  ?productId=xxx ，xxx是您要查询的产品id！',
		);
		this.loadData();
		this.toAddCommodity();
	},
	mounted() {
		this.getRegion();
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

		// 添加商品规格
		addSpec: function () {
			this.commodityInfo.specificationList.push({
				id: '',
				currency: '',
				unitCostPrice: '',
				unitPrice: '',
			});
		},

		// 删除
		removeSpec: function (index) {
			this.commodityInfo.specificationList.splice(index, 1);
		},

		// 搜索
		search: function () {
			this.currentPage = 1;
			this.loadData();
		},

		// 先通过接口得到当前区域
		getRegion: function () {
			this.$http.post('api/product/cloudstorage/getRegion', {}).then((res) => {
				if (res.data.region == 'AY' || res.data.region == 'SH') {
					this.region = res.data.region;
				} else if (res.date.region == '') {
					this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
					return;
				}
			});
		},

		// 当前情况下，只能先自己配好产品id，然后在已知条件下进行商品的增加和编辑
		// 在点击云存储配置后，根据当前的产品id和区域进行商品列表的查询
		loadData: function () {
			this.loading = true; // 加载圈
			if (this.$route.query.productId === undefined) {
				// this.productId = this.productId;
			} else {
				let productId = this.$route.query.productId;
				this.productId = productId;
			}
			this.$http
				.post('/api/product/cloudstorage/commodityList', {
					productId: this.productId,
					zone: this.zone,
					serveType: this.serveType,
					commodityCode: this.commodityCode,
					pageNo: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.loading = false; // 加载
						if (res.data.result.commodityModelList === null) {
							this.tableData = res.data.result.commodityModelList;
						} else {
							res.data.result.commodityModelList.forEach((commodity) => {
								commodity.loading = false;
								commodity.loading1 = false;
							});
							this.tableData = res.data.result.commodityModelList;
							if (this.flag && this.zone == 'AY') {
								this.productName = res.data.result.productName;
								this.flag = false;
							}

							for (let i = 0; i < this.tableData.length; i++) {
								// 排序依次显示
								this.tableData[i].tid = this.pageSize * (this.currentPage - 1) + (i + 1);
								if (this.tableData[i].supportBuyOnce) {
									this.tableData[i].supportBuyOnce = '是';
								} else {
									this.tableData[i].supportBuyOnce = '否';
								}
								if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_1day_event') {
									this.tableData[i].rootCommodityCode = '1天事件录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_1day_all') {
									this.tableData[i].rootCommodityCode = '1天连续录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_7day_event') {
									this.tableData[i].rootCommodityCode = '7天事件录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_7day_all') {
									this.tableData[i].rootCommodityCode = '7天连续录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_14day_event') {
									this.tableData[i].rootCommodityCode = '14天事件录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_14day_all') {
									this.tableData[i].rootCommodityCode = '14天连续录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_30day_event') {
									this.tableData[i].rootCommodityCode = '30天事件录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_store_30day_all') {
									this.tableData[i].rootCommodityCode = '30天连续录像';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_ai_7day_event') {
									this.tableData[i].rootCommodityCode = '7天事件人体检测';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_ai_7day_all') {
									this.tableData[i].rootCommodityCode = '7天全时段人体检测';
								} else if (this.tableData[i].rootCommodityCode == 'tuya_camera_ai_body_detection') {
									this.tableData[i].rootCommodityCode = '人体检测服务';
								} else if (
									this.tableData[i].rootCommodityCode == 'tuya_camera_ai_face_recognition'
								) {
									this.tableData[i].rootCommodityCode = '人脸识别服务';
								}
							}
							// 终端售价的展示，根据具体的区域显示具体的币种规格
							for (let i = 0; i < this.tableData.length; i++) {
								for (let j = 0; j < this.tableData[i].specificationModelList.length; j++) {
									if (
										this.zone == 'AY' &&
										this.tableData[i].specificationModelList[j].currency == 'CNY'
									) {
										this.tableData[i].unitPrice =
											res.data.result.commodityModelList[i].specificationModelList[j].unitPrice;
										break;
									} else if (
										this.zone == 'AZ' &&
										this.tableData[i].specificationModelList[j].currency == 'USD'
									) {
										this.tableData[i].unitPrice =
											res.data.result.commodityModelList[i].specificationModelList[j].unitPrice;
										break;
									} else if (
										this.zone == 'EU' &&
										this.tableData[i].specificationModelList[j].currency == 'USD'
									) {
										this.tableData[i].unitPrice =
											res.data.result.commodityModelList[i].specificationModelList[j].unitPrice;
										break;
									} else if (
										this.zone == 'IN' &&
										this.tableData[i].specificationModelList[j].currency == 'USD'
									) {
										this.tableData[i].unitPrice =
											res.data.result.commodityModelList[i].specificationModelList[j].unitPrice;
										break;
									} else {
										this.tableData[i].unitPrice = '该区未设置对应规格';
									}
								}
							}
						}
						this.totalCount = res.data.result.total;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		// 在点击新增按钮的时候，先进行查询，得到对应的产品id、绑定业务、支付配置、（币种：由前端下拉框直接获取就可以）
		toAddCommodity: function () {
			this.$http
				.post('/api/product/cloudstorage/toAddCommodity', {
					productId: this.productId,
					zone: this.zone,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.commodityModelList = res.data.result.commodityModelList;
						this.bindServiceEnums = res.data.result.bindServiceEnums.bindServiceEnums;
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
						return;
					}
				})
				.catch(() => {
					this.createDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 在点击编辑按钮的时候，先获取当前商品的信息，支付配置、商品信息、产品id、商品英文名称、商品英文描述、绑定业务
		toEditCommodity: function (obj) {
			this.commodityCode = obj.commodityCode;
			obj.loading = true;
			this.$http
				.post('/api/product/cloudstorage/toEditCommodity', {
					commodityCode: this.commodityCode,
					productId: this.productId,
					zone: this.zone,
				})
				.then((res) => {
					obj.loading = false;
					if (res.data.code == 100) {
						this.commodityInfo.commodityName = res.data.result.commodityName;
						this.commodityInfo.commodityDescCn = res.data.result.commodityDescCn;
						this.commodityInfo.commodityNameEn = res.data.result.commodityNameEn;
						this.commodityInfo.commodityDescEn = res.data.result.commodityDescEn;

						this.commodityInfo.rootCommodityCode = obj.rootCommodityCode;
						this.commodityInfo.commodityCode = obj.commodityCode;
						this.commodityInfo.unitQuantity = obj.unitQuantity;
						this.commodityInfo.cost = obj.cost;
						this.commodityInfo.clientStatus = obj.clientStatus;
						this.commodityInfo.payCode = this.payCode;
						this.commodityInfo.productId = this.productId;
						if (obj.supportBuyOnce == '是') {
							this.commodityInfo.supportBuyOnce = true;
						} else {
							this.commodityInfo.supportBuyOnce = false;
						}

						// 货币单位也需要提前获取然后展示
						if (obj.specificationModelList.length <= 0) {
							this.addSpec();
						}
						this.commodityInfo.specificationList = [];
						for (let i = 0; i < obj.specificationModelList.length; i++) {
							var specification = {};
							specification.id = obj.specificationModelList[i].id;
							specification.currency = obj.specificationModelList[i].currency;
							specification.unitCostPrice = obj.specificationModelList[i].unitCostPrice;
							specification.unitPrice = obj.specificationModelList[i].unitPrice;
							this.commodityInfo.specificationList.push(specification);
						}
						this.commodityInfo.remark = obj.remark;
						this.createDialog = true;
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
						return;
					}
					this.dataLoading = false;
				})
				.catch(() => {
					obj.loading = false;
					this.createDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 提交新增商品的表格
		commitAddCommodity: function () {
			this.commodityInfo.zone = this.zone;
			this.commodityInfo.payCode = this.payCode;
			if (
				this.commodityInfo.commodityName == null ||
				this.commodityInfo.commodityDescCn == null ||
				this.commodityInfo.rootCommodityCode == null ||
				this.commodityInfo.unitQuantity == null ||
				this.commodityInfo.cost == null
			) {
				return this.$message.error('星标*为必填项，请确认您是否输入完全！');
			}
			this.$http
				.post('/api/product/cloudstorage/addCommodity', this.commodityInfo)
				.then((res) => {
					this.commitLoading = false;
					if (res.data.code == 100) {
						this.loadData();
						this.$message.success('新增成功【详情十分钟内生效】');
						this.createDialog = false;
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
						this.commitLoading = false;
						this.createDialog = false;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.createDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 提交编辑后的商品表格
		commitEditCommodity: function () {
			this.commodityInfo.zone = this.zone;
			this.commodityInfo.payCode = this.payCode;
			if (
				this.commodityInfo.commodityName == '' ||
				this.commodityInfo.commodityDescCn == '' ||
				this.commodityInfo.rootCommodityCode == '' ||
				this.commodityInfo.unitQuantity == '' ||
				this.commodityInfo.cost == ''
			) {
				return this.$message.error('星标*为必填项，请确认您是否输入完全！');
			}
			if (this.commodityInfo.rootCommodityCode == '7天事件录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_7day_event';
			} else if (this.commodityInfo.rootCommodityCode == '7天连续录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_7day_all';
			} else if (this.commodityInfo.rootCommodityCode == '14天事件录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_14day_event';
			} else if (this.commodityInfo.rootCommodityCode == '14天连续录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_14day_all';
			} else if (this.commodityInfo.rootCommodityCode == '30天事件录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_30day_event';
			} else if (this.commodityInfo.rootCommodityCode == '30天连续录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_30day_all';
			} else if (this.commodityInfo.rootCommodityCode == '7天事件人体检测') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_ai_7day_event';
			} else if (this.commodityInfo.rootCommodityCode == '7天全时段人体检测') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_ai_7day_all';
			} else if (this.commodityInfo.rootCommodityCode == '人体检测服务') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_ai_body_detection';
			} else if (this.commodityInfo.rootCommodityCode == '人脸识别服务') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_ai_face_recognition';
			} else if (this.commodityInfo.rootCommodityCode == '1天事件录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_1day_event';
			} else if (this.commodityInfo.rootCommodityCode == '1天连续录像') {
				this.commodityInfo.rootCommodityCode = 'tuya_camera_store_1day_all';
			}
			this.$http
				.post('/api/product/cloudstorage/editCommodity', this.commodityInfo)
				.then((res) => {
					this.commitLoading = false;
					this.createDialog = false;
					if (res.data.code == 100) {
						this.loadData();
						this.$message.success('编辑成功【详情十分钟内生效】');
						this.createDialog = false;
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
						this.commitLoading = false;
						this.createDialog = false;
						return;
					}
				})
				.catch(() => {
					this.commitLoading = false;
					this.createDialog = false;
					this.$message.error('unexpected request failed.');
				});
		},

		// 展示商品的弹框
		showCommodityInfo: function (obj) {
			this.show = true;
			if (obj === undefined || obj === '') {
				this.commodityInfo = { specificationList: [] };
				this.addSpec();
				this.commodityInfo.productId = this.productId;
				this.createDialog = true;
			} else {
				this.show = false;
				Object.assign(this.commodityInfo, {
					specificationList: [],
					rootCommodityCode: '',
					payCode: '',
				});
				this.toEditCommodity(obj);
			}
		},

		// 一键增加商品
		batchAddCommodity: function () {
			this.$http
				.post('/api/product/cloudstorage/addConfigCommodity', {
					productId: this.productId,
					zone: this.zone,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.loadData();
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed!!!');
						return;
					}
				})
				.catch(() => {
					this.$message.error('unexpecteds request failed!!!');
				});
		},

		// 点击启用或者下线按钮执行的操作
		enableButton: function (commodity) {
			commodity.loading1 = true;
			// 点击启用的时候将false改为true
			if (commodity.clientStatus == false) {
				this.clientStatus = true;
			} else {
				// 点击下线的时候将状态由true变为false
				this.clientStatus = false;
			}
			this.commodityCode = commodity.commodityCode;
			this.$http
				.post('/api/product/cloudstorage/enableSetting', {
					commodityCode: this.commodityCode,
					clientStatus: this.clientStatus,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.loadData();
						this.$message.success('操作成功');
					} else {
						this.$message.error(res.data.msg ? res.data.msg : 'request failed.');
						return;
					}
				})
				.catch(() => {
					this.$messgae.error('unexpecteds request failed.');
				});
		},
	},
};
</script>
