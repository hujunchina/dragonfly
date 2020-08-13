<template>
	<div class="not-found-wrapper">
		<img
			src="https://images.tuyacn.com/rms-static/aea66160-d180-11ea-adc4-b9da6a747e43-1596016120438.png?tyName=not_found.png"
			alt="404"
		/>
		<p>对不起，您访问的页面已被删除或不存在</p>
		<div>
			<el-button type="primary" @click="linkToHome"> 首页 </el-button>
			<el-button style="margin-left: 16px;" @click="refreshPage"> 刷新 </el-button>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		linkToHome() {
			this.$router.push('/');
		},
		refreshPage() {
			window.location.reload();
		},
	},
};
</script>
<style lang="less" scoped>
.not-found-wrapper {
	margin-top: 15vh;
	text-align: center;
}
</style>
