<template>
	<div>
		<el-row>
			<el-button @click="showAddPlan()" style="float: left;">新增套餐</el-button>

			<!-- <el-input v-model="dealerInput" placeholder="请输入dealerId" class="id-input"></el-input> -->
			<el-button
				type="primary"
				@click="loadData"
				style="float: right; margin-right: 1%;"
				icon="el-icon-search"
				circle
			></el-button>
			<el-input v-model="actCodeInput" placeholder="请输入activeCode" class="id-input"></el-input>
		</el-row>

		<el-table :data="planList" border style="width: 100%;">
			<el-table-column prop="name" label="商品名称"></el-table-column>
			<el-table-column prop="dealerId" label="服务商"></el-table-column>
			<el-table-column prop="channelId" label="渠道商"></el-table-column>
			<el-table-column prop="bizId" label="业务"></el-table-column>
			<el-table-column prop="code" label="商品编号"></el-table-column>
			<el-table-column prop="serviceCodes" label="服务编码"></el-table-column>
			<el-table-column prop="commodityLevel" label="套餐等级"></el-table-column>
			<el-table-column prop="commodityType" label="套餐种类"></el-table-column>
			<el-table-column prop="sks" label="能力值"></el-table-column>
			<el-table-column prop="description" label="套餐描述"></el-table-column>
			<el-table-column prop="action" label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="showUpdatePlan(scope.row)">修改</el-button>
					<el-button type="text" @click="deletePlan(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="bottom-page" align="center">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
			></el-pagination>
		</div>

		<el-dialog :title="'新增服务套餐模板'" :visible.sync="showDialog" center>
			<el-form ref="appPlanForm" :model="appPlanForm" label-width="100px">
				<!-- <el-input v-model="appPlanForm.id" v-show="false"></el-input> -->
				<el-form-item label="服务商ID" prop="dealerId">
					<el-input v-model="appPlanForm.dealerId" placeholder="请输入服务商ID"></el-input>
				</el-form-item>
				<el-form-item label="渠道商ID" prop="channelId">
					<el-input v-model="appPlanForm.channelId" placeholder="请输入渠道商ID"></el-input>
				</el-form-item>
				<el-form-item label="业务ID" prop="bizId">
					<el-input v-model="appPlanForm.bizId" placeholder="请输入业务ID"></el-input>
				</el-form-item>
				<el-form-item label="商品编号" prop="code">
					<el-input v-model="appPlanForm.code" placeholder="请输入商品编号"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="appPlanForm.name" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="服务内容" prop="serviceCodes">
					<el-select
						class="sec-sel-opt"
						v-model="appPlanForm.serviceCodes"
						multiple
						placeholder="请选择服务内容"
					>
						<el-option
							v-for="item in serviceCodeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="套餐类型" prop="commodityType">
					<el-select v-model="appPlanForm.commodityType" placeholder="请选择套餐类型">
						<el-option
							v-for="item in commodityTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="appPlanForm.commodityType == 1 || appPlanForm.commodityType == '套餐'"
					label="套餐等级"
					prop="commodityLevel"
				>
					<el-select v-model="appPlanForm.commodityLevel" placeholder="请选择套餐等级">
						<el-option
							v-for="item in commodityLevelList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="能力值" prop="skills">
					<el-select class="sec-sel-opt" v-model="appPlanForm.skills" multiple>
						<el-option
							v-for="item in skillConfigs"
							:key="item.value"
							:label="item.desc"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="商品描述" prop="description">
					<el-input type="textarea" v-model="appPlanForm.description" maxlength="1024"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showDialog = false">取 消</el-button>
					<el-button type="primary" @click="addPlan()" :loading="commitAddLoading">确 定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 修改模版dialog -->
		<el-dialog :title="'修改服务套餐模板'" :visible.sync="showUpdateDialog" center>
			<el-form ref="updatePlanForm" :model="updatePlanForm" label-width="100px">
				<el-form-item prop="id">
					<el-input v-model="updatePlanForm.id" v-show="false"></el-input>
				</el-form-item>
				<el-form-item label="服务商ID" prop="dealerId">
					<el-input
						v-model="updatePlanForm.dealerId"
						disabled
						placeholder="请输入服务商ID"
					></el-input>
				</el-form-item>
				<el-form-item label="渠道商ID" prop="channelId">
					<el-input v-model="updatePlanForm.channelId" disabled></el-input>
				</el-form-item>
				<el-form-item label="业务ID" prop="bizId">
					<el-input v-model="updatePlanForm.bizId" disabled placeholder="请输入业务ID"></el-input>
				</el-form-item>
				<el-form-item label="商品编号" prop="code">
					<el-input v-model="updatePlanForm.code" disabled placeholder="请输入商品编号"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="updatePlanForm.name" disabled placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="服务内容" prop="serviceCodes">
					<el-select
						class="sec-sel-opt"
						v-model="updatePlanForm.serviceCodes"
						multiple
						placeholder="请选择服务内容"
					>
						<el-option
							v-for="item in serviceCodeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="套餐类型" prop="commodityType">
					<el-select v-model="updatePlanForm.commodityType" placeholder="请选择套餐类型">
						<el-option
							v-for="item in commodityTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					v-if="updatePlanForm.commodityType == 1 || updatePlanForm.commodityType == '套餐'"
					label="套餐等级"
					prop="commodityLevel"
				>
					<el-select v-model="updatePlanForm.commodityLevel" placeholder="请选择套餐等级">
						<el-option
							v-for="item in commodityLevelList"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="能力值" prop="skills">
					<el-select class="sec-sel-opt" v-model="updatePlanForm.skills" multiple>
						<el-option
							v-for="item in skillConfigs"
							:key="item.value"
							:label="item.desc"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="商品描述" prop="description">
					<el-input
						type="textarea"
						v-model="updatePlanForm.description"
						maxlength="1024"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="showUpdateDialog = false">取 消</el-button>
					<el-button type="primary" @click="updatePlan()" :loading="commitAddLoading"
						>确 定</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
