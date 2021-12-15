import KoaRouter from 'koa-router';

export interface KoaRouterExtended extends KoaRouter {
	registerMiddleware: (name: string, mw: any) => void;
	pushMiddleware: (name: string) => void;
	group: (names: string | string[], group: any) => void;
}
