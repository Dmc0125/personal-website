import { FileMigrationProvider, Migrator } from 'kysely';
import fs from 'node:fs/promises';
import path from 'node:path';

import { createDb } from './utils';

function requireEnvVar(name: string): string {
	if (!process.env[name]) {
		throw Error('Missing ENV variable: {name}');
	}
	return process.env[name]!;
}

const dbHost = requireEnvVar('DATABASE_HOST');
const dbUsername = requireEnvVar('DATABASE_USERNAME');
const dbPassword = requireEnvVar('DATABASE_PASSWORD');

const db = createDb(dbHost, dbUsername, dbPassword);
const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		path,
		migrationFolder: path.join(__dirname, '/migrations'),
	}),
});

async function migrateToLatest() {
	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate');
		console.error(error);
		process.exit(1);
	}

	await db.destroy();
}

async function migrateDown() {
	const { error, results } = await migrator.migrateDown();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration down "${it.migrationName}" was executed successfully`);
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration down "${it.migrationName}"`);
		}
	});

	if (error) {
		console.error('failed to migrate down');
		console.error(error);
		process.exit(1);
	}

	await db.destroy();
}

if (process.argv.includes('latest')) {
	console.log('Migrating to latest');
	await migrateToLatest();
} else if (process.argv.includes('down')) {
	console.log('Migrating down');
	await migrateDown();
}
