import { Pool } from "pg"

const connectionString = process.env.DATABASE || process.env.DATABASE_URL

const globalForPg = globalThis as unknown as {
	pgPool?: Pool
}

const isSslRequired =
	Boolean(connectionString) &&
	(connectionString?.includes("neon.tech") ||
		connectionString?.includes("sslmode=require"))

export const pool =
	globalForPg.pgPool ||
	(connectionString
		? new Pool({
				connectionString,
				ssl: isSslRequired ? { rejectUnauthorized: false } : undefined,
				max: 10,
				idleTimeoutMillis: 30000,
			})
		: new Pool())

if (process.env.NODE_ENV !== "production") {
	globalForPg.pgPool = pool
}
