import { Pool } from "pg"

function getConnectionString(): string | undefined {
	return process.env.DATABASE
}

const globalForPg = globalThis as unknown as {
	pgPool?: Pool
}

export function getPool(): Pool {
	if (globalForPg.pgPool) {
		return globalForPg.pgPool
	}

	const rawConnectionString = getConnectionString()

	if (!rawConnectionString) {
		throw new Error(
			"Database connection string is missing on the server. Please ensure 'DATABASE' or 'DATABASE_URL' is set and 'Available at Runtime' is checked in Coolify."
		)
	}

	// Strip channel_binding if present: node-postgres (pg) in Linux Docker environments does not support SCRAM channel binding and will fail
	const connectionString = rawConnectionString
		.replace(/([?&])channel_binding=[^&]*(&|$)/, (_, p1, p2) =>
			p2 === "&" ? p1 : ""
		)
		.replace(/\?$/, "")
		.trim()

	const isLocalhost =
		connectionString.includes("localhost") ||
		connectionString.includes("127.0.0.1")

	const isSslRequired =
		!isLocalhost ||
		connectionString.includes("neon.tech") ||
		connectionString.includes("sslmode=require")

	const newPool = new Pool({
		connectionString,
		ssl: isSslRequired ? { rejectUnauthorized: false } : undefined,
		max: 10,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 10000,
	})

	newPool.on("error", (err) => {
		console.error("Unexpected error on idle pg client:", err)
	})

	globalForPg.pgPool = newPool
	return newPool
}

export const pool = new Proxy({} as Pool, {
	get(_target, prop) {
		const activePool = getPool()
		const value = (activePool as any)[prop]
		return typeof value === "function" ? value.bind(activePool) : value
	},
})
