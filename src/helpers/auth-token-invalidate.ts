'use strict';

const isInteger = require('lodash/isInteger');

// TODO: maybe use REDIS some day
export const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 min in milliseconds.
const INVALIDATED_SESSIONS = new Map();
const INVALIDATED_USERS = new Map();
const TIMEOUTS_SESSIONS = new Map();
const TIMEOUTS_USERS = new Map();

export function isValid(decoded: any) {
	if (!isInteger(decoded.c)) return false;

	let uid = INVALIDATED_USERS.get(decoded.u);
	if ((uid != null) && (decoded.c <= uid)) return false;

	let sid = INVALIDATED_SESSIONS.get(decoded.s);
	if ((sid != null) && (decoded.c <= sid)) return false;

	return true;
}

export function invalidateSession(sessionId: number) {
	INVALIDATED_SESSIONS.set(sessionId, Date.now());
	clearTimeout(TIMEOUTS_SESSIONS.get(sessionId));
	let tRef = setTimeout(() => {
		INVALIDATED_SESSIONS.delete(sessionId);
		TIMEOUTS_SESSIONS.delete(sessionId);
	}, ACCESS_TOKEN_MAX_AGE * 2);
	TIMEOUTS_SESSIONS.set(sessionId, tRef);
}

export function invalidateUser(userId: number) {
	INVALIDATED_USERS.set(userId, Date.now());
	clearTimeout(TIMEOUTS_USERS.get(userId));
	let tRef = setTimeout(() => {
		INVALIDATED_USERS.delete(userId);
		TIMEOUTS_USERS.delete(userId);
	}, ACCESS_TOKEN_MAX_AGE * 2);
	TIMEOUTS_USERS.set(userId, tRef);
}
