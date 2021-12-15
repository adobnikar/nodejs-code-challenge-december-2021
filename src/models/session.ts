'use strict';

const Bookshelf = require('../../knex/bookshelf');
import moment from 'moment';
import './user';

export default Bookshelf.model('Session', {
	tableName: 'sessions',
	hasTimestamps: ['created_at', 'updated_at'],
	hidden: [
		'key',
	],

	// Format data coming from the database.
	parse: function(response: any) {
		if (response.data != null) response.data = JSON.parse(response.data);
		return response;
	},

	/**
	 * Relations.
	 */

	user: function() {
		return this.belongsTo('User', 'user_id');
	},

	/**
	 * Scopes.
	 */

	scopes: {
		isExpired: function(q: any) {
			let ctime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
			q.be.where((wq: any) => {
				wq.whereNotNull('expires_at');
				wq.where('expires_at', '<', ctime);
			});
		},
		isValid: function(q: any) {
			let ctime = moment.utc().format('YYYY-MM-DD HH:mm:ss');
			q.be.where((wq: any) => {
				wq.whereNull('expires_at');
				wq.orWhere('expires_at', '>=', ctime);
			});
		},
	},
});
