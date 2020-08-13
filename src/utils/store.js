import localStore from 'store';
import expirePlugin from 'store/plugins/expire';

localStore.addPlugin(expirePlugin);

export const aSecond = 1000;
export const aMinute = 60 * aSecond;
export const anHour = 60 * aMinute;
export const aDay = anHour * 24;
export const aWeek = aDay * 7;
export const aMonth = aDay * 30;

const PROJECT_PREFIX = 'backendng-portal_';

export const ROUTE_PIN = PROJECT_PREFIX + 'ROUTE_PIN';

export default localStore;
