import { IMAGE_HOST } from '@/config';

export const replaceUrl = (url, removePrefix) => {
	if (!url) {
		return url;
	}
	// eslint-disable-next-line no-useless-escape
	const urlReg = /http[s]?:\/\/[^\/]+\/+/;

	if (_.isString(url)) {
		const relUrl = url.replace(urlReg, '');

		if (removePrefix) {
			return removePrefix + '/' + relUrl;
		}
		return relUrl;
	}
	return url;
};

export const wrapUrl = (url) => replaceUrl(url, IMAGE_HOST);

export const tripUrl = (url) => replaceUrl(url, '');
