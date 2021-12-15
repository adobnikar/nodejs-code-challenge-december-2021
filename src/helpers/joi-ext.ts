'use strict';

import * as MomentExtension from './joi-moment';
import { extend } from 'lodash';
// import Joi from 'joi';

const JoiStringConvertible = function(joi: any) {
	return {
		base: joi.string(),
		name: 'stringConvertible',
		coerce(value: any, state: any, options: any) {
			function isNumeric(n: any) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			if (isNumeric(value)) {
				return value.toString();
			}
			return value;
		},
	};
};

const Joi = require('joi').extend([ JoiStringConvertible ]).extend(MomentExtension);

const settings = {
	passwordMinLength: 8,
	passwordMaxLength: 255,
	passwordRegex: /^(?=.*\d)(?=.*[A-Za-z]).*$/,
	passwordErrorMessage: 'Password must contain at at least one letter and one number.',
};

// Set a default error handler.
Joi.originalValidateFn = Joi.validate;
Joi.validate = (data: any, schema: any, options: any) => {
	let baseOptions = {
		allowUnknown: true,
		stripUnknown: true,
	};
	options = extend(baseOptions, options);
	let result = Joi.originalValidateFn(data, schema, options);
	return result;
};

Joi.attempt = function(value: any, schema: any, message: any, options: any) {
	const result = this.validate(value, schema, options);
	const error = result.error;

	if (error) {
		if (!message) {
			// if (typeof error.annotate === 'function') {
			// 	error.message = error.annotate();
			// }
			throw error;
		}

		if (!(message instanceof Error)) {
			if (typeof error.annotate === 'function') {
				error.message = `${message} ${error.annotate()}`;
			}
			throw error;
		}

		throw message;
	}

	return result.value;
};

Joi.password = () => {
	return Joi.string().min(settings.passwordMinLength).max(settings.passwordMaxLength)
		.regex(settings.passwordRegex, settings.passwordErrorMessage);
};

Joi.color = () => {
	return Joi.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color value.');
};

export default Joi;
