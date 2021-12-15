import Koa from 'koa';
import KoaRouter from 'koa-router';
const KoaRouterGroups = require('koa-router-groups');
import { KoaRouterExtended } from './types/koa-router-groups';
// const KoaApiExplorer = require('./libs/koa-api-explorer/index');

// Require middleware functions.
const koaBody = require('koa-body');
const AuthMiddleware = require('./middleware/auth');

// Require all exposed controllers.
const HealthController = require('./controllers/health');
// const UserController = require('./controllers/user');

// Create koa router instance.
let router = new KoaRouter({
	// prefix: '/api',
}) as KoaRouterExtended;
KoaRouterGroups.extend(router);

// Register middleware functions.
router.registerMiddleware('body', koaBody({
	jsonLimit: '64mb',
	formLimit: '64mb',
	textLimit: '64mb',
	multipart: true,
	parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
}));
router.registerMiddleware('auth', AuthMiddleware.auth);
// router.registerMiddleware('autoAuth', AuthMiddleware.autoAuth); // Automatically login as super admin.
// router.registerMiddleware('guest', AuthMiddleware.roles(['guest'])); // Example API thant only a guest user could access.
// router.registerMiddleware('employee', AuthMiddleware.roles(['employee', 'manager', 'admin', 'super']));
// router.registerMiddleware('manager', AuthMiddleware.roles(['manager', 'admin', 'super']));
// router.registerMiddleware('admin', AuthMiddleware.roles(['admin', 'super']));
// router.registerMiddleware('super', AuthMiddleware.roles(['super']));

/***********************************************************************************
 *
 * ROUTE DEFINITIONS
 *
 ***********************************************************************************/

// Push the middleware used by all routes to the stack.
router.pushMiddleware('body');

// Routes outside any auth groups will be accessible to everyone
// because they will have to pass no auth middleware.

// Health.
router.get('health', '/health', HealthController.health);

// Users.
// router.post('users.store', '/user/register', UserController.store);
// router.post('users.login', '/user/login', UserController.login);

/**
 * Apply routes middleware function.
 *
 * @param {Koa} app
 */
export async function applyUse(app: Koa) {
	// Apply the routes to the app.
	app.use(router.routes()).use(router.allowedMethods());
}

module.exports = {
	router,
	applyUse,
};
