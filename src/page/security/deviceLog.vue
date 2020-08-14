<template>
	<div>
		<el-row>
			<el-input v-model="devIdInput" placeholder="请输入devId" class="devId-input"></el-input>
			<el-button type="primary" @click="searchDevid">查询</el-button>
		</el-row>
		<el-table :data="uIdList" style="width: 100%;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="用户id">
							<span>{{ props.row.uid }}</span>
						</el-form-item>
						<el-form-item label="销售商id">
							<span>{{ props.row.dealerId }}</span>
						</el-form-item>
						<el-form-item label="渠道商ID">
							<span>{{ props.row.channelId }}</span>
						</el-form-item>
						<el-form-item label="biz">
							<span>{{ props.row.biz }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="用户ID" prop="uid"></el-table-column>
			<el-table-column label="销售商id" prop="dealerId"></el-table-column>
			<el-table-column label="渠道商id" prop="channelId"></el-table-column>
		</el-table>
	</div>
</template>

<style scoped>
.devId-input {
	width: 300px;
	margin-right: 10px;
	margin-bottom: 30px;
}
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

<script>
export default {
	data() {
		return {
			devIdInput: '',
			uIdList: [],
			baseUrl: 'http://localhost:3001',
		};
	},
	components: {},

	computed: {},

	methods: {
		// jumpToDetail(row) {
		//   const { href } = this.$router.resolve({
		//     name: 'productConfigOfSecurityDetail',
		//     query: {
		//       pid: row.id,
		//     },
		//   });
		//   window.open(href);
		// },
		searchDevid() {
			// let url = this.baseUrl + `/api/product/get?productId=${this.devIdInput}`;
			const url = `api/security/userInfo/dev?devId=${this.devIdInput}`;
			// const url = `/api/product/get?productId=${this.devIdInput}`;
			this.$http.get(url).then((res) => {
				const resData = res.data;
				if (resData.code == '102') {
					this.$message.error(resData.msg);
					return false;
				}
				if (resData.code == '101') {
					this.$message.error('服务器繁忙');
					return false;
				}
				this.uIdList = resData.result;
			});
		},
	},
};
</script>
