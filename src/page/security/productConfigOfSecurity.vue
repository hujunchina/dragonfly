<template>
	<div>
		<el-row>
			<el-input v-model="pidInput" placeholder="请输入pid" class="pid-input"></el-input>
			<el-button type="primary" @click="searchPid">查询</el-button>
		</el-row>
		<el-table :data="pidList" border style="width: 100%;">
			<el-table-column prop="id" label="pid"></el-table-column>
			<el-table-column prop="name" label="名称"></el-table-column>
			<el-table-column prop="model" label="类别"></el-table-column>
			<el-table-column prop="action" label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="jumpToDetail(scope.row)">配置</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style lang="scss" scoped>
.pid-input {
	width: 300px;
	margin-right: 10px;
	margin-bottom: 30px;
}
</style>

<script>
export default {
	data() {
		return {
			pidInput: '',
			pidList: [],
			baseUrl: 'http://localhost:3001',
		};
	},
	components: {},

	computed: {},

	methods: {
		jumpToDetail(row) {
			const { href } = this.$router.resolve({
				name: 'productConfigOfSecurityDetail',
				query: {
					pid: row.id,
				},
			});
			window.open(href);
		},
		searchPid() {
			// let url = this.baseUrl + `/api/product/get?productId=${this.pidInput}`;
			const url = `/api/product/get?productId=${this.pidInput}`;
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
				this.pidList = resData.result;
			});
		},
	},
};
</script>
