import { type Generated, type Insertable, Kysely, type Selectable, type Updateable } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export type CommitTimestampTable = {
	id: Generated<number>;
	updated_at: number;
	gh_username: string;
	gh_repo: string;
};

export type CommitTimestamp = Selectable<CommitTimestampTable>;
export type NewCommitTimestamp = Insertable<CommitTimestampTable>;
export type CommitTimestampUpdate = Updateable<CommitTimestampTable>;

export type Database = {
	commit: CommitTimestampTable;
};

export function createDb(dbHost: string, dbUsername: string, dbPassword: string): Kysely<Database> {
	return new Kysely<Database>({
		dialect: new PlanetScaleDialect({
			host: dbHost,
			username: dbUsername,
			password: dbPassword,
		}),
	});
}
