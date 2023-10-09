import { Kysely } from 'kysely';
import { Database } from '../utils';

export async function up(db: Kysely<Database>) {
	await db.schema
		.createTable('commit')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('updated_at', 'bigint', (col) => col.notNull())
		.addColumn('gh_username', 'varchar(30)', (col) => col.notNull())
		.addColumn('gh_repo', 'varchar(50)', (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<Database>) {
	await await db.schema.dropTable('commit').execute();
}
