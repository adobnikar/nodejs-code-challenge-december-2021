import { Context } from 'koa';

/**
 * Health check.
 */
export async function health(ctx: Context, next: () => Promise<any>) {
	ctx.body = {
		status: 'ok',
	};
}
