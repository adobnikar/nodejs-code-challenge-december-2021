import { Context } from 'koa';
const Log = require('unklogger');

/**
 * Logger middleware.
 * Log each request to the console.
 * Time the response and set the x-response-time response header.
 */
async function middleware(ctx: Context, next: () => Promise<any>) {
	const start = Number(new Date());
	// eslint-disable-next-line callback-return
	await next();
	const ms = Number(new Date()) - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	Log.info(`${ctx.method} ${ctx.url} - Responded with ${ctx.status} in ${ms}ms`);
}

module.exports = middleware;
