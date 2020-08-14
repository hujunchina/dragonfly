<template>
	<el-form ref="form" :model="showForm" label-width="80px" :rules="rules">
		<el-form-item label="display" prop="display">
			<el-input v-model="showForm.display" />
		</el-form-item>
		<el-form-item label="中文" prop="nameZh">
			<el-input v-model="showForm.nameZh" />
		</el-form-item>
		<el-form-item label="英文" prop="nameEn">
			<el-input v-model="showForm.nameEn" />
		</el-form-item>
	</el-form>
</template>
<script>
export default {
	data() {
		return {
			showForm: {
				display: '',
				nameZh: '',
				nameEn: '',
			},
			rules: {},
		};
	},
	mounted() {},
	props: {},
	methods: {},
};
</script>
