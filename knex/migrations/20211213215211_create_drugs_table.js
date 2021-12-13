'use strict';

exports.up = async function(knex) {
	await knex.schema.createTable('drugs', (table) => {
		table.increments('id').unsigned().primary();
		table.string('slug').nullable().index();
		table.string('name').nullable().index();
		table.text('description', 'longtext').nullable();
		table.boolean('confirmed').notNullable().defaultsTo(false).index();
		table.boolean('published').notNullable().defaultsTo(false).index();

		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).index();
		table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()).index();
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('drugs');
};
