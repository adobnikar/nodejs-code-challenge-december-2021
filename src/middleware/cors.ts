import { Context } from 'koa';

const get = require('lodash/get');
const url = require('url');

function getClientBaseUrl(ctx: Context) {
	let clientBaseUrl = get(ctx, 'headers.referer', null);
	if (clientBaseUrl == null) clientBaseUrl = get(ctx, 'request.headers.origin', null);
	if (clientBaseUrl == null) clientBaseUrl = ctx.origin;
	clientBaseUrl = url.parse(clientBaseUrl);
	clientBaseUrl.path = clientBaseUrl.path || '/';
	clientBaseUrl = `${clientBaseUrl.protocol}//${clientBaseUrl.host}`;
	return clientBaseUrl;
}

/**
 * CORS middleware.
 * Access-Control-Allow-Origin set to any URL if in development mode.
 */
async function middleware(ctx: Context, next: () => Promise<any>) {
	// eslint-disable-next-line callback-return
	await next();

	let origin = getClientBaseUrl(ctx);
	ctx.set('Access-Control-Allow-Origin', origin);
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, CST, X-SECURITY-TOKEN, X-Requested-With, Content-Length, cache-control, x-subdomain-dev, x-view-type');
	ctx.set('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,POST,PUT,DELETE');
	ctx.set('Allow', 'HEAD,OPTIONS,GET,POST,PUT,DELETE');
	ctx.set('Access-Control-Expose-Headers', 'date, set-cookie, ' +
		'x-set-auth-token, x-response-time, x-deprecated');
}

module.exports = middleware;
