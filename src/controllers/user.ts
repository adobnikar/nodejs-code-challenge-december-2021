import { Context } from 'koa';
import { KoaContext, KoaResponseContext } from '../types/koa-request-body';
import Joi from '../helpers/joi-ext';

import * as AuthHelper from '../helpers/auth';
import User from '../models/user';

/**
 * Login.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} [type] Possible options are "dashboard" and "app".
 */
export async function login(ctx: KoaContext<any, any>, next: () => Promise<any>) {
	let body = Joi.attempt(ctx.request.body, Joi.object().keys({
		email: Joi.string().trim().max(255).required(),
		password: Joi.string().allow('').required(),
	}));

	let user = await AuthHelper.checkUserCredentials(ctx, User.where('email', body.email), body.password); // Check credentials.
	await AuthHelper.loginUser(ctx, user.id, true); // Login - create a new session.

	ctx.body = {
		message: 'Login successful.',
	};
}

/**
 * Logout.
 */
export async function logout(ctx: Context, next: () => Promise<any>) {
	await AuthHelper.logout(ctx); // Logout - destroy the current session.
	ctx.body = { message: 'Logout successful.' };
}

/**
 * Exported functions.
 * @type {Object}
 */
module.exports = {
	login,
	logout,
};
