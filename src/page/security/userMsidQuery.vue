<template>
	<div>
		<el-row>
			<el-input v-model="uidInput" placeholder="请输入uid" class="uid-input"></el-input>
			<el-button type="primary" @click="searchUid">查询</el-button>
		</el-row>
		<el-table :data="uidList" border style="width: 100%;">
			<!--      <el-table-column prop="uid" label="uid"></el-table-column>-->
			<el-table-column prop="msid" label="msid"></el-table-column>
		</el-table>
	</div>
</template>

<style lang="scss" scoped>
.uid-input {
	width: 300px;
	margin-right: 10px;
	margin-bottom: 30px;
}
</style>

<script>
export default {
	data() {
		return {
			uidInput: '',
			uidList: [],
			baseUrl: 'http://localhost:3001',
		};
	},
	components: {},

	computed: {},

	methods: {
		searchUid() {
			// api/security/userInfo/dev?devId=${this.devIdInput}`;
			const url = `api/security/userInfo/msid?userId=${this.uidInput}`;
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
				this.uidList = resData.result;
			});
		},
	},
};
</script>
