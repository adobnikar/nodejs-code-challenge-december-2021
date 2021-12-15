const Bookshelf = require('../../knex/bookshelf');
import { isArray } from 'lodash';

export default Bookshelf.model('User', {
	tableName: 'users',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'password',
		'deleted_at',
	],
	softDelete: true,

	/**
	 * Scopes.
	 */

	scopes: {
		isMe: (q: any, userId: any) => q.be.isOwnerScope(userId, 'id'),
		isNotMe: (q: any, userId: any) => q.be.isNotOwnerScope(userId, 'id'),

		whereRole(q: any, roles: string | string[]) {
			if (!isArray(roles)) roles = [roles as string];
			q.be.whereIn('role', roles);
		},
	},
});
