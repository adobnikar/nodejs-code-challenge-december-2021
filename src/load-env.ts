import * as fs from 'fs';
import * as path from 'path';
import * as secret from './helpers/secret';
import dotenv from 'dotenv';

// Load .env configuration.
dotenv.config({
	path: path.resolve(__dirname, '../.env'),
});

// Set default port values.
process.env.SERVER_PORT = process.env.SERVER_PORT || '3000';

// Set the default values of env variables.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_ENV_ALIAS = 'Unknown';
if (process.env.NODE_ENV === 'development') {
	process.env.NODE_ENV_ALIAS = 'Dev';
} else if (process.env.NODE_ENV === 'stage') {
	process.env.NODE_ENV_ALIAS = 'Stage';
} else if (process.env.NODE_ENV === 'production') {
	process.env.NODE_ENV_ALIAS = 'Live';
}

// Generate secret keys.
function checkJWTSecret(name: string): void {
	// Check if JWT secret preset. If not then generate it.
	if (process.env[name] == null) {
		let jwtSecret = secret.generateSecret();
		fs.appendFileSync(path.resolve(__dirname, '../.env'),
			`\n${name}=` + jwtSecret + '\n');
		process.env[name] = jwtSecret;
		console.log(`${name} generated.`);
	}
}

// Generate JWT secret for authorization purposes.
checkJWTSecret('JWT_SECRET');
