<template>
	<div>
		<div class="mainView">
			<router-view class="viewSiderBar"></router-view>
			<router-view class="viewMainBar" name="saasRight"></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'saasTools',
};
</script>

<style lang="scss" scoped>
.mainView {
	display: flex;
	flex-direction: row;
	.viewMainBar {
		width: 100%;
		padding-left: 20px;
	}
}

.container {
	display: flex;
	flex-direction: row;
	height: 80px;
	margin: 10px 10px 0 10px;
}

.logo {
	width: 60px;
	height: 60px;
	transform: rotate(0deg) scale(1) translateZ(0);
	cursor: pointer;
	transition: all 0.4s cubic-bezier(0.8, 1.8, 0.75, 0.75);
	animation: bounceIn 0.6s;
}

.logo:hover {
	transform: rotate(10deg) scale(1.1);
}

.bubble {
	fill: #e76853;
}
.icon {
	fill: #fff;
}

@keyframes bounceIn {
	0% {
		transform: scale(0.3);
		opacity: 1;
	}

	50% {
		transform: scale(1.05);
		opacity: 1;
	}

	70% {
		transform: scale(0.9);
		opacity: 1;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>
