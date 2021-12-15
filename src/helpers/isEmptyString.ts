const isString = require('lodash/isString');

export default function isEmptyString(str: any) {
	if (!isString(str)) return false;
	return str.trim().length <= 0;
}
