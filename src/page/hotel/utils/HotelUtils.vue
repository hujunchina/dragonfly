<style lang="scss" scoped>
.el-input {
	width: 280px;
}
</style>
<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="场景模板匹配房间问题排查" name="template">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="用户名:">
								<el-input
									class="inputText"
									placeholder="请输入用户名"
									v-model="prototype.username"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="模板名称:">
								<el-input
									class="inputText"
									placeholder="请输入模板名称"
									v-model="prototype.templateName"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="房间号:">
								<el-input
									class="inputText"
									placeholder="请输入房间号"
									v-model="prototype.roomNo"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							icon="el-icon-search"
							style="margin-left: 15px;"
							@click="prototypeSearch()"
						>
							查询
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetPrototype()"
							>重置</el-button
						>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="场景/自动化执行问题排查" name="linkageRule">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="7">
							<el-form-item label="用户名:">
								<el-input
									class="inputText"
									placeholder="请输入用户名"
									v-model="linkageRule.username"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item label="场景/自动化名称:">
								<el-input
									class="inputText"
									placeholder="请输入场景/自动化名称"
									v-model="linkageRule.ruleName"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="房间号:">
								<el-input
									class="inputText"
									placeholder="请输入房间号"
									v-model="linkageRule.roomNo"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							icon="el-icon-search"
							style="margin-left: 15px;"
							@click="linkageRuleSearch()"
						>
							查询
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetLinkageRule()"
							>重置</el-button
						>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<h2>场景/自动化名称:{{ linkageRuleResult.ruleName }}</h2>
				<el-row :gutter="20">
					<el-col :span="12">
						<h3>条件列表</h3>
						<el-table
							class="mod-login-wrapper"
							ref="linkageRuleResult.conditions"
							:data="linkageRuleResult.conditions"
							border
							style="width: 100%;"
							:show-overflow-tooltip="true"
						>
							<el-table-column
								prop="deviceId"
								label="设备id"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="entityName"
								label="设备名称"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column prop="conditionDisplay" label="条件详情"></el-table-column>
							<el-table-column
								prop="isOnline"
								label="在线状态"
								:formatter="onlineFormat"
							></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="12">
						<h3>动作列表</h3>
						<el-table
							class="mod-login-wrapper"
							ref="linkageRuleResult.actions"
							:data="linkageRuleResult.actions"
							border
							style="width: 100%;"
							:show-overflow-tooltip="true"
						>
							<el-table-column
								prop="deviceId"
								label="设备id"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column
								prop="entityName"
								label="设备名称"
								:show-overflow-tooltip="true"
							></el-table-column>
							<el-table-column prop="actionDisplay" label="动作详情"></el-table-column>
							<el-table-column
								prop="isOnline"
								label="在线状态"
								:formatter="onlineFormat"
							></el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</div>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
import Vue from 'vue';
import JsonViewer from 'vue-json-viewer';
Vue.use(JsonViewer);

export default {
	components: {},
	data() {
		return {
			activeName: 'template',
			prototype: {
				username: '',
				templateName: '',
				roomNo: '',
			},
			linkageRule: {
				username: '',
				ruleName: '',
				roomNo: '',
			},
			linkageRuleResult: {
				ruleName: '',
				conditions: [],
				actions: [],
			},
			result: {},
		};
	},
	methods: {
		onlineFormat: function (row, column) {
			const date = row[column.property];
			if (date == undefined) {
				return '';
			}
			return date == true ? '在线' : '离线';
		},

		prototypeSearch: function () {
			this.$http
				.get(
					'/api/hotel/prototype/match/room?username=' +
						this.prototype.username +
						'&templateName=' +
						this.prototype.templateName +
						'&roomNo=' +
						this.prototype.roomNo,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data.result;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		resetPrototype: function () {
			this.prototype = {};
			this.result = {};
		},

		linkageRuleSearch: function () {
			this.$http
				.get(
					'/api/hotel/prototype/linkage/detail?username=' +
						this.linkageRule.username +
						'&ruleName=' +
						this.linkageRule.ruleName +
						'&roomNo=' +
						this.linkageRule.roomNo,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.linkageRuleResult.ruleName = res.data.result.ruleName;
						this.linkageRuleResult.conditions = res.data.result.hotelLinkageRuleCondition;
						this.linkageRuleResult.actions = res.data.result.hotelLinkageRuleAction;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},

		resetLinkageRule: function () {
			this.linkageRule = {};
		},
	},
};
</script>
