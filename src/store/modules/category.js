// 品类管理
import store from '@/store/store';
import fetch from '@/utils/fetch';

const PAGE_SIZE = 10;

const categoryModule = {
	namespaced: true,
	state: {
		// 搜索表单
		searchForm: {
			// 大类的code
			// String parentCode;
			// 品类code
			// String categoryCode;
		},
		categoryTableData: {
			list: [],
			pageInfo: {
				pageNo: 0,
				pageSize: 0,
				total: 0,
			},
			loading: false,
		},
		pagination: {
			pageSize: PAGE_SIZE,
		},
		category: {
			list: [],
			loading: false,
		},
		fullCategory: {
			list: [],
			loading: false,
		},
	},
	mutations: {
		setState(state, payload) {
			Object.assign(state, payload);
		},
		setSearchFrom(state, searchForm) {
			state.searchForm = { ...searchForm };
		},
		setPagination(state, pagination) {
			state.pagination = { ...pagination };
		},
		setCategoryTableData(state, payload) {
			state.categoryTableData = {
				...state.categoryTableData,
				...payload,
			};
		},
		setCategory(state, payload) {
			state.category = {
				...state.category,
				...payload,
			};
		},
	},
	actions: {
		async fetchCategoryTableData({ state, commit }, { pageNo }) {
			try {
				const { searchForm, pagination, categoryTableData } = state;
				if (categoryTableData.loading) {
					return;
				}
				pageNo = pageNo || categoryTableData.pageInfo.pageNo;
				commit('setCategoryTableData', { loading: true });
				const pageSize = pagination.pageSize;
				// datas 是一级品类
				const { datas, totalCount } = await fetch({
					// url: '/api/category/list2',
					url: '/api/category/searchProductCategory/v2',
					method: 'POST',
					data: {
						...searchForm,
						offset: (pageNo - 1) * pageSize,
						limit: pageSize,
					},
				});
				// 二级品类对应多个小类
				// 一个小类对应多个方案
				let tableData = [];
				datas.forEach((item) => {
					// 当 productSubCategoryList 是空, 二级品类字段都渲染空
					const { productSubCategoryList = [{}], ...others } = item;
					const subCategoryList = productSubCategoryList.length ? productSubCategoryList : [{}];
					let rowspan = 0;
					const list = [];
					subCategoryList.forEach((subCategory, index) => {
						const isLastItem = index === subCategoryList.length - 1;
						const planList = subCategory.accessModuleNgVOList || [{}];
						rowspan += planList.length;

						planList.forEach((plan, planIndex) => {
							const isFirstPlan = planIndex === 0;
							const subCategoryRowspan = isFirstPlan ? planList.length : 0;
							const isLastPlan = planIndex === planList.length - 1;
							const isLast = isLastItem && isLastPlan;
							list.push({
								...others,
								rowspan: 0,
								subCategory,
								subCategoryRowspan,
								plan,
							});
							if (isLast) {
								list[0].rowspan = rowspan;
								tableData = tableData.concat(list);
							}
						});
					});
				});

				commit('setCategoryTableData', {
					// Object.freeze 加速渲染
					list: Object.freeze(tableData),
					pageInfo: {
						total: totalCount,
						pageNo,
						pageSize,
					},
				});
			} catch (error) {
			} finally {
				commit('setCategoryTableData', { loading: false });
			}
		},
		// 获取一级分类
		async fetchCategoryLevel1({ state, commit }) {
			try {
				const { category } = state;
				if (category.loading) {
					return;
				}
				commit('setCategory', { loading: true });
				const res = await fetch({
					url: 'api/category/levelOne',
					method: 'POST',
					data: {},
				});
				const list = Object.entries(res).map(([value, label]) => {
					return { label: `${label} ${value}`, value };
				});
				commit('setCategory', { list });
				return list;
			} catch (error) {
				//
			} finally {
				commit('setCategory', { loading: false });
			}
		},
		/**
		 * 根据一级类目的 code
		 * 获取二级分类
		 */
		async fetchCategoryLevel2(store, { code }) {
			try {
				const data = await fetch({
					url: 'api/category/getCategoryByCode',
					method: 'GET',
					params: {
						parentCode: code,
					},
				});
				const list = data.map(({ categoryCode: value, categoryName: label }) => {
					return { label: `${label} ${value}`, value };
				});
				return list;
			} catch (error) {
				//
			} finally {
				//
			}
		},
		async fetchCategoryOneWithChild({ commit }) {
			try {
				const data = await fetch({
					url: '/api/category/getOneWithChild',
					method: 'GET',
				});
				const list = data?.list;
				commit('setState', {
					fullCategory: {
						list,
						loading: false,
					},
				});
				return list;
			} catch (error) {
				//
			} finally {
				//
			}
		},
	},
};

store.registerModule('category', categoryModule);
export default categoryModule;
