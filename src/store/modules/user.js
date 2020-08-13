// 使用方法
// 用户信息
import axios from 'axios';
import localStore, { aDay } from '@/utils/store';
import cookies from 'js-cookie';

// USER_NAME_KEY, 不能随便改, 要兼容旧代码
const USER_NAME_KEY = 'nickname';

// 用户信息
const USER_INFO_KEY = 'userInfo';

const user = {
	namespaced: false, // 不设 namespace
	state: {
		userInfo: {},
	},
	getters: {
		userInfo: (state) => {
			return state.userInfo || {};
		},
	},
	mutations: {
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			const { nick } = userInfo;
			// 兼容旧代码
			cookies.set(USER_NAME_KEY, nick, { expires: 1 });
		},
	},
	actions: {
		async fetchUserInfo({ commit }) {
			let userInfo = localStore.get(USER_INFO_KEY);
			if (!userInfo) {
				// 避免重复调用接口
				const res = await axios({
					method: 'POST',
					url: '/api/getLog',
				});
				userInfo = res.data.user;
			}
			// 只缓存一天, 避免数据失去时效性
			localStore.set(USER_INFO_KEY, userInfo, Date.now() + aDay);
			commit('setUserInfo', userInfo);
		},
	},
};

export default user;
