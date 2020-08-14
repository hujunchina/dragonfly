<template>
	<div>
		<el-form :inline="true">
			<el-form-item label="工单列表查询">
				<el-input v-model="idValue" placeholder="请输入id" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="idType" placeholder="请选择id类型">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="listOrder">查询</el-button>
			</el-form-item>
		</el-form>
		<basic-info v-bind:basicInfo="orderList"></basic-info>
	</div>
</template>

<script>
import BasicInfo from './BasicInfo';
export default {
	name: 'QueryList',
	components: {
		BasicInfo,
	},
	data() {
		return {
			idValue: '',
			idType: '',
			orderList: [],
			options: [
				{ value: 'room', label: '房间id' },
				{ value: 'device', label: '设备id' },
			],
		};
	},
	methods: {
		listOrder() {
			this.$http
				.get('/api/snoopy/order/basic-info/list?idValue=' + this.idValue + '&idType=' + this.idType)
				.then((res) => {
					if (res.data.code == 100) {
						this.orderList = res.data.result;
					} else if (res.data.code == undefined) {
					} else {
						this.$message.error('查询工单基本信息列表异常：' + res.data.msg);
					}
				});
		},
	},
};
</script>
