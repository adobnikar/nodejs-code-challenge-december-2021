'use strict';

exports.up = async function(knex) {
	await knex.schema.createTable('sessions', (table) => {
		table.charset('utf8');
		table.collate('utf8_unicode_ci');

		// Primary key.
		table.increments('id').unsigned().primary();

		table.string('key').notNullable();
		table.integer('user_id').unsigned().nullable().references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
		table.timestamp('expires_at').nullable().index();
		table.text('data', 'longtext').nullable();

		// Timestamps.
		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).index();
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()).index();

		// Indexes.
		table.index(['user_id', 'expires_at']);
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('sessions');
};
