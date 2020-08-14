<style lang="scss" scoped>
.el-input {
	width: 280px;
}
</style>
<template>
	<el-tabs v-model="activeName">
		<el-tab-pane label="工单详情" name="first">
			<el-form :inline="true">
				<el-form-item label="工单详情查询">
					<el-input
						v-model="orderId"
						placeholder="请输入工单编号"
						clearable
						@input="handleInput"
						maxlength="19"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getOrder">查询工单</el-button>
				</el-form-item>
			</el-form>
			<basic-info v-bind:basicInfo="basicInfo"></basic-info>
			<order-detail
				v-bind:orderId="orderId"
				v-bind:orderRooms="orderRooms"
				v-bind:orderTasks="orderTasks"
				v-bind:wifi="wifiDevCategory"
				v-bind:zigbee="zigbeeDevCategory"
			></order-detail>
		</el-tab-pane>
		<el-tab-pane label="工单查询" name="second">
			<query-list></query-list>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
import BasicInfo from './components/orders/BasicInfo';
import OrderDetail from './components/orders/OrderDetail';
import QueryList from './components/orders/QueryList';
export default {
	components: {
		BasicInfo,
		OrderDetail,
		QueryList,
	},
	data() {
		return {
			activeName: 'first',
			orderId: '',
			basicInfo: [],
			orderRooms: [],
			orderTasks: [],
			wifiDevCategory: [],
			zigbeeDevCategory: [],
		};
	},
	methods: {
		getOrder() {
			if (this.orderId == '' || this.orderId == null) {
				return;
			}
			this.getOrderBasicInfo();
			this.getOrderRooms();
			this.getOrderTask();
		},
		getOrderBasicInfo() {
			this.$http.get('/api/snoopy/order/basic-info?orderId=' + this.orderId).then((res) => {
				if (res.data.code == 100) {
					this.basicInfo = [];
					if (res.data.result != undefined && res.data.result != null) {
						this.basicInfo.splice(0, 1, res.data.result);
						if (res.data.result.orderType == 1) {
							this.getOrderDevCategory();
						}
					}
				} else if (res.data.code == undefined) {
					this.basicInfo = [];
				} else {
					this.basicInfo = [];
					this.$message.error('查询工单基本详情异常：' + res.data.msg);
				}
			});
		},
		getOrderRooms() {
			this.$http.get('/api/snoopy/order/room?orderId=' + this.orderId).then((res) => {
				if (res.data.code == 100) {
					this.orderRooms = res.data.result;
				} else if (res.data.code == undefined) {
				} else {
					this.$message.error('查询房间列表异常：' + res.data.msg);
				}
			});
		},
		getOrderTask() {
			this.$http.get('/api/snoopy/order/task?orderId=' + this.orderId).then((res) => {
				if (res.data.code == 100) {
					this.orderTasks = res.data.result;
				} else if (res.data.code == undefined) {
				} else {
					this.$message.error('查询任务列表异常：' + res.data.msg);
				}
			});
		},
		getOrderDevCategory() {
			this.$http.get('/api/snoopy/order/dev-category?orderId=' + this.orderId).then((res) => {
				if (res.data.code == 100) {
					this.wifiDevCategory = [];
					this.zigbeeDevCategory = [];
					res.data.result.forEach((element) => {
						if (element.deviceType == 1) {
							this.wifiDevCategory.push(element);
						}
						if (element.deviceType == 2) {
							this.zigbeeDevCategory.push(element);
						}
					});
				} else if (res.data.code == undefined) {
				} else {
					this.$message.error('查询施工设备品类异常：' + res.data.msg);
				}
			});
		},
		handleInput() {
			this.orderId = this.orderId.replace(/[^\d]/g, '');
		},
	},
};
</script>
