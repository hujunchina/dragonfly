import moment from 'moment';

export const timeFilter = (timestamp, format) => {
	return moment(timestamp).format(format);
};
