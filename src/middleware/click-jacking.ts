import { Context } from 'koa';

/**
 * Click-jacking middleware.
 * Source: https://security.stackexchange.com/questions/158045/is-checking-the-referer-and-origin-headers-enough-to-prevent-csrf-provided-that
 * To prevent "click-jacking", set the header X-Frame-Options: DENY.
 * This will tell your browser that it is not allowed to display any part of your website in an iframe.
 */
async function middleware(ctx: Context, next: () => Promise<any>) {
	ctx.set('X-Frame-Options', 'DENY'); // NOTE: Could also use "SAMEORIGIN".
	ctx.set('Content-Security-Policy', 'frame-ancestors \'none\''); // NOTE: Could also use "frame-ancestors 'self'".
	await next();
	ctx.set('X-Frame-Options', 'DENY');
	ctx.set('Content-Security-Policy', 'frame-ancestors \'none\'');
}

module.exports = middleware;
