import { isArray, isString } from 'lodash';

/**
 * Database roles.
 */

const ROLES = ['user', 'admin'];
const ROLES_SET = new Set(ROLES);

/**
 * Check if a role exists.
 *
 * @param {string} role Role name.
 *
 * @returns {boolean} Role exists.
 */
export function dbRoleExists(role: string) {
	return ROLES_SET.has(role);
}

export function index() {
	return ROLES;
}

export function resolveRoles(roles: string | string[]) {
	if (!isArray(roles)) roles = [roles];
	let checkedRoles = [];
	for (let role of roles) {
		if (!dbRoleExists(role)) {
			throw new Error(`Role "${role}" does not exist.`);
		}
		checkedRoles.push(role);
	}
	return checkedRoles;
}

export function formatRole(roles: string | string[]) {
	if (roles == null) return null;
	if (!isArray(roles)) roles = [roles];
	let role = 'none';
	if (roles.length > 0) {
		if (isString(roles[0])) role = roles[0];
		else role = (<any>roles[0]).name;
	}
	return role;
}
