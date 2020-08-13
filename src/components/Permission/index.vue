<template>
	<el-tooltip :content="id">
		<slot />
	</el-tooltip>
</template>
<script>
export default {
	name: 'Permission',
};
</script>
