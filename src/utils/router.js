import { navMenus } from '@/config/navMenus/index';

export const getCurrentLabel = (name) => {
	const getChildren = (menus, pickedArr) => {
		pickedArr = pickedArr || [];

		for (let i = 0; i < menus.length; i++) {
			const groupItems = menus[i].groupItem || menus[i].children;

			groupItems && getChildren(groupItems, pickedArr);
			if (menus[i].children) {
				menus[i].children.forEach((item) => {
					if (item.name === name) {
						pickedArr.unshift(menus[i]);
					}
				});
			}
			if (menus[i].name === name) {
				pickedArr.unshift(menus[i]);

				return pickedArr;
			}
		}

		return pickedArr;
	};
	for (let i = 0; i < navMenus.length; i++) {
		if (navMenus[i].children) {
			const childNav = getChildren(navMenus[i].children);
			if (childNav.length) {
				childNav.unshift(navMenus[i]);
				return childNav;
			}
		}
	}

	return [];
};
