<template>
	<transition>
		<router-view></router-view>
	</transition>
</template>
<script>
import { mapActions } from 'vuex';

export default {
	components: {},
	created() {
		this.fetchData();
	},
	methods: {
		...mapActions({ add_Routes: 'add_Routes' }),
		fetchData() {
			// 获取用户信息
			this.$store.dispatch('fetchUserInfo');
			this.$store.dispatch('fetchBaseConfig');
		},
		getRouterAndNav() {
			this.$http
				.post('/api/routerAndNav', {})
				.then((res) => {
					// 将路由信息，菜单信息，用户信息存到sessionStorage里
					localStorage.setItem('routes', JSON.stringify(res.data.result));
					this.add_Routes(res.data.result); // 触发vuex里的增加路由
					return res.data.result;
				})
				.catch(() => {});
		},
	},
};
</script>
