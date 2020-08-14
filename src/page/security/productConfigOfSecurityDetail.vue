<template>
	<div>
		<!-- 基本信息 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>基本信息</span>
			</div>
			<el-form label-position="right" label-width="100px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="产品ID:">{{ product.id }}</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="名称:">{{ product.name }}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="类型:">{{ product.code }}</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="型号:">{{ product.model }}</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="图标:">
							<img :src="product.icon" style="width: 40px;" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<!-- 白名单配置-->
		<el-card>
			<div slot="header" class="clearfix">
				<span>白名单配置</span>
				<!-- <el-button class="operation-btn" type="text">上线</el-button> -->
			</div>
			<el-span>设备类型:</el-span>
			<el-span :model="productWhiteId" v-show="false"></el-span>
			<el-select v-model="productTypeConfig">
				<el-option
					v-for="item in productTypes"
					:key="item.key"
					:label="item.label"
					:value="item.key"
				></el-option>
			</el-select>
			<!--      <el-input type="textarea" class="show-input" placeholder="请输入配置项" v-model="productTypeConfig"></el-input>-->
			<el-span>数据白名单:</el-span>
			<el-select placeholder="" v-model="dataWhite">
				<el-option
					v-for="item in dataWhiteList"
					:key="item.key"
					:label="item.label"
					:value="item.key"
				></el-option>
			</el-select>
			<el-button type="primary" style="float: right;" @click="saveProductWhite()">保存</el-button>
		</el-card>
		<!-- 报警类型 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>报警类型配置</span>
				<!-- <el-button class="operation-btn" type="text">上线</el-button> -->
			</div>
			<el-select placeholder="请选择报警类型" v-model="alarmType">
				<el-option
					v-for="item in alarmTypeList"
					:key="item.key"
					:label="item.label"
					:value="item.key"
				></el-option>
			</el-select>
		</el-card>
		<!-- 布防模式 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>布防模式配置</span>
			</div>
			<el-checkbox-group v-model="deviceDef">
				<el-checkbox :key="item.key" :label="item.label" v-for="item in defenceList"></el-checkbox>
			</el-checkbox-group>
		</el-card>
		<!-- DP列表 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>DP列表</span>
			</div>
			<el-table :data="dpSchemasData" border style="width: 100%; margin-bottom: 20px;">
				<el-table-column label="编号" prop="dpId"></el-table-column>
				<el-table-column label="代号" prop="code"></el-table-column>
				<el-table-column label="名称" prop="name"></el-table-column>
				<el-table-column label="描述" prop="desc"></el-table-column>
				<el-table-column label="模式" prop="mode"></el-table-column>
				<el-table-column label="类型" prop="subtype"></el-table-column>
				<el-table-column label="类型详情" prop="property"></el-table-column>
			</el-table>
		</el-card>
		<!-- dp配置 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>DP配置</span>
			</div>
			<el-table>
				<el-table :data="dpSchemasList" border style="width: 100%;">
					<el-table-column prop="dp" label="DP点"></el-table-column>
					<el-table-column prop="group" label="group"></el-table-column>
					<el-table-column prop="dpJson" label="schema"></el-table-column>
				</el-table>
			</el-table>
			<el-button @click="addSchema" type="primary">新增DP</el-button>
			<el-row :key="index" style="margin-top: 10px;" v-for="(schemaItem, index) in dpSchemasList">
				<template v-if="schemaItem.disable">
					<el-input class="show-input" disabled v-model="schemaItem.dp"></el-input>

					<el-input
						v-if="!isDpGroup45(schemaItem.group)"
						:value="showFunction(schemaItem.function)"
						class="show-input"
						disabled
					></el-input>
					<el-input
						v-if="!isDpGroup45(schemaItem.group)"
						:value="showParameters(schemaItem.parameters)"
						class="show-input"
						disabled
					></el-input>
					<el-input
						v-if="isDpGroup45(schemaItem.group)"
						:value="schemaItem.dpJson"
						class="show-input"
						disabled
					></el-input>
					<el-input
						:value="showDpAttribute(schemaItem.attribute)"
						class="show-input"
						disabled
					></el-input>
					<el-input :value="showDpGroup(schemaItem.group)" class="show-input" disabled></el-input>
					<el-input class="show-input" disabled v-model="schemaItem.display"></el-input>
					<el-input class="show-input" disabled v-model="schemaItem.nameZh"></el-input>
					<el-input class="show-input" disabled v-model="schemaItem.nameEn"></el-input>
					<el-button @click="deleteSchema(index)" type="primary">删除</el-button>
				</template>
				<template v-if="!schemaItem.disable">
					<el-select
						@change="selectDp(schemaItem.dp, index)"
						class="show-input"
						placeholder="请选择DP"
						v-model="schemaItem.dp"
					>
						<el-option
							:key="item.value"
							:label="item.value"
							:value="item.value"
							v-for="item in dpOptionsList"
						></el-option>
					</el-select>

					<el-select
						class="show-input"
						filterable
						@change="selectGroup(schemaItem.group, index)"
						placeholder="请选择Group"
						v-model="schemaItem.group"
					>
						<el-option
							:key="item.key"
							:label="item.label"
							:value="item.key"
							v-for="item in dpGroups"
						></el-option>
					</el-select>

					<el-select
						v-if="!dpJsonFlag"
						class="show-input"
						placeholder="请选择运算符"
						v-model="schemaItem.function"
					>
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in schemaItem.realFunctionOptionList"
						></el-option>
					</el-select>
					<el-select
						class="show-input"
						placeholder="请选择参数"
						v-if="
							!dpJsonFlag &&
							(schemaItem.dpType === 'bool' ||
								schemaItem.dpType === 'enum' ||
								schemaItem.dpType === '')
						"
						v-model="schemaItem.parameters[0]"
					>
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in schemaItem.optionsParameters"
						></el-option>
					</el-select>

					<el-input
						class="show-input"
						placeholder="请输入参数"
						v-if="!dpJsonFlag && (schemaItem.dpType === 'value' || schemaItem.dpType === 'raw')"
						v-model="schemaItem.parameters[0]"
					></el-input>

					<el-input
						class="show-input"
						v-if="dpJsonFlag"
						placeholder="请输入json"
						v-model="schemaItem.dpJson"
					></el-input>

					<el-select
						class="show-input"
						filterable
						multiple
						placeholder="请选择属性"
						v-model="schemaItem.attribute"
					>
						<el-option
							:key="item.key"
							:label="item.label"
							:value="item.key"
							v-for="item in dpAttributeList"
						></el-option>
					</el-select>

					<el-select
						@change="(val) => selectName(val, schemaItem.dp)"
						class="show-input"
						filterable
						placeholder="请选择名字"
						v-model="schemaItem.display"
					>
						<el-option
							:key="item.display"
							:label="item.display"
							:value="item.display"
							v-for="item in schemaOptionsList"
						></el-option>
					</el-select>
					<el-input class="show-input" v-model="schemaItem.nameZh"></el-input>
					<el-input class="show-input" v-model="schemaItem.nameEn"></el-input>
					<el-button @click="() => (showDisplayModal = true)" type="primary">新增SCHEMA</el-button>
					<el-button @click="deleteSchema(index)" type="primary">删除</el-button>
				</template>
			</el-row>
			<modal-wrap
				:only-read="false"
				:params="['showForm']"
				@onClose="handleDisplayModalClose"
				@onSure="handleDisplaySubmit"
				text="确定"
				title
				v-if="showDisplayModal"
			>
				<add-display-modal />
			</modal-wrap>
		</el-card>
		<!-- 安防规则 -->
		<el-card>
			<div slot="header" class="clearfix">
				<span>安防规则配置</span>
			</div>

			<el-table :data="ruleList" border style="width: 100%;">
				<el-table-column prop="id" v-if="idShow"></el-table-column>
				<el-table-column prop="dpId" label="DP点"></el-table-column>
				<el-table-column prop="jsonRule" label="json"></el-table-column>
			</el-table>
			<el-button type="primary" @click="addRule(1)">新增一行</el-button>
			<el-button type="primary" @click="addRule(2)">新增JSON</el-button>

			<el-row :key="index" style="margin-top: 20px;" v-for="(ruleItem, index) in ruleList">
				<template v-if="ruleItem.disable">
					<span>dp点:</span>
					<el-input disabled v-show="false" v-model="ruleItem.id"></el-input>
					<el-input class="show-input" disabled v-model="ruleItem.dpId"></el-input>
					<span>规则类型:</span>
					<el-input
						disabled
						class="show-input"
						:value="showConditionType(ruleItem.condType)"
					></el-input>
					<span v-if="ruleItem.condType == 1">运算符:</span>
					<span v-if="ruleItem.condType == 2">条件:</span>
					<el-input
						v-if="ruleItem.condType == 1"
						class="show-input"
						disabled
						:value="ruleItem.equation"
					></el-input>
					<el-input
						v-if="ruleItem.condType == 2"
						class="show-input"
						disabled
						:value="ruleItem.equation"
					></el-input>
					<span v-if="ruleItem.condType == 1">参数:</span>
					<el-input
						v-if="ruleItem.condType == 1"
						disabled
						class="show-input"
						:value="ruleItem.value"
					></el-input>

					<span v-if="ruleItem.condType == 1">模式:</span>
					<el-select disabled v-if="ruleItem.condType == 1" v-model="ruleItem.ruleMode">
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in ruleModes"
						></el-option>
					</el-select>
					<!--          <el-input disabled class="show-input" :value="ruleItem.ruleMode"></el-input>-->
					<span>附加属性:</span>
					<el-select disabled multiple v-model="ruleItem.attribute">
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in attributes"
						></el-option>
					</el-select>
					<!--          <el-input disabled class="show-input" :value="ruleItem.attribute"></el-input>-->
					<el-button @click="deleteRule(index)" type="primary">删除</el-button>
				</template>

				<template v-if="ruleItem.ruleType == 1">
					<span>dp点:</span>
					<input v-show="false" :value="ruleItem.dpType" />
					<el-select
						:disabled="ruleItem.disable"
						@change="selectRuleDp(ruleItem.dpId, index)"
						placeholder="请选择dp"
						v-model="ruleItem.dpId"
					>
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in dpOptionsList"
						></el-option>
					</el-select>
					<span>规则类型:</span>
					<el-input
						disabled
						class="show-input"
						:value="showConditionType(ruleItem.condType)"
					></el-input>
					<div style="display: inline;" v-if="ruleItem.dpType != 'raw'">
						<span v-if="ruleItem.condType == 1">运算符:</span>
						<el-select
							:disabled="ruleItem.disable"
							placeholder="请选择运算符"
							v-model="ruleItem.equation"
						>
							<el-option
								:key="item.label"
								:label="item.label"
								:value="item.label"
								v-for="item in ruleItem.realFunctionOptionList"
							></el-option>
						</el-select>
					</div>

					<span v-if="ruleItem.condType == 1">参数:</span>

					<el-select
						class="show-input"
						placeholder="请选择参数"
						v-if="
							ruleItem.dpType === 'bool' || ruleItem.dpType === 'enum' || ruleItem.dpType === ''
						"
						v-model="ruleItem.value"
					>
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in ruleItem.optionsParameters"
						></el-option>
					</el-select>

					<el-input
						class="show-input"
						placeholder="请输入参数"
						v-if="ruleItem.dpType === 'value' || ruleItem.dpType === 'raw'"
						v-model="ruleItem.value"
					></el-input>

					<span>模式:</span>
					<el-select class="show-input" placeholder="请选择模式" v-model="ruleItem.ruleMode">
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in ruleModes"
						></el-option>
					</el-select>

					<span>附加属性:</span>
					<el-select class="show-input" multiple placeholder="请选择" v-model="ruleItem.attribute">
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in attributes"
						></el-option>
					</el-select>

					<el-button @click="deleteRule(index)" type="primary">删除</el-button>
				</template>

				<template v-else-if="ruleItem.ruleType == 2">
					<span>dp点:</span>
					<el-select
						:disabled="ruleItem.disable"
						@change="selectRuleDp"
						placeholder="请选择dp"
						v-model="ruleItem.dpId"
					>
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in dpOptionsList"
						></el-option>
					</el-select>

					<span>规则:</span>
					<el-input
						class="show-input"
						placeholder="请输入规则"
						v-model="ruleItem.jsonRule"
					></el-input>
					<span>附加属性:</span>
					<el-select class="show-input" multiple placeholder="请选择" v-model="ruleItem.attribute">
						<el-option
							:key="item.value"
							:label="item.label"
							:value="item.value"
							v-for="item in attributes"
						></el-option>
					</el-select>
					<el-button @click="deleteRule(index)" type="primary">删除</el-button>
				</template>
			</el-row>
		</el-card>
		<div align="center">
			<el-button type="primary" @click="saveProductInfo()">保存</el-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.operation-btn {
	float: right;
	padding: 3px 20px;
}

