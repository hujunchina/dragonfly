<template>
	<div class="deviceRecordContainer">
		<el-row>
			<el-col :span="8">
				<el-input placeholder="请输入设备id" v-model="deviceId" clearable class="input-with-select">
					<template slot="prepend">设备ID</template>
					<el-button slot="append" icon="el-icon-search" @click="searchDeviceRecord"></el-button>
				</el-input>
			</el-col>
			<el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
		</el-row>
		<div style="margin-top: 10px;"></div>
		<el-row>
			<el-col :span="8">
				<el-input placeholder="请输入网关ID" v-model="gwId" clearable class="input-with-select">
					<template slot="prepend">网关ID</template>
					<el-button slot="append" icon="el-icon-search" @click="searchDeviceRecord"></el-button>
				</el-input>
			</el-col>
			<el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
		</el-row>
		<div style="margin-top: 10px;"></div>
		<el-row>
			<el-col :span="8">
				<el-input placeholder="请输入sn号" v-model="sn" clearable class="input-with-select">
					<template slot="prepend">sn精确查询</template>
					<el-button slot="append" icon="el-icon-search" @click="searchDeviceRecord"></el-button>
				</el-input>
			</el-col>
			<el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
		</el-row>

		<div class="deviceTableWrap">
			<el-table :data="tableData" highlight-current-row size="medium" v-loading="loading">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="dp消息">
								<span>{{ props.row.data }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip label="ID" prop="id"></el-table-column>
				<el-table-column show-overflow-tooltip label="创建时间" prop="gmtCreate"></el-table-column>
				<el-table-column
					show-overflow-tooltip
					label="修改时间"
					prop="gmtModified"
				></el-table-column>
				<el-table-column show-overflow-tooltip label="网关id" prop="gatewayId"></el-table-column>
				<el-table-column show-overflow-tooltip label="设备id" prop="deviceId"></el-table-column>
				<el-table-column show-overflow-tooltip label="dp点" prop="dpid"></el-table-column>
				<el-table-column
					show-overflow-tooltip
					label="dp点消息"
					prop="data"
					class="dpMsgColumn"
				></el-table-column>
				<el-table-column show-overflow-tooltip label="sn" prop="strSn"></el-table-column>
				<el-table-column show-overflow-tooltip label="bsn" prop="bsn"></el-table-column>
				<el-table-column
					show-overflow-tooltip
					label="status"
					prop="processStatus"
				></el-table-column>
			</el-table>
			<div class="pageBtn">
				<el-button-group>
					<el-button
						type="primary"
						icon="el-icon-arrow-left"
						@click="prevFun"
						:disabled="prevUseable"
					>
						上一页
					</el-button>
					<el-button type="primary" @click="nextFun" :disabled="nextUseable">
						下一页
						<i class="el-icon-arrow-right el-icon--right"></i>
					</el-button>
				</el-button-group>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			deviceId: '',
			gwId: '',
			sn: '',
			limit: 50,
			current: 1,
			tableData: [],
			pageSize: 0,
			prevUseable: true,
			nextUseable: true,
			loading: false,
		};
	},
	methods: {
		searchDeviceRecord() {
			const devId = this.deviceId != '' && this.deviceId.length > 0 ? this.deviceId : '';
			const gwId = this.gwId != '' && this.gwId.length > 0 ? this.gwId : '';
			const snNo = this.sn != '' && this.sn.length > 0 ? this.sn : '';
			if (this.current == 1) {
				this.prevUseable = true;
			}
			this.loading = true;
			this.$http
				.get('/api/saas/devicemanage/dpinfo/list', {
					params: {
						gatewayId: gwId,
						deviceId: devId,
						sn: snNo,
						startCursor: 1,
						limit: this.limit,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						this.pageSize = this.calcPageSize(
							res.data.result.data.limit,
							res.data.result.data.total,
						);
						this.tableData = res.data.result.data.content;
						this.processTime(this.tableData);
						if (this.pageSize > 1) {
							this.nextUseable = false;
						} else {
							this.nextUseable = true;
						}
						this.current = res.data.result.current;
						if (this.current == 1) {
							this.prevUseable = true;
						}
					}
				});
		},
		prevFun() {
			const devId = this.deviceId != '' && this.deviceId.length > 0 ? this.deviceId : '';
			const gwId = this.gwId != '' && this.gwId.length > 0 ? this.gwId : '';
			const snNo = this.sn != '' && this.sn.length > 0 ? this.sn : '';
			this.current = this.current - 1;
			if (this.current <= 1) {
				this.current = 1;
				this.prevUseable = true;
			}
			this.nextUseable = false;
			this.loading = true;
			this.$http
				.get('/api/saas/devicemanage/dpinfo/list', {
					params: {
						gatewayId: gwId,
						deviceId: devId,
						sn: snNo,
						startCursor: this.current,
						limit: this.limit,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						this.pageSize = this.calcPageSize(
							res.data.result.data.limit,
							res.data.result.data.total,
						);
						this.tableData = res.data.result.data.content;
						this.processTime(this.tableData);
					}
				});
		},
		nextFun() {
			const devId = this.deviceId != '' && this.deviceId.length > 0 ? this.deviceId : '';
			const gwId = this.gwId != '' && this.gwId.length > 0 ? this.gwId : '';
			const snNo = this.sn != '' && this.sn.length > 0 ? this.sn : '';
			this.current = this.current + 1;
			if (this.current >= this.pageSize) {
				this.current = this.pageSize;
				this.nextUseable = true;
			}
			this.prevUseable = false;
			this.loading = true;
			this.$http
				.get('/api/saas/devicemanage/dpinfo/list', {
					params: {
						gatewayId: gwId,
						deviceId: devId,
						sn: snNo,
						startCursor: this.current,
						limit: this.limit,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						this.pageSize = this.calcPageSize(
							res.data.result.data.limit,
							res.data.result.data.total,
						);
						this.tableData = res.data.result.data.content;
						this.processTime(this.tableData);
					}
				});
		},
		processTime(data) {
			if (data.length > 0) {
				data.forEach((element) => {
					element.gmtCreate = this.transformTime(element.gmtCreate);
					element.gmtModified = this.transformTime(element.gmtModified);
				});
			}
		},
		transformTime(timestamp) {
			if (timestamp) {
				const time = new Date(timestamp);
				const y = time.getFullYear();
				const M = time.getMonth() + 1;
				const d = time.getDate();
				const h = time.getHours();
				const m = time.getMinutes();
				const s = time.getSeconds();
				const ms = time.getMilliseconds();
				return (
					y +
					'-' +
					this.addZero(M) +
					'-' +
					this.addZero(d) +
					' ' +
					this.addZero(h) +
					':' +
					this.addZero(m) +
					':' +
					this.addZero(s) +
					':' +
					this.addZero(ms)
				);
			} else {
				return '';
			}
		},
		addZero(m) {
			return m < 10 ? '0' + m : m;
		},
		calcPageSize(limit, total) {
			if (limit == 0) {
				return 0;
			}
			return Math.ceil(total / limit);
		},
	},
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
	font-size: 0;
}

.deviceTableWrap {
	.pageBtn {
		float: right;
	}
}
</style>
