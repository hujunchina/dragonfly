// 引导页数据管理
// 云端wiki文档   https://wiki.tuya-inc.com:7799/pages/viewpage.action?pageId=51775000
import store from '@/store/store';
import fetch from '@/utils/fetch';

const guidanceModule = {
	state: {
		guidanceMainInfo: {}, // 首页信息
		guidancePageWayList: [], // 方案列表
		guidancePageElementInfo: {}, // 具体方案列表子项（引导页内容）
		cdnDomainAddr: '',
	},
	mutations: {
		setGuidanceMainInfo(state, payload) {
			state.guidanceMainInfo = JSON.parse(JSON.stringify(payload));
		},
		setGuidancePageWayList(state, payload) {
			state.guidancePageWayList = payload.concat();
		},
		setGuidancePageElementInfo(state, payload) {
			state.guidancePageElementInfo = JSON.parse(JSON.stringify(payload));
		},
		setCdnDomainAddr(state, payload) {
			state.cdnDomainAddr = payload;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async getMainInfo({ state, commit }, param) {
			const data = new FormData();
			data.append('productId', param);
			try {
				const response = await fetch({
					url: 'api/product/guide/get',
					method: 'POST',
					data,
				});
				commit('setGuidanceMainInfo', response.homePage || {});
				commit(
					'setGuidancePageWayList',
					response.homePage ? JSON.parse(response.homePage.content).buttonList : [],
				);
				commit('setGuidancePageElementInfo', response.guidePageMap ? response.guidePageMap : {});
				commit('setCdnDomainAddr', response.cdnDomainAddr);
			} catch (error) {}
		},
	},
};

store.registerModule('guidanceStore', guidanceModule);
export default guidanceModule;
