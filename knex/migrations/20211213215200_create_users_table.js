'use strict';

exports.up = async function(knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('id').unsigned().primary();
		table.string('email').nullable().index();
		table.string('password', 128).nullable();
		table.string('role').nullable().index();
		table.string('first_name').nullable().index();
		table.string('last_name').nullable().index();

		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).index();
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()).index();
		table.timestamp('deleted_at').nullable().index();
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('users');
};
