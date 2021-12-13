'use strict';

exports.seed = async function(knex) {
	await knex('drugs').insert([
		{
			"slug": "aspirin",
			"name": "Aspirin",
			"description": "General used drug",
			"published": true,
			"confirmed": true
		},
		{
			"slug": "abstral",
			"name": "Abstral",
			"description": "Fentanil",
			"published": true,
			"confirmed": false
		},
		{
			"slug": "accofil",
			"name": "Accofil",
			"description": "Filgrastim",
			"published": false,
			"confirmed": true
		},
		{
			"slug": "aciklovir",
			"name": "Aciklovir",
			"description": "Aciklovir",
			"published": false,
			"confirmed": false
		},
		{
			"slug": "acipan",
			"name": "Acipan",
			"description": "Pantoprazol",
			"published": true,
			"confirmed": true
		},
		{
			"slug": "calpol",
			"name": "Calpol",
			"description": "Paracetamol",
			"published": true,
			"confirmed": false
		},
	]);
};
