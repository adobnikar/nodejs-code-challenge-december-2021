import { Context } from 'koa';

const AuthHelper = require('../helpers/auth');

/**
 * Authorization middleware.
 * This function checks if the user is logged in by checking if a user session is present.
 * It also attaches the user to the context state.
 */
export async function auth(ctx: Context, next: () => Promise<any>) {
	// Check if the auth token present and valid.
	let token = await AuthHelper.getToken(ctx);

	// Check if the user session is present.
	if (token == null) {
		ctx.throw(401, 'Not authorized. Please login.');
	}

	try {
		// Set the user as authorized.
		AuthHelper.setAuthUser(ctx, token);
	} catch (err) {
		ctx.throw(401, 'Not authorized. Please login.');
	}

	// Execute the route.
	if (next != null) await next();
}

/**
 * Middleware that checks if user has any of the given roles.
 *
 * @param roleList (array of strings) Or-List of roles.
 */
export function roles(roleList: string | string[]): (ctx: Context, next: () => Promise<any>) => Promise<void> {
	// If roleList not an array the encapsulate it into an array.
	if (roleList.constructor !== Array) {
		roleList = [roleList as string];
	}

	return async function(ctx: Context, next: () => Promise<any>) {
		// Check if the user is logged in.
		if (ctx.state.user == null) {
			ctx.throw(401, 'Not authorized. Please login.');
		}
		if (ctx.state.user.loginCodeVerified !== true) {
			ctx.throw(403, 'Forbidden. Please verify your login attempt with the verification code in the email that was sent to you.');
		}

		// Check if user any of the roles in the list.
		if (!ctx.state.user.hasRole(roleList)) {
			// None of the roles matched.
			ctx.throw(403, 'Forbidden. You are missing the permission to perform this action.');
		}

		// Execute the route.
		if (next != null) await next();
	};
}
