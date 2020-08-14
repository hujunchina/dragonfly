<style lang="scss" scoped>
.el-input {
	width: 280px;
}
</style>
<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="查询加密数据" name="queryEncryptData">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="tableName:">
								<el-input
									class="inputText"
									v-model="queryEncryptData.tableName"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="columnName:">
								<el-input
									class="inputText"
									v-model="queryEncryptData.columnName"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="columnValue:">
								<el-input
									class="inputText"
									v-model="queryEncryptData.columnValue"
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
							style="margin-left: 15px;"
							@click="queryEncryptDataForDB()"
						>
							查询
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="value:">
								<el-input class="inputText" v-model="queryEncryptData.value" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="encrypt()"
						>
							加密
						</el-button>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="decrypt()"
						>
							解密
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetQueryEncryptData()"
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
		<el-tab-pane label="查询Redis" name="queryRedis">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="redisKey:">
								<el-input class="inputText" v-model="queryRedis.redisKey" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="redisQuery()"
						>
							查询
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetQueryRedis()"
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
		<el-tab-pane label="查询验证码" name="queryVerifyCode">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="type:">
								<el-input class="inputText" v-model="queryVerifyCode.type" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="username:">
								<el-input class="inputText" v-model="queryVerifyCode.username" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="verifyCodeQuery()"
						>
							查询
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetQueryVerifyCode()"
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
		<el-tab-pane label="失效令牌" name="expireToken">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="username:">
								<el-input class="inputText" v-model="expireToken.username" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="adminId:">
								<el-input class="inputText" v-model="expireToken.adminId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="accountType:">
								<el-select v-model="expireToken.accountType" placeholder="请选择">
									<el-option
										v-for="item in accountTypeOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="clientId:">
								<el-input class="inputText" v-model="expireToken.clientId" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="tokenExpire()"
						>
							执行
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetExpireToken()"
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
		<el-tab-pane label="删除行业审核" name="removeIndustryAudit">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="auditId:">
								<el-input
									class="inputText"
									v-model="removeIndustryAudit.auditId"
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
							style="margin-left: 15px;"
							@click="industryAuditRemove()"
						>
							执行
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetRemoveIndustryAudit()"
						>
							重置
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="刷新国家码" name="refreshCountries">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="refreshCountries()"
						>
							刷新
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="获取行业域名不同步的uid列表" name="listDomainNotSynchronizeUids">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="listDomainNotSynchronizeUids()"
						>
							查询
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="查询多语言词条" name="getRosettaItem">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="itemName:">
								<el-input class="inputText" v-model="getRosettaItem.itemName" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="queryRosettaItem()"
						>
							查询
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetGetRosettaItem()"
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
		<el-tab-pane label="获取未迁移checkin" name="listNotCheckoutCheckinData">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="queryNotCheckoutCheckinData()"
						>
							查询
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="获取未失效授权记录" name="listExpiredHotelRoomGrant">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="queryExpiredHotelRoomGrant()"
						>
							查询
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="获取未失效门锁授权记录" name="listNotDeleteDoorLockHotelRoomGrant">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="queryNotDeleteDoorLockHotelRoomGrant()"
						>
							查询
						</el-button>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
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
			activeName: 'queryEncryptData',
			queryEncryptData: {
				tableName: '',
				columnName: '',
				columnValue: '',
				value: '',
			},
			queryRedis: {
				redisKey: '',
			},
			queryVerifyCode: {
				type: '',
				username: '',
			},
			accountTypeOptions: [
				{
					value: '1',
					label: '主账号',
				},
				{
					value: '2',
					label: '子账号',
				},
			],
			expireToken: {
				username: '',
				adminId: '',
				accountType: '',
				clientId: '',
			},
			removeIndustryAudit: {
				auditId: '',
			},
			getRosettaItem: {
				itemName: '',
			},
			result: {},
		};
	},
	methods: {
		// 查询数据库加密数据
		queryEncryptDataForDB: function () {
			this.$http
				.get(
					'/api/hotel/execute/query-encrypt-data?tableName=' +
						this.queryEncryptData.tableName +
						'&columnName=' +
						this.queryEncryptData.columnName +
						'&columnValue=' +
						this.queryEncryptData.columnValue,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		// 加密
		encrypt: function () {
			this.$http
				.get('/api/hotel/execute/encrypt?value=' + this.queryEncryptData.value)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		// 解密
		decrypt: function () {
			this.$http
				.get('/api/hotel/execute/decrypt?value=' + this.queryEncryptData.value)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetQueryEncryptData: function () {
			this.queryEncryptData = {};
			this.result = {};
		},

		// 查询redis
		redisQuery: function () {
			this.$http
				.get('/api/hotel/execute/redis?redisKey=' + this.queryRedis.redisKey)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetQueryRedis: function () {
			this.queryRedis = {};
			this.result = {};
		},

		// 查询redis验证码
		verifyCodeQuery: function () {
			this.$http
				.get(
					'/api/hotel/execute/verify-code?username=' +
						this.queryVerifyCode.username +
						'&type=' +
						this.queryVerifyCode.type,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetQueryVerifyCode: function () {
			this.queryVerifyCode = {};
			this.result = {};
		},

		// 失效令牌
		tokenExpire: function () {
			this.$http
				.get(
					'/api/hotel/execute/expire-token?username=' +
						this.expireToken.username +
						'&adminId=' +
						this.expireToken.adminId +
						'&clientId=' +
						this.expireToken.clientId +
						'&accountType=' +
						this.expireToken.accountType,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetExpireToken: function () {
			this.expireToken = {};
			this.result = {};
		},

		// 删除行业审核记录
		industryAuditRemove: function () {
			this.$http
				.delete('/api/hotel/execute/industry/record?auditId=' + this.removeIndustryAudit.auditId)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetRemoveIndustryAudit: function () {
			this.removeIndustryAudit = {};
			this.result = {};
		},

		// 刷新国家码
		refreshCountries: function () {
			this.$http.post('/api/hotel/execute/refresh/countries', {}).then((res) => {
				if (res.data.code == 100) {
					this.result = res.data;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 获取KunLun行业域名不同步uid列表
		listDomainNotSynchronizeUids: function () {
			this.$http.get('/api/hotel/execute/not-sync/industry/domain/uids').then((res) => {
				if (res.data.code == 100) {
					this.result = res.data;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 查询多语言词条
		queryRosettaItem: function () {
			this.$http
				.get('/api/hotel/execute/rosetta/item?itemName=' + this.getRosettaItem.itemName)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetGetRosettaItem: function () {
			this.getRosettaItem = {};
			this.result = {};
		},

		// 获取未迁移checkout表的checkin入住单数据
		queryNotCheckoutCheckinData: function () {
			this.$http.get('/api/hotel/execute/checkout/orders').then((res) => {
				if (res.data.code == 100) {
					this.result = res.data;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 获取未失效的房间授权记录列表
		queryExpiredHotelRoomGrant: function () {
			this.$http.get('/api/hotel/execute/expire/room/grants').then((res) => {
				if (res.data.code == 100) {
					this.result = res.data;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},

		// 获取未失效门锁的房间授权记录列表
		queryNotDeleteDoorLockHotelRoomGrant: function () {
			this.$http.get('/api/hotel/execute/expired/door/lock/room/grants').then((res) => {
				if (res.data.code == 100) {
					this.result = res.data;
				} else {
					this.$message.error('程序异常！' + res.data.msg);
				}
			});
		},
	},
};
</script>
