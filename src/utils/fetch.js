import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({
	timeout: 30000,
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => {
		if (response.data.code === '100') {
			return response.data.result;
		}
		Message.error(response.data.msg || '请求错误');
		return Promise.reject(response);
	},
	(error) => {
		Message.error(error.message);
		return Promise.reject(error.response || error);
	},
);

export default instance;
