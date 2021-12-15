'use strict';

import * as crypto from 'crypto';

export const CHARSET_az = 'abcdefghijklmnopqrstuvwxyz';
export const CHARSET_azAZ09 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Function that replaces characters.
 * http://locutus.io/php/strings/strtr/
 *
 * Example 1: strtr('äaabaåccasdeöoo', 'äåö', 'aao')
 * returns 1: 'aaabaaccasdeooo'
 * example 2: strtr('ääääääää', 'ä', 'a')
 * returns 2: 'aaaaaaaa'
 * example 3: strtr('http', 'pthxyz', 'xyzpth')
 * returns 3: 'zyyx'
 * example 4: strtr('zyyx', 'pthxyz', 'xyzpth')
 * returns 4: 'http'
 *
 * @param {string} _this
 * @param {string} trFrom
 * @param {string} trTo
 * @returns {string}
 */
export function strtr(_this: string, trFrom: string, trTo: string): string {
	if (trFrom.length != trTo.length)		{
		throw new Error('"trFrom" and "trTo" need to be the same length.');
	}

	// If nothing to replace then just return the original string.
	if (trFrom.length <= 0)		{
		return _this;
	}

	// Create character mapping.
	let map = new Map();
	let trFromArr: string[] = trFrom.split('');
	let trToArr: string[] = trTo.split('');
	for (let i = 0; i < trFromArr.length; i++)		{
		map.set(trFromArr[i], trToArr[i]);
	}

	// Replace the characters.
	let str = '';
	_this.split('').forEach((c) => {
		if (map.has(c)) {
			str += map.get(c);
		}	else {
			str += c;
		}
	});

	return str;
}

/**
 * This function is used to generate the JWT secret.
 *
 * @param {number} [size=20] The size of the token will be size*3 Bytes. This will produce size*4 characters.
 * @returns {string}
 */
export function generateSecret(size: number = 20): string {
	// Generate a random token.
	//    http://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
	//    http://stackoverflow.com/questions/1856785/characters-allowed-in-a-url
	//    Allowed chars in url: [A-Za-z0-9_.-~] and [%] for encoding
	//    http://stackoverflow.com/questions/13195143/range-of-valid-character-for-a-base-64-encoding
	//    Char is base64: [A-Za-z0-9+/] and [=] for padding

	// Token byte size should be a multiple of 3 so that there is no base64 padding added (=).
	const tokenSize = 3 * size; // 60

	return strtr(crypto.randomBytes(tokenSize).toString('base64'), '/+', '_-');
}
