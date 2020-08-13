import cookies from 'js-cookie';

export const cookie = cookies;

export const applyLoginData = (data) => {
	cookie.set('nickname', data.nick, 1);
	if (cookie.get('isLogin') != 1) {
		window.location.reload();
	}
	cookie.set('isLogin', 1, 1);
};
