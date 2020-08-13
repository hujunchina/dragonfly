/**
 * 通讯类型
 *
 * 使用方法
 * import '@/store/modules/capability.js';
 *
 * ...mapState({
 *   communicationList: (state) => state.capability?.communicationList || [],
 * }),
 *
 * mounted() {
 *   this.$store.dispatch('capability/fetchCommunicationList');
 * },
 */
import store from '@/store/store';
import fetch from '@/utils/fetch';

const capabilityModule = {
	namespaced: true,
	state: {
		communicationLoading: false,
		communicationList: [],
	},
	mutations: {
		setState(state, payload) {
			Object.assign(state, payload);
		},
	},
	actions: {
		async fetchCommunicationList({ state, commit }) {
			const { communicationLoading, communicationList } = state;
			if (communicationLoading) {
				return;
			}
			if (communicationList.length > 0) {
				return;
			}
			try {
				commit('setState', { communicationLoading: true });
				const list = await fetch({
					url: '/api/capability/communication/select',
					method: 'GET',
				});
				list.sort((prev, next) => {
					return prev.order - next.order;
				});
				commit('setState', {
					communicationList: list,
				});
			} catch (error) {
			} finally {
				commit('setState', { communicationLoading: false });
			}
		},
	},
};

store.registerModule('capability', capabilityModule);
export default capabilityModule;