.io-config-tab {
	margin-bottom: 20px;
	border-bottom: 1px solid #ebebeb;
	border-radius: 3px;
}

.io-config-tab span {
	display: inline-block;
	height: 40px;
	margin: 0 20px;
	font-weight: 400;
	font-size: 15px;
	line-height: 40px;
	cursor: pointer;
}

.active-tab {
	color: #3f9eff;
	border-bottom: 2px solid #3f9eff;
}

.show-input {
	width: 200px;
}

.show-checkbox {
	margin-left: 20px;
}
</style>

<script>
import ModalWrap from '@tuya-fe/ty-modal';

export default {
	data() {
		return {
			baseUrl: 'http://localhost:3001',
			productId: this.$route.query.pid,
			idShow: false,

			product: {},
			// 设备类型
			productTypeConfig: '',
			productWhiteId: undefined,
			dataWhiteList: [
				{
					label: '开启',
					key: true,
				},
				{
					label: '未开启',
					key: false,
				},
			],
			dataWhite: false,

			// 报警类型
			alarmTypeId: undefined,
			alarmType: '',
			alarmTypeList: [],
			// 默认布防
			deviceDef: [],
			defenceList: [],
			// dp配置
			dpSchemasList: [],
			dpSchemasData: [],
			dpGroups: [],
			dpAttributeList: [],
			dpJsonFlag: false,

			// rule
			ruleList: [],
			showRuleDialog: false,
			ruleDetail: {},
			showDisplayModal: false,
			ruleDisable: true,
			productTypes: [],
			dpOptionsList: [],
			schemaOptionsList: [],
			ruleModes: [
				{
					label: '撤防模式',
					value: 0,
				},
				{
					label: '在家模式',
					value: 1,
				},
				{
					label: '离家模式',
					value: 2,
				},
				{
					label: '自适应模式',
					value: 3,
				},
				{
					label: '与模式无关',
					value: 4,
				},
			],
			attributes: [
				{
					label: '跳过延迟报警',
					value: 1,
				},
				{
					label: '忽略检测',
					value: 2,
				},
			],
		};
	},
	mounted() {
		this.getProductInfo();
		this.getSchemaOptionsList();
	},
	components: {
		ModalWrap,
		addDisplayModal: () => import('./model/addDisplayModal'),
	},

	computed: {},

	methods: {
		getProductInfo() {
			const url = `/api/product/info/get?productId=${this.productId}`;
			this.$http.get(url).then((res) => {
				const resData = res.data;
				if (resData.code === '102') {
					this.$message.error(resData.msg);
					return false;
				}
				if (resData.code === '101') {
					this.$message.error('服务器繁忙');
					return false;
				}
				const {
					product,
					alarmType,
					dpSchemaList,
					deviceDef,
					ruleSourceVOList,
					productWhite,
				} = resData.result;
				this.product = product;
				// 封装参数查询对应dp点信息
				const data = {
					productId: this.productId,
					schemaId: product.schemaId,
				};
				this.productWhiteId = productWhite.productWhiteId;
				this.productTypeConfig = productWhite.productTypeConfig;
				this.dataWhite = productWhite.dataWhite;

				this.getAlarmAndSchema(data);
				this.alarmTypeId = alarmType.id;
				this.alarmType = alarmType.key;
				// 布防类型
				this.deviceDef = deviceDef;

				this.dpSchemasList = dpSchemaList;
				dpSchemaList.forEach((item) => {
					item.disable = true;
				});
				this.ruleList = ruleSourceVOList;
				this.ruleList.forEach((item) => {
					item.disable = true;
				});
			});
		},
		getAlarmAndSchema(data) {
			const url = `/api/product/config/all?productId=${data.productId}&schemaId=${data.schemaId}`;
			this.$http.get(url).then((res) => {
				const resData = res.data;
				if (resData.code === '102') {
					this.$message.error(resData.msg);
					return false;
				}
				if (resData.code === '101') {
					this.$message.error('服务器繁忙');
					return false;
				}

				this.productTypes = resData.result.productTypes;
				// alarm type
				this.alarmTypeList = resData.result.alarmTypes;
				// device default
				this.defenceList = resData.result.defenceList;

				// group
				this.dpGroups = resData.result.dpGroups;
				// attribute
				this.dpAttributeList = resData.result.dpAttributes;
				// dp配置
				this.dpSchemasData = resData.result.dpSchemas;

				const arr = [];
				resData.result.dpSchemas.forEach((item) => {
					arr.push({
						value: item.dpId,
					});
				});
				this.dpOptionsList = arr;
			});
		},

		// 保存数据
		saveProductInfo() {
			const url = `/api/product/configuration/info/save`;
			const alarmType = {
				id: this.alarmTypeId,
				key: this.alarmType,
			};
			const def = [];
			this.deviceDef.forEach((item) => {
				if (item == '在家布防') {
					def.push(1);
				} else if (item == '离家布防') {
					def.push(2);
				}
			});
			const data = {
				productId: this.productId,
				alarmType: alarmType,
				deviceDef: def,
				dpSchemaList: this.dpSchemasList,
				ruleSourceVOList: this.ruleList,
			};
			if (this.validateParam()) {
				this.$confirm('确定提交？', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					cancelButtonClass: 'm-cancel-button',
					confirmButtonClass: 'm-confirm-button',
					type: 'warning',
				}).then(() => {
					this.$http.post(url, data).then((res) => {
						const resData = res.data;
						if (resData.code === '102') {
							this.$message.error(resData.msg);
							return false;
						}
						if (resData.code === '101') {
							this.$message.error('操作失败');
							return false;
						}
						location.reload();
						this.$message.success('修改成功');
					});
				});
			}
		},

		// 配置白名单
		saveProductWhite() {
			const url = `/api/product/white/config`;
			let data = {
				productId: this.productId,
				productTypeConfig: this.productTypeConfig,
				productWhiteId: this.productWhiteId,
				dataWhite: this.dataWhite,
				productName: this.product.name,
			};
			this.$confirm('确定提交？', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				cancelButtonClass: 'm-cancel-button',
				confirmButtonClass: 'm-confirm-button',
				type: 'warning',
			}).then(() => {
				this.$http.post(url, data).then((res) => {
					const resData = res.data;
					if (resData.code === '102') {
						this.$message.error(resData.msg);
						return false;
					}
					if (resData.code === '101') {
						this.$message.error('操作失败');
						return false;
					}
					location.reload();
					this.$message.success('修改成功');
				});
			});
		},

		// 多语言数据
		getSchemaOptionsList() {
			const url = '/api/product/schema/get';
			this.$http.get(url).then((res) => {
				const resData = res.data;
				if (resData.code === '102') {
					this.$message.error(resData.msg);
					return false;
				}
				if (resData.code === '101') {
					this.$message.error('服务器繁忙');
					return false;
				}
				this.schemaOptionsList = resData.result;
			});
		},

		addSchema() {
			this.dpSchemasList.push({
				disable: false,
				attribute: '',
				dp: '',
				parameters: [],
				dpType: '',
				function: '',
				dpJson: '',
			});
		},
		deleteSchema(index) {
			this.dpSchemasList.splice(index, 1);
		},
		deleteRule(index) {
			this.ruleList.splice(index, 1);
		},

		selectDp(val, index) {
			// dp schema新增一行时选择dp
			const result = this.dpSchemasData.find((item) => {
				return item.dpId === val;
			});
			const currentSchemes = this.dpSchemasList[index];
			currentSchemes.dpType = result.subtype;
			currentSchemes.function = '';
			currentSchemes.parameters = [];
			currentSchemes.realFunctionOptionList = this.getRealFunctionList(result.subtype);
			if (result.subtype !== 'value') {
				currentSchemes.optionsParameters = this.getRealValueList(result.subtype, result.property);
			}
		},
		selectGroup(val, index) {
			const currentDp = this.dpSchemasList[index];
			if (val === 4) {
				currentDp.dpJsonFlag = true;
			} else {
				currentDp.dpJsonFlag = false;
			}
		},

		getRealFunctionList(type) {
			switch (type) {
				case 'bool':
					return [
						{
							label: '==',
							value: 'EQU',
						},
						{
							label: '!=',
							value: 'NEQ',
						},
					];
				case 'enum':
					return [
						{
							label: '==',
							value: 'EQU',
						},
						{
							label: '!=',
							value: 'NEQ',
						},
					];
				case 'string':
					return [
						{
							label: '==',
							value: 'EQU',
						},
						{
							label: '!=',
							value: 'NEQ',
						},
					];
				case 'raw':
					return [
						{
							label: '==',
							value: 'EQU',
						},
						{
							label: '!=',
							value: 'NEQ',
						},
					];
				case 'value':
					return [
						{
							label: '==',
							value: 'EQU',
						},
						{
							label: '!=',
							value: 'NEQ',
						},
						{
							label: '<',
							value: 'LSS',
						},
						{
							label: '<=',
							value: 'LEQ',
						},
						{
							label: '>=',
							value: 'GEQ',
						},
						{
							label: '>',
							value: 'GTR',
						},
						{
							label: 'between',
							value: 'BTW',
						},
					];
				default:
					break;
			}
		},
		getRealValueList(type, property) {
			const arr = [];
			property = JSON.parse(property);
			switch (type) {
				case 'bool':
					return [
						{
							label: 'true',
							value: true,
						},
						{
							label: 'false',
							value: false,
						},
					];
				case 'enum':
					property.range.forEach((item) => {
						arr.push({
							label: item,
							value: item,
						});
					});
					return arr;
				default:
					break;
			}
		},
		showFunction(func) {
			switch (func) {
				case 'EQU':
					return '==';
				case 'NEQ':
					return '!=';
				case 'LSS':
					return '<';
				case 'LEQ':
					return '<=';
				case 'GEQ':
					return '>=';
				case 'GTR':
					return '>';
				case 'BTW':
					return 'between';
				default:
					break;
			}
		},
		showConditionType(type) {
			switch (type) {
				case 1:
					return '表达式';
				case 2:
					return '简单类型';
				default:
					break;
			}
		},
		showParameters(parameter) {
			if (parameter.length === 1) {
				if (parameter[0].toString() === 'true') {
					return '是';
				} else if (parameter[0].toString() === 'false') {
					return '否';
				} else {
					return parameter[0];
				}
			}
			return parameter.join(';');
		},
		showDpGroup(val) {
			return (this.dpGroups.find((item) => item.key == val) || { label: '' }).label;
		},
		showDpAttribute(val) {
			return val.map(
				(it) => (this.dpAttributeList.find((item) => item.key == it) || { label: '' }).label,
			);
		},
		// 新增schema
		handleDisplayModalClose() {
			this.showDisplayModal = false;
		},
		handleDisplaySubmit(data) {
			const { display, nameZh, nameEn } = data.showForm;
			this.schemaOptionsList.push({
				display,
				nameZh,
				nameEn,
			});
			this.showDisplayModal = false;
		},
		// 多语言选择
		selectName(val, dp) {
			const selectNameItem = this.schemaOptionsList.find((item) => {
				return item.display === val;
			});
			const currentItem = this.dpSchemasList.find((item) => {
				return item.dp === dp;
			});
			currentItem.nameZh = selectNameItem.nameZh;
			currentItem.nameEn = selectNameItem.nameEn;
		},

		// rule
		selectRuleDp(val, index) {
			const result = this.dpSchemasData.find((item) => {
				return item.dpId === val;
			});

			const currentRule = this.ruleList[index];
			currentRule.equation = '';
			currentRule.parameters = [];
			currentRule.dpType = result.subtype;
			currentRule.realFunctionOptionList = this.getRealFunctionList(result.subtype);
			if (result.subtype !== 'value') {
				currentRule.optionsParameters = this.getRealValueList(result.subtype, result.property);
			}
		},
		addRule(val) {
			const item = {
				id: undefined,
				productId: '',
				attribute: false,
				dpId: '',
				equation: '',
				parameters: [],
				value: '',
				condType: 1,
				dpType: '',
				ruleType: val,
				jsonRule: '',
				disable: false,
				ruleMode: 4,
			};
			this.ruleList.push(item);
			if (val == 1) {
				item.ruleType = 1;
			} else {
				item.ruleType = 2;
			}
		},
		// eslint-disable-next-line no-dupe-keys
		getRealValueList(type, property) {
			const arr = [];
			property = JSON.parse(property);
			switch (type) {
				case 'bool':
					return [
						{
							label: '是',
							value: true,
						},
						{
							label: '否',
							value: false,
						},
					];
				case 'enum':
					property.range.forEach((item) => {
						arr.push({
							label: item,
							value: item,
						});
					});
					return arr;
				default:
					break;
			}
		},
		validateParam() {
			let res = true;

			if (Object.keys(this.productId).length == 0) {
				res = false;
				this.$message.warning('参数productId为空');
			}
			// this.dpSchemasList.forEach((item) => {
			// if (item.dp == '' || item.function == '' || item.parameters.length <= 0) {
			//   res = false
			//   this.$message.warning('schema参数为空')
			// } else if (item.display == '' || item.nameEn == '' || item.nameZh == '') {
			//   res = false
			//   this.$message.warning('多语言参数为空')
			// }
			// });

			this.ruleList.forEach((item) => {
				if (item.ruleType == 1) {
					if (item.dpId == '' || item.value == '') {
						res = false;
						this.$message.warning('rule规则参数为空');
					}
				} else if (item.ruleType == 2) {
					if (item.dpId == '') {
						res = false;
						this.$message.warning('rule规则参数为空');
					} else if (item.jsonRule == '' || !this.isJson(item.jsonRule)) {
						res = false;
						this.$message.warning('规则json参数异常');
					}
				}
			});

			return res;
		},
		isJson(str) {
			try {
				if (typeof JSON.parse(str) === 'object') {
					return true;
				}
			} catch (e) {}
			return false;
		},
		isDpGroup45(group) {
			if (group == 4 || group == 5) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>
