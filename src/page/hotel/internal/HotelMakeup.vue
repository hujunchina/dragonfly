<style lang="scss" scoped>
.el-input {
	width: 280px;
}
</style>
<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="设备补偿" name="deviceMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="deviceId:">
								<el-input class="inputText" v-model="deviceMakeup.deviceId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="roomId:">
								<el-input class="inputText" v-model="deviceMakeup.roomId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="hotelId:">
								<el-input class="inputText" v-model="deviceMakeup.hotelId" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="makeupDevice()"
						>
							补偿
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetDeviceMakeup()"
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
		<el-tab-pane label="房间补偿" name="roomMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="type:">
								<el-input class="inputText" v-model="roomMakeup.type" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="roomId:">
								<el-input class="inputText" v-model="roomMakeup.roomId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="uid:">
								<el-input class="inputText" v-model="roomMakeup.uid" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-col :span="8">
							<el-form-item label="homeId:">
								<el-input class="inputText" v-model="roomMakeup.homeId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item label="constructionRoomId:">
								<el-input v-model="roomMakeup.constructionRoomId" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="makeupRoom()"
						>
							补偿
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetRoomMakeup()"
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
		<el-tab-pane label="施工状态补偿" name="constructionStatusMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="consRoomId:">
								<el-input
									class="inputText"
									v-model="constructionStatusMakeup.consRoomId"
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
							@click="makeupConstructionStatus()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetConstructionStatusMakeup()"
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
		<el-tab-pane label="房态补偿" name="roomStateMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="roomId:">
								<el-input class="inputText" v-model="roomStateMakeup.roomId" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="makeupRoomState()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetRoomStateMakeup()"
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
		<el-tab-pane label="酒店品牌商关系补偿" name="hotelBrandRelationMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="type:">
								<el-select v-model="hotelBrandRelationMakeup.type" placeholder="请选择">
									<el-option
										v-for="item in hotelRelationMakeupOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="hotelId:">
								<el-input
									class="inputText"
									v-model="hotelBrandRelationMakeup.hotelId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="brandUid:">
								<el-input
									class="inputText"
									v-model="hotelBrandRelationMakeup.brandUid"
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
							@click="makeupHotelBrandRelation()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetHotelBrandRelationMakeup()"
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
		<el-tab-pane label="酒店代理商关系补偿" name="hotelAgentRelationMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="type:">
								<el-select v-model="hotelAgentRelationMakeup.type" placeholder="请选择">
									<el-option
										v-for="item in hotelRelationMakeupOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="hotelId:">
								<el-input
									class="inputText"
									v-model="hotelAgentRelationMakeup.hotelId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="agentUid:">
								<el-input
									class="inputText"
									v-model="hotelAgentRelationMakeup.agentUid"
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
							@click="makeUpHotelAgentRelation()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetHotelAgentRelationMakeup()"
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
		<el-tab-pane label="删除昆仑代理商补偿" name="deleteKunLunAgentMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="topNamespace:">
								<el-input
									class="inputText"
									v-model="deleteKunLunAgentMakeup.topNamespace"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="namespace:">
								<el-input
									class="inputText"
									v-model="deleteKunLunAgentMakeup.namespace"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="adminId:">
								<el-input
									class="inputText"
									v-model="deleteKunLunAgentMakeup.adminId"
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
							@click="makeUpDeleteKunLunAgent()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetDeleteKunLunAgentMakeup()"
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
		<el-tab-pane label="酒店补偿" name="hotelMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="hotelId:">
								<el-input class="inputText" v-model="hotelMakeup.hotelId" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="type:">
								<el-select v-model="hotelMakeup.type" placeholder="请选择">
									<el-option
										v-for="item in hotelMakeupOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="brandUid:">
								<el-input class="inputText" v-model="hotelMakeup.brandUid" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="makeupHotel()"
						>
							补偿
						</el-button>
						<el-button style="margin-left: 15px;" type="primary" plain @click="resetHotelMakeup()"
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
		<el-tab-pane label="营业执照号加密补偿" name="businessNoMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="uid:">
								<el-input class="inputText" v-model="businessNoMakeup.uid" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="businessNo:">
								<el-input
									class="inputText"
									v-model="businessNoMakeup.businessNo"
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
							@click="makeUpBusinessNo()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetBusinessNoMakeup()"
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
		<el-tab-pane label="多语言词条补偿" name="rosettaItemMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="productId:">
								<el-input
									class="inputText"
									v-model="rosettaItemMakeup.productId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="itemName:">
								<el-input
									class="inputText"
									v-model="rosettaItemMakeup.itemName"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="zh:">
								<el-input class="inputText" v-model="rosettaItemMakeup.zh" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-col :span="8">
							<el-form-item label="en:">
								<el-input class="inputText" v-model="rosettaItemMakeup.en" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="ja:">
								<el-input class="inputText" v-model="rosettaItemMakeup.ja" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="ko:">
								<el-input class="inputText" v-model="rosettaItemMakeup.ko" clearable></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<br />
					<el-row>
						<el-button
							class="searchButton"
							type="primary"
							style="margin-left: 15px;"
							@click="makeUpRosettaItem()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetRosettaItemMakeup()"
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
		<el-tab-pane label="行业域名同步补偿" name="kunLunIndustryDomainMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="uid:">
								<el-input
									class="inputText"
									v-model="kunLunIndustryDomainMakeup.uid"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="industryUrl:">
								<el-input
									class="inputText"
									v-model="kunLunIndustryDomainMakeup.industryUrl"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="newDomain:">
								<el-input
									class="inputText"
									v-model="kunLunIndustryDomainMakeup.newDomain"
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
							@click="makeUpIndustryDomain()"
						>
							补偿
						</el-button>
						<el-button
							style="margin-left: 15px;"
							type="primary"
							plain
							@click="resetKunLunIndustryDomainMakeup()"
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
		<el-tab-pane label="失效入住单" name="invalidExpiredCheckinMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="checkinId:">
								<el-input
									class="inputText"
									v-model="invalidExpiredCheckin.checkinId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpInvalidExpiredCheckin()"
							>
								补偿
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetInvalidExpiredCheckin()"
							>
								重置
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="删除门锁密码" name="deleteDoorLockPasswordMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="grantId:">
								<el-input
									class="inputText"
									v-model="deleteDoorLockPassword.grantId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpDeleteDoorLockPassword()"
							>
								补偿
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetDeleteDoorLockPassword()"
							>
								重置
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="解除房间授权" name="releaseHotelRoomGrantMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="grantId:">
								<el-input
									class="inputText"
									v-model="releaseHotelRoomGrant.grantId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpReleaseHotelRoomGrant()"
							>
								补偿
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetReleaseHotelRoomGrant()"
							>
								重置
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="迁移入住单" name="moveCheckoutDataMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="checkinId:">
								<el-input
									class="inputText"
									v-model="moveCheckoutData.checkinId"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpMoveCheckoutData()"
							>
								补偿
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetMoveCheckoutData()"
							>
								重置
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="测试账号打标" name="markingTestUserMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="uid:">
								<el-input class="inputText" v-model="testUserMarking.uid" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="测试:">
								<el-switch
									v-model="testUserMarking.testFlag"
									active-color="#13ce66"
									inactive-color="#ff4949"
								></el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpMarkingTestUser()"
							>
								打标
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetTestUserMarking()"
							>
								重置
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<br />
			<div>
				<json-viewer :value="result"></json-viewer>
			</div>
		</el-tab-pane>
		<el-tab-pane label="测试开发者打标" name="markingTestDeveloperMakeup">
			<div>
				<el-form label-width="20%">
					<el-row>
						<el-col :span="8">
							<el-form-item label="uid:">
								<el-input class="inputText" v-model="testDeveloperMarking.uid" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="测试:">
								<el-switch
									v-model="testDeveloperMarking.testFlag"
									active-color="#13ce66"
									inactive-color="#ff4949"
								></el-switch>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-button
								class="searchButton"
								type="primary"
								style="margin-left: 15px;"
								@click="makeUpMarkingTestDeveloper()"
							>
								打标
							</el-button>
							<el-button
								style="margin-left: 15px;"
								type="primary"
								plain
								@click="resetTestDeveloperMarking()"
							>
								重置
							</el-button>
						</el-col>
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
			activeName: 'deviceMakeup',
			deviceMakeup: {
				deviceId: '',
				roomId: '',
				hotelId: '',
			},
			roomMakeup: {
				type: '',
				roomId: '',
				uid: '',
				constructionRoomId: '',
				homeId: '',
			},
			constructionStatusMakeup: {
				consRoomId: '',
			},
			roomStateMakeup: {
				roomId: '',
			},
			hotelRelationMakeupOptions: [
				{
					value: '1',
					label: '新增',
				},
				{
					value: '2',
					label: '删除',
				},
			],
			hotelBrandRelationMakeup: {
				type: '',
				hotelId: '',
				brandUid: '',
			},
			hotelAgentRelationMakeup: {
				type: '',
				hotelId: '',
				agentUid: '',
			},
			deleteKunLunAgentMakeup: {
				topNamespace: '',
				namespace: '',
				adminId: '',
			},
			hotelMakeupOptions: [
				{
					value: '1',
					label: '项目',
				},
				{
					value: '2',
					label: '项目施工授权',
				},
				{
					value: '3',
					label: '解除项目施工授权',
				},
			],
			hotelMakeup: {
				type: '',
				hotelId: '',
				brandUid: '',
			},
			businessNoMakeup: {
				uid: '',
				businessNo: '',
			},
			rosettaItemMakeup: {
				productId: '',
				itemName: '',
				zh: '',
				en: '',
				ja: '',
				ko: '',
			},
			kunLunIndustryDomainMakeup: {
				uid: '',
				industryUrl: '',
				newDomain: '',
			},
			invalidExpiredCheckin: {
				checkinId: '',
			},
			deleteDoorLockPassword: {
				grantId: '',
			},
			releaseHotelRoomGrant: {
				grantId: '',
			},
			moveCheckoutData: {
				checkinId: '',
			},
			testUserMarking: {
				uid: '',
				testFlag: true,
			},
			testDeveloperMarking: {
				uid: '',
				testFlag: true,
			},
			result: {},
		};
	},
	methods: {
		// 设备补偿
		makeupDevice: function () {
			this.$http
				.post('/api/hotel/makeup/device', {
					deviceId: this.deviceMakeup.deviceId,
					roomId: this.deviceMakeup.roomId,
					hotelId: this.deviceMakeup.hotelId,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetDeviceMakeup: function () {
			this.deviceMakeup = {};
			this.result = {};
		},

		// 房间补偿
		makeupRoom: function () {
			this.$http
				.post('/api/hotel/makeup/room', {
					type: this.roomMakeup.type,
					roomId: this.roomMakeup.roomId,
					uid: this.roomMakeup.uid,
					constructionRoomId: this.roomMakeup.constructionRoomId,
					homeId: this.roomMakeup.homeId,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetRoomMakeup: function () {
			this.roomMakeup = {};
			this.result = {};
		},

		// 房间施工状态补偿
		makeupConstructionStatus: function () {
			this.$http
				.post('/api/hotel/makeup/room/construction-status', {
					consRoomId: this.constructionStatusMakeup.consRoomId,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetConstructionStatusMakeup: function () {
			this.constructionStatusMakeup = {};
			this.result = {};
		},

		// 房态补偿
		makeupRoomState: function () {
			this.$http
				.post('/api/hotel/makeup/room/state', {
					roomId: this.roomStateMakeup.roomId,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetRoomStateMakeup: function () {
			this.roomStateMakeup = {};
			this.result = {};
		},

		// 酒店品牌商关系补偿
		makeupHotelBrandRelation: function () {
			this.$http
				.post('/api/hotel/makeup/brand/relation', {
					type: this.hotelBrandRelationMakeup.type,
					hotelId: this.hotelBrandRelationMakeup.hotelId,
					brandUid: this.hotelBrandRelationMakeup.brandUid,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetHotelBrandRelationMakeup: function () {
			this.hotelBrandRelationMakeup = {};
			this.result = {};
		},

		// 酒店代理商关系补偿
		makeUpHotelAgentRelation: function () {
			this.$http
				.post('/api/hotel/makeup/agent/relation', {
					type: this.hotelAgentRelationMakeup.type,
					hotelId: this.hotelAgentRelationMakeup.hotelId,
					agentUid: this.hotelAgentRelationMakeup.agentUid,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetHotelAgentRelationMakeup: function () {
			this.hotelAgentRelationMakeup = {};
			this.result = {};
		},

		// 删除代理商补偿
		makeUpDeleteKunLunAgent: function () {
			this.$http
				.delete(
					'/api/hotel/makeup/agent?topNamespace=' +
						this.deleteKunLunAgentMakeup.topNamespace +
						'&namespace=' +
						this.deleteKunLunAgentMakeup.namespace +
						'&adminId=' +
						this.deleteKunLunAgentMakeup.adminId,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetDeleteKunLunAgentMakeup: function () {
			this.deleteKunLunAgentMakeup = {};
			this.result = {};
		},

		// 酒店补偿
		makeupHotel: function () {
			this.$http
				.post('/api/hotel/makeup/hotel', {
					type: this.hotelMakeup.type,
					hotelId: this.hotelMakeup.hotelId,
					brandUid: this.hotelMakeup.brandUid,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetHotelMakeup: function () {
			this.hotelMakeup = {};
			this.result = {};
		},

		// 企业营业执照加密补偿
		makeUpBusinessNo: function () {
			this.$http
				.post('/api/hotel/makeup/business/license', {
					uid: this.businessNoMakeup.uid,
					businessNo: this.businessNoMakeup.businessNo,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetBusinessNoMakeup: function () {
			this.hotelMakeup = {};
			this.result = {};
		},

		// 多语言词条补偿
		makeUpRosettaItem: function () {
			this.$http
				.post('/api/hotel/makeup/rosetta/item', {
					productId: this.rosettaItemMakeup.productId,
					itemName: this.rosettaItemMakeup.itemName,
					zh: this.rosettaItemMakeup.zh,
					en: this.rosettaItemMakeup.en,
					ja: this.rosettaItemMakeup.ja,
					ko: this.rosettaItemMakeup.ko,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetRosettaItemMakeup: function () {
			this.rosettaItemMakeup = {};
			this.result = {};
		},

		// 昆仑行业域名同步补偿
		makeUpIndustryDomain: function () {
			this.$http
				.post('/api/hotel/makeup/industry/domain', {
					uid: this.kunLunIndustryDomainMakeup.uid,
					industryUrl: this.kunLunIndustryDomainMakeup.industryUrl,
					newDomain: this.kunLunIndustryDomainMakeup.newDomain,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetKunLunIndustryDomainMakeup: function () {
			this.kunLunIndustryDomainMakeup = {};
			this.result = {};
		},

		// 失效入住单
		makeUpInvalidExpiredCheckin: function () {
			this.$http
				.delete(
					'/api/hotel/makeup/invalid/checkin?checkinId=' + this.invalidExpiredCheckin.checkinId,
				)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetInvalidExpiredCheckin: function () {
			this.invalidExpiredCheckin = {};
			this.result = {};
		},

		// 删除门锁密码
		makeUpDeleteDoorLockPassword: function () {
			this.$http
				.delete('/api/hotel/makeup/door/lock?grantId=' + this.deleteDoorLockPassword.grantId)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetDeleteDoorLockPassword: function () {
			this.deleteDoorLockPassword = {};
			this.result = {};
		},

		// 解除房间授权
		makeUpReleaseHotelRoomGrant: function () {
			this.$http
				.delete('/api/hotel/makeup/room/grant?grantId=' + this.releaseHotelRoomGrant.grantId)
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetReleaseHotelRoomGrant: function () {
			this.releaseHotelRoomGrant = {};
			this.result = {};
		},

		// 迁移入住单
		makeUpMoveCheckoutData: function () {
			this.$http
				.post('/api/hotel/makeup/move/checkin', {
					checkinId: this.moveCheckoutData.checkinId,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetMoveCheckoutData: function () {
			this.moveCheckoutData = {};
			this.result = {};
		},

		// 测试账号打标
		makeUpMarkingTestUser: function () {
			this.$http
				.post('/api/hotel/makeup/marking/test/user', {
					uid: this.testUserMarking.uid,
					testFlag: this.testUserMarking.testFlag,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetTestUserMarking: function () {
			this.testUserMarking = {};
			this.result = {};
		},

		// 测试开发者打标
		makeUpMarkingTestDeveloper: function () {
			this.$http
				.post('/api/hotel/makeup/marking/test/developer', {
					uid: this.testDeveloperMarking.uid,
					testFlag: this.testDeveloperMarking.testFlag,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.result = res.data;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		resetTestDeveloperMarking: function () {
			this.testDeveloperMarking = {};
			this.result = {};
		},
	},
};
</script>