.id-input {
	float: right;
	width: 250px;
	margin-right: 10px;
	margin-bottom: 30px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}

.sec-sel-opt {
	width: 100%;
}
</style>

<script>
export default {
	data() {
		return {
			commitAddLoading: false,
			showDialog: false,
			showUpdateDialog: false,
			appPlanForm: {
				id: undefined,
				dealerId: undefined,
				channelId: undefined,
				bizId: undefined,
				code: undefined,
				name: undefined,
				serviceCodes: undefined,
				commodityType: undefined,
				commodityLevel: undefined,
				description: undefined,
				skills: undefined,
			},
			updatePlanForm: {
				id: undefined,
				dealerId: undefined,
				channelId: undefined,
				bizId: undefined,
				code: undefined,
				name: undefined,
				serviceCodes: undefined,
				commodityType: undefined,
				commodityLevel: undefined,
				description: undefined,
				skills: undefined,
			},
			// addSkillObj: [],
			// updateSkillObj: [],
			skillConfigs: [],
			planList: [],
			dealerInput: '',
			actCodeInput: '',
			// 默认每页数据量
			pagesize: 10,
			// 当前页码
			currentPage: 1,
			// 查询的页码
			start: 1,
			// 默认数据总数
			totalCount: 0,
			commodityTypeList: [
				{
					value: '1',
					label: '套餐',
				},
				{
					value: '2',
					label: '扩展包',
				},
			],
			serviceCodeList: [
				{
					value: 'tuya_camera_store_14day_event',
					label: '14天云存储/2路',
				},
				{
					value: 'tuya_camera_store_30day_event',
					label: '30天云存储/2路',
				},
				{
					value: 'virtual_plan',
					label: '虚拟套餐',
				},
				{
					value: '4G_cellular_flow',
					label: '蜂窝4G备份(50MB)',
				},
				{
					value: 'Pro_Monitoring',
					label: '7/24专业监控服务',
				},
			],
			commodityLevelList: [
				{
					value: 1,
					label: '基础套餐',
				},
				{
					value: 2,
					label: '高级套餐',
				},
			],
		};
	},

	components: {},

	mounted() {
		this.loadData();
	},

	methods: {
		loadData() {
			const url = `/api/service/plan/list/get`;
			this.$http
				.get(url, {
					params: {
						// dealerId: this.dealerInput,
						actCode: this.actCodeInput,
						offset: this.pagesize * (this.currentPage - 1),
						limit: this.pagesize,
					},
				})
				.then((res) => {
					const resData = res.data;
					if (resData.code == '102') {
						this.$message.error(resData.msg);
						return false;
					}
					if (resData.code == '101') {
						this.$message.error('服务器繁忙');
						return false;
					}
					this.totalCount = resData.rows;
					this.skillConfigs = resData.result.skillConfigs;
					this.planList = resData.result.dataList;
					this.planList.forEach(
						(item) =>
							(item.sks = item.skills
								.map((it) => this.skillConfigs.find((sk) => sk.value === it).desc)
								.join(',')),
					);
					this.planList.forEach((item) => {
						if (item.commodityType == 1) {
							item.commodityType = '套餐';
						} else if (item.commodityType == 2) {
							item.commodityType = '扩展包';
							item.commodityLevel = 0;
						}

						// item.commodityLevel = item.commodityLevel == 1 ? '基础套餐' : '高级套餐';
						if (item.commodityLevel == 1) {
							item.commodityLevel = '基础套餐';
						} else if (item.commodityLevel == 2) {
							item.commodityLevel = '高级套餐';
						} else {
							item.commodityLevel = undefined;
						}
					});
				});
		},
		// 每页显示数据量变更
		handleSizeChange(val) {
			this.pagesize = val;
			this.loadData();
		},
		// 页码变更
		handleCurrentChange(val) {
			this.currentPage = val;
			this.loadData();
		},
		showAddPlan() {
			this.$nextTick(() => {
				if (this.$refs['appPlanForm']) {
					this.$refs['appPlanForm'].resetFields();
				}
			});
			this.appPlanForm = {};
			this.showDialog = true;
		},
		showUpdatePlan(row) {
			this.$nextTick(() => {
				if (this.$refs['updatePlanForm']) {
					this.$refs['updatePlanForm'].resetFields();
				}
			});
			const serviceCodes = row.serviceCodes;
			this.updatePlanForm = {
				...row,
				serviceCodes: serviceCodes.split(','),
			};
			this.showUpdateDialog = true;
		},
		addPlan() {
			let param = this.appPlanForm;
			param.serviceCodes = String(this.appPlanForm.serviceCodes);
			param.skills = String(this.appPlanForm.skills);
			if (param.commodityType == 2) {
				param.commodityLevel = 0;
			}
			this.$confirm('确定提交？', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				cancelButtonClass: 'm-cancel-button',
				confirmButtonClass: 'm-confirm-button',
				type: 'warning',
			}).then(() => {
				this.$http
					.post(
						'/api/service/plan/add',
						{},
						{
							params: param,
						},
					)
					.then((res) => {
						if (res.data && res.data.code == 100) {
							this.loadData();
							this.showDialog = false;
							this.$message.success('添加成功');
						} else {
							this.$message.error(res.data.msg);
						}
					});
			});
		},
		deletePlan(row) {
			const data = {
				id: row.id,
			};
			this.$confirm('确定删除？', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				cancelButtonClass: 'm-cancel-button',
				confirmButtonClass: 'm-confirm-button',
				type: 'warning',
			}).then(() => {
				this.$http.post('/api/service/plan/delete', data).then((res) => {
					if (res.data && res.data.code == 100) {
						this.loadData();
						this.showDialog = false;
						this.$message.success('删除成功');
					} else {
						this.$message.error(res.msg);
					}
				});
			});
		},
		updatePlan() {
			const param = this.updatePlanForm;
			if (this.updatePlanForm.commodityType === '扩展包') {
				param.commodityType = 2;
			} else if (this.updatePlanForm.commodityType === '套餐') {
				param.commodityType = 1;
			}
			if (this.updatePlanForm.commodityLevel == '基础套餐') {
				param.commodityLevel = 1;
			} else if (this.updatePlanForm.commodityLevel == '高级套餐') {
				param.commodityLevel = 2;
			}
			param.serviceCodes = String(this.updatePlanForm.serviceCodes);
			param.skills = String(this.updatePlanForm.skills);

			this.$confirm('确定修改？', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				cancelButtonClass: 'm-cancel-button',
				confirmButtonClass: 'm-confirm-button',
				type: 'warning',
			}).then(() => {
				this.$http
					.post(
						'/api/service/plan/update',
						{},
						{
							params: param,
						},
					)
					.then((res) => {
						if (res.data && res.data.code == 100) {
							this.loadData();
							this.showUpdateDialog = false;
							this.$message.success('修改成功');
						} else {
							this.$message.error(res.msg);
						}
					});
			});
		},
	},
};
</script>
